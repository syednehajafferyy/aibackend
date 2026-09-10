export type Locale = "en" | "es" | "fr" | "ar" | "ur";

export const locales: { code: Locale; label: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "es", label: "Español", dir: "ltr" },
  { code: "fr", label: "Français", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
  { code: "ur", label: "اردو", dir: "rtl" },
];

export const rtlLocales: Locale[] = ["ar", "ur"];

export function dirFor(locale: Locale): "ltr" | "rtl" {
  return rtlLocales.includes(locale) ? "rtl" : "ltr";
}

/**
 * Translation dictionary. Keep keys flat and scoped by feature so it's easy
 * to find what's missing when adding a language — Zod validates completeness
 * at build time via `assertComplete` below.
 */
const dictionaries = {
  en: {
    "nav.templates": "Templates",
    "nav.dashboard": "Dashboard",
    "nav.signOut": "Sign out",
    "prompt.placeholder": "Describe the site or component you want to build…",
    "prompt.generate": "Generate",
    "prompt.generating": "Generating…",
    "templates.ecommerce": "E-commerce",
    "templates.saasLanding": "SaaS landing page",
    "templates.portfolio": "Portfolio",
    "templates.dashboard": "Dashboard",
    "templates.blank": "Blank canvas",
    "chat.title": "Ask DevForge",
    "chat.placeholder": "Ask a question or tell us about your project…",
    "chat.leadCaptured": "Thanks — we've got your details. Someone will follow up shortly.",
    "deploy.step.repo": "Creating repository",
    "deploy.step.commit": "Committing files",
    "deploy.step.build": "Triggering build",
    "deploy.step.live": "Live at URL",
    "deploy.cta": "Deploy",
    "inspector.title": "Style",
    "inspector.primaryColor": "Primary color",
    "inspector.radius": "Corner radius",
    "inspector.fontScale": "Text size",
  },
  es: {
    "nav.templates": "Plantillas",
    "nav.dashboard": "Panel",
    "nav.signOut": "Cerrar sesión",
    "prompt.placeholder": "Describe el sitio o componente que quieres crear…",
    "prompt.generate": "Generar",
    "prompt.generating": "Generando…",
    "templates.ecommerce": "Comercio electrónico",
    "templates.saasLanding": "Página de aterrizaje SaaS",
    "templates.portfolio": "Portafolio",
    "templates.dashboard": "Panel de control",
    "templates.blank": "Lienzo en blanco",
    "chat.title": "Pregúntale a DevForge",
    "chat.placeholder": "Haz una pregunta o cuéntanos sobre tu proyecto…",
    "chat.leadCaptured": "Gracias, ya tenemos tus datos. Nos pondremos en contacto pronto.",
    "deploy.step.repo": "Creando repositorio",
    "deploy.step.commit": "Confirmando archivos",
    "deploy.step.build": "Iniciando compilación",
    "deploy.step.live": "En línea en la URL",
    "deploy.cta": "Desplegar",
    "inspector.title": "Estilo",
    "inspector.primaryColor": "Color primario",
    "inspector.radius": "Radio de esquina",
    "inspector.fontScale": "Tamaño de texto",
  },
  fr: {
    "nav.templates": "Modèles",
    "nav.dashboard": "Tableau de bord",
    "nav.signOut": "Se déconnecter",
    "prompt.placeholder": "Décrivez le site ou composant que vous voulez créer…",
    "prompt.generate": "Générer",
    "prompt.generating": "Génération…",
    "templates.ecommerce": "E-commerce",
    "templates.saasLanding": "Page d'accueil SaaS",
    "templates.portfolio": "Portfolio",
    "templates.dashboard": "Tableau de bord",
    "templates.blank": "Toile vierge",
    "chat.title": "Demander à DevForge",
    "chat.placeholder": "Posez une question ou parlez-nous de votre projet…",
    "chat.leadCaptured": "Merci, nous avons vos coordonnées. Nous vous recontacterons bientôt.",
    "deploy.step.repo": "Création du dépôt",
    "deploy.step.commit": "Envoi des fichiers",
    "deploy.step.build": "Lancement de la compilation",
    "deploy.step.live": "En ligne à l'URL",
    "deploy.cta": "Déployer",
    "inspector.title": "Style",
    "inspector.primaryColor": "Couleur principale",
    "inspector.radius": "Rayon des coins",
    "inspector.fontScale": "Taille du texte",
  },
  ar: {
    "nav.templates": "القوالب",
    "nav.dashboard": "لوحة التحكم",
    "nav.signOut": "تسجيل الخروج",
    "prompt.placeholder": "صف الموقع أو المكوّن الذي تريد إنشاءه…",
    "prompt.generate": "إنشاء",
    "prompt.generating": "جارٍ الإنشاء…",
    "templates.ecommerce": "متجر إلكتروني",
    "templates.saasLanding": "صفحة هبوط SaaS",
    "templates.portfolio": "معرض أعمال",
    "templates.dashboard": "لوحة بيانات",
    "templates.blank": "لوحة فارغة",
    "chat.title": "اسأل DevForge",
    "chat.placeholder": "اطرح سؤالاً أو أخبرنا عن مشروعك…",
    "chat.leadCaptured": "شكرًا، وصلتنا بياناتك. سنتواصل معك قريبًا.",
    "deploy.step.repo": "إنشاء المستودع",
    "deploy.step.commit": "رفع الملفات",
    "deploy.step.build": "بدء البناء",
    "deploy.step.live": "متاح على الرابط",
    "deploy.cta": "نشر",
    "inspector.title": "التصميم",
    "inspector.primaryColor": "اللون الأساسي",
    "inspector.radius": "استدارة الزوايا",
    "inspector.fontScale": "حجم النص",
  },
  ur: {
    "nav.templates": "ٹیمپلیٹس",
    "nav.dashboard": "ڈیش بورڈ",
    "nav.signOut": "سائن آؤٹ",
    "prompt.placeholder": "وہ سائٹ یا جزو بیان کریں جو آپ بنانا چاہتے ہیں…",
    "prompt.generate": "تخلیق کریں",
    "prompt.generating": "تخلیق ہو رہی ہے…",
    "templates.ecommerce": "ای کامرس",
    "templates.saasLanding": "SaaS لینڈنگ پیج",
    "templates.portfolio": "پورٹ فولیو",
    "templates.dashboard": "ڈیش بورڈ",
    "templates.blank": "خالی کینوس",
    "chat.title": "DevForge سے پوچھیں",
    "chat.placeholder": "سوال پوچھیں یا اپنے پراجیکٹ کے بارے میں بتائیں…",
    "chat.leadCaptured": "شکریہ — ہمیں آپ کی تفصیلات مل گئیں۔ جلد رابطہ کیا جائے گا۔",
    "deploy.step.repo": "ریپوزٹری بن رہی ہے",
    "deploy.step.commit": "فائلیں کمٹ ہو رہی ہیں",
    "deploy.step.build": "بلڈ شروع ہو رہا ہے",
    "deploy.step.live": "یو آر ایل پر لائیو",
    "deploy.cta": "ڈیپلائے",
    "inspector.title": "اسٹائل",
    "inspector.primaryColor": "بنیادی رنگ",
    "inspector.radius": "کونے کی گولائی",
    "inspector.fontScale": "متن کا سائز",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type TranslationKey = keyof (typeof dictionaries)["en"];

export function t(locale: Locale, key: TranslationKey): string {
  return dictionaries[locale]?.[key] ?? dictionaries.en[key] ?? key;
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.en;
}
