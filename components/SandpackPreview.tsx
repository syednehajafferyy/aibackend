"use client";

import { SandpackProvider, SandpackPreview, SandpackCodeEditor } from "@codesandbox/sandpack-react";

interface CodePreviewProps {
  code: string;
}

export default function CustomSandpackPreview({ code }: CodePreviewProps) {
  return (
    <div className="w-full rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
      <SandpackProvider
        template="react"
        theme="dark"
        files={{
          "/App.js": code || `export default function App() { return <h1 className="p-4 text-white">Generating...</h1>; }`,
        }}
        customSetup={{
          dependencies: {
            "react": "^18.0.0",
            "react-dom": "^18.0.0",
            "lucide-react": "latest",
          },
        }}
        options={{
          bundlerURL: "https://sandpack-bundler.codesandbox.io",
          recompileMode: "delayed",
          recompileDelay: 300,
        }}
      >
        <div className="flex flex-col md:flex-row h-[500px]">
          {/* Editor Panel */}
          <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-slate-800">
            <SandpackCodeEditor showLineNumbers showInlineErrors style={{ height: "100%" }} />
          </div>
          {/* Live Preview Panel */}
          <div className="w-full md:w-1/2">
            <SandpackPreview showRefreshButton showOpenInCodeSandbox={false} style={{ height: "100%" }} />
          </div>
        </div>
      </SandpackProvider>
    </div>
  );
}
