// Page de téléchargement : textes FR / EN et lien vers la dernière version publiée sur GitHub
const REPO = 'arctis34/glass-widget';

const TEXTS = {
  fr: {
    title: 'Glass Widget — widget de bureau en verre pour Windows',
    nav_features: 'Fonctionnalités',
    nav_install: 'Installation',
    nav_privacy: 'Confidentialité',
    hero_title: 'Ton bureau, en verre dépoli.',
    hero_lead: 'Glass Widget pose sur ton bureau Windows une horloge, ton calendrier, les données de ton PC et tes applications préférées, dans des panneaux de verre qui laissent deviner ton fond d’écran.',
    download: 'Télécharger pour Windows',
    meta_version: 'Version {v} · {size} Mo',
    meta_static: 'Windows 11 · 64 bits · gratuit',
    features_title: 'Tout ce qu’il faut, rien de trop',
    f1_t: 'Horloge et calendrier',
    f1_d: 'Une grande horloge, la date du jour et le calendrier du mois, toujours sous les yeux.',
    f2_t: 'Ton PC en direct',
    f2_d: 'Processeur et chacun de ses cœurs, mémoire, disques, carte graphique NVIDIA, réseau et batterie.',
    f3_t: 'Tes applis à un clic',
    f3_d: 'Glisse un programme ou un raccourci dans le dock pour l’ajouter, réorganise-les à la souris.',
    f4_t: 'Compact ou plein écran',
    f4_d: 'Une petite carte à placer où tu veux, ou un vrai tableau de bord qui laisse tes icônes cliquables.',
    f5_t: 'Lisible sur tous les fonds',
    f5_d: 'Le verre s’assombrit tout seul sur les fonds d’écran clairs pour que le texte reste net.',
    f6_t: 'Léger et sûr',
    f6_d: 'Il se met en pause quand il est caché, et ses mises à jour sont vérifiées par signature numérique.',
    cap_compact: 'Le mode compact',
    cap_installer: 'L’installeur, dans le même style',
    install_title: 'Installer en trois étapes',
    step1: 'Télécharge le fichier <strong>Glass-Widget-Setup.exe</strong> avec le bouton ci-dessus.',
    step2: 'Lance-le. Un écran d’attente s’affiche quelques secondes, puis l’installeur.',
    step3: 'Choisis tes options et clique sur <strong>Installer</strong>. Aucun droit administrateur n’est nécessaire.',
    tip: 'Si Windows affiche « Windows a protégé votre ordinateur », clique sur <strong>Informations complémentaires</strong>, puis sur <strong>Exécuter quand même</strong>. Ce message apparaît parce que l’installeur n’est pas encore signé par un certificat payant.',
    uninstall: 'Pour désinstaller : Paramètres → Applications → Applications installées → Glass Widget.',
    privacy_title: 'Confidentialité',
    p1: 'Aucune donnée personnelle n’est envoyée : le widget lit les informations du PC et ton fond d’écran localement.',
    p2: 'Pour vérifier les mises à jour, il interroge GitHub quelques fois par jour : GitHub voit alors ton adresse IP, comme pour n’importe quelle page web.',
    p3: 'Le journal d’erreurs reste sur ton PC. Tu choisis de le joindre ou non quand tu signales un problème.',
    p4: 'Pas de publicité, pas de mesure d’audience, pas de compte à créer.',
    report: 'Signaler un problème',
    notes: 'Notes de version',
    alt_full: 'Glass Widget en plein écran : horloge, calendrier, panneau système et dock d’applications',
    alt_compact: 'Glass Widget en mode compact',
    alt_installer: 'L’installeur de Glass Widget',
  },
  en: {
    title: 'Glass Widget — frosted glass desktop widget for Windows',
    nav_features: 'Features',
    nav_install: 'Install',
    nav_privacy: 'Privacy',
    hero_title: 'Your desktop, in frosted glass.',
    hero_lead: 'Glass Widget puts a clock, your calendar, live PC stats and your favorite apps on your Windows desktop, in glass panels that let your wallpaper shine through.',
    download: 'Download for Windows',
    meta_version: 'Version {v} · {size} MB',
    meta_static: 'Windows 11 · 64-bit · free',
    features_title: 'Everything you need, nothing more',
    f1_t: 'Clock and calendar',
    f1_d: 'A big clock, today’s date and the month at a glance.',
    f2_t: 'Your PC, live',
    f2_d: 'CPU and each of its cores, memory, disks, NVIDIA graphics, network and battery.',
    f3_t: 'Your apps, one click away',
    f3_d: 'Drop a program or a shortcut on the dock to add it, and rearrange them with the mouse.',
    f4_t: 'Compact or full screen',
    f4_d: 'A small card you can place anywhere, or a full dashboard that keeps your desktop icons clickable.',
    f5_t: 'Readable on any wallpaper',
    f5_d: 'The glass darkens automatically on bright wallpapers so text stays crisp.',
    f6_t: 'Light and safe',
    f6_d: 'It pauses when hidden, and updates are verified with a digital signature.',
    cap_compact: 'Compact mode',
    cap_installer: 'The installer, in the same style',
    install_title: 'Install in three steps',
    step1: 'Download <strong>Glass-Widget-Setup.exe</strong> with the button above.',
    step2: 'Run it. A splash screen shows for a few seconds, then the installer.',
    step3: 'Pick your options and click <strong>Install</strong>. No admin rights needed.',
    tip: 'If Windows shows “Windows protected your PC”, click <strong>More info</strong>, then <strong>Run anyway</strong>. This appears because the installer isn’t signed with a paid certificate yet.',
    uninstall: 'To uninstall: Settings → Apps → Installed apps → Glass Widget.',
    privacy_title: 'Privacy',
    p1: 'No personal data is sent: the widget reads your PC’s information and your wallpaper locally.',
    p2: 'To check for updates, it contacts GitHub a few times a day, so GitHub sees your IP address, as with any web page.',
    p3: 'The error log stays on your PC. You decide whether to attach it when reporting a problem.',
    p4: 'No ads, no analytics, no account required.',
    report: 'Report a problem',
    notes: 'Release notes',
    alt_full: 'Glass Widget in full screen: clock, calendar, system panel and app dock',
    alt_compact: 'Glass Widget in compact mode',
    alt_installer: 'The Glass Widget installer',
  },
};

