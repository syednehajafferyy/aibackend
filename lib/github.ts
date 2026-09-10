import { Octokit } from "@octokit/rest";

/**
 * Thin wrapper around Octokit for the 1-click deploy flow:
 *   1. createRepo        — POST /user/repos            (repo:create scope)
 *   2. commitFiles        — creates a tree + commit + updates the ref in one shot
 *   3. triggerVercelDeploy — hits the project's Vercel Deploy Hook URL
 *
 * `accessToken` should be the signed-in user's GitHub OAuth token
 * (see lib/auth.ts:getGithubAccessToken) so the repo lands in *their*
 * account, not a service account.
 */
export function githubClient(accessToken: string) {
  return new Octokit({ auth: accessToken });
}

export async function createRepo(
  accessToken: string,
  { name, isPrivate }: { name: string; isPrivate: boolean }
) {
  const octokit = githubClient(accessToken);
  const { data } = await octokit.repos.createForAuthenticatedUser({
    name,
    private: isPrivate,
    auto_init: true, // creates an initial commit so we have a base tree to build on
    description: "Generated with DevForge AI",
  });
  return { owner: data.owner.login, repo: data.name, htmlUrl: data.html_url, defaultBranch: data.default_branch };
}

/**
 * Commits a flat map of { path: content } in a single tree + commit, then
 * fast-forwards the default branch ref. This avoids one API call per file.
 */
export async function commitFiles(
  accessToken: string,
  opts: {
    owner: string;
    repo: string;
    branch: string;
    files: Record<string, string>;
    message?: string;
  }
) {
  const octokit = githubClient(accessToken);
  const { owner, repo, branch, files, message = "Initial commit from DevForge AI" } = opts;

  const { data: ref } = await octokit.git.getRef({ owner, repo, ref: `heads/${branch}` });
  const latestCommitSha = ref.object.sha;

  const { data: baseCommit } = await octokit.git.getCommit({ owner, repo, commit_sha: latestCommitSha });

  const blobs = await Promise.all(
    Object.entries(files).map(async ([path, content]) => {
      const { data: blob } = await octokit.git.createBlob({
        owner,
        repo,
        content: Buffer.from(content, "utf-8").toString("base64"),
        encoding: "base64",
      });
      return { path, mode: "100644" as const, type: "blob" as const, sha: blob.sha };
    })
  );

  const { data: tree } = await octokit.git.createTree({
    owner,
    repo,
    base_tree: baseCommit.tree.sha,
    tree: blobs,
  });

  const { data: commit } = await octokit.git.createCommit({
    owner,
    repo,
    message,
    tree: tree.sha,
    parents: [latestCommitSha],
  });

  await octokit.git.updateRef({ owner, repo, ref: `heads/${branch}`, sha: commit.sha });

  return { commitSha: commit.sha };
}

/** Fires the Vercel Deploy Hook configured for the target project. */
export async function triggerVercelDeploy(deployHookUrl: string) {
  const res = await fetch(deployHookUrl, { method: "POST" });
  if (!res.ok) {
    throw new Error(`Vercel deploy hook failed: ${res.status} ${await res.text()}`);
  }
  return res.json().catch(() => ({}));
}