let lang = 'fr';
let release = null;

const fmt = (tpl, vars) => tpl.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');

function storedLang() {
  try { return localStorage.getItem('lang'); } catch { return null; }
}

function render() {
  const t = TEXTS[lang];
  document.documentElement.lang = lang;
  document.title = t.title;
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.innerHTML = t[el.dataset.i18n]; });
  document.querySelectorAll('.js-shot').forEach((img) => {
    const name = img.dataset.name;
    img.src = `img/${name}-${lang}.jpg`;
    img.alt = t[{ fullscreen: 'alt_full', compact: 'alt_compact', installer: 'alt_installer' }[name]];
  });
  document.getElementById('lang').textContent = lang === 'fr' ? 'EN' : 'FR';
  document.getElementById('dlMeta').textContent = release
    ? fmt(t.meta_version, { v: release.version, size: (release.size / 1048576).toFixed(0) })
    : '';
}

document.getElementById('lang').addEventListener('click', () => {
  lang = lang === 'fr' ? 'en' : 'fr';
  try { localStorage.setItem('lang', lang); } catch {}
  render();
});

lang = storedLang() || (/^fr/i.test(navigator.language) ? 'fr' : 'en');
render();

// Lien direct vers l'installeur de la dernière version (sinon, la page des versions reste le lien par défaut)
fetch(`https://api.github.com/repos/${REPO}/releases/latest`, { headers: { Accept: 'application/vnd.github+json' } })
  .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
  .then((rel) => {
    const asset = (rel.assets || []).find((a) => /^Glass-Widget-Setup-.*\.exe$/i.test(a.name));
    if (!asset) return;
    release = { version: String(rel.tag_name).replace(/^v/, ''), size: asset.size };
    document.getElementById('download').href = asset.browser_download_url;
    render();
  })
  .catch(() => {});
