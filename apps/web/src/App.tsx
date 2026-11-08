// SPDX-License-Identifier: GPL-3.0-only

const GITHUB_URL = "https://github.com/embermleaf-stack/companion-forever";
const LICENSE_URL = "https://github.com/embermleaf-stack/companion-forever/blob/main/LICENSE";

// TODO: set these to the real store listing URLs once the apps are published.
// Until then they stay null and the store buttons render as disabled "Coming soon".
const STORE_LINKS: { googlePlay: string | null; appStore: string | null } = {
  googlePlay: null,
  appStore: null,
};

function StoreButton({ id, label, href }: { id: string; label: string; href: string | null }) {
  if (href) {
    return (
      <a className="store" href={href}>
        {label}
      </a>
    );
  }
  return (
    <div className="store-item">
      <button type="button" className="store" disabled aria-describedby={`${id}-soon`}>
        {label}
      </button>
      <span id={`${id}-soon`} className="soon">
        Coming soon
      </span>
    </div>
  );
}

export function App() {
  return (
    <div className="page">
      <header>
        <img src="./icon-192.png" alt="" width="72" height="72" />
        <h1>Companion Forever</h1>
        <p className="working">Working name</p>
      </header>

      <main>
        <p className="lead">
          Companion Forever is a free, open-source, independent planner for tracking game characters and recurring
          activities. Your data stays on your device.
        </p>

        <section aria-labelledby="get-app">
          <h2 id="get-app">Get the app</h2>
          <div className="stores">
            <StoreButton id="google-play" label="Get it on Google Play" href={STORE_LINKS.googlePlay} />
            <StoreButton id="app-store" label="App Store" href={STORE_LINKS.appStore} />
          </div>
        </section>

        <section aria-labelledby="project">
          <h2 id="project">Project</h2>
          <ul className="links">
            <li>
              <a href={GITHUB_URL}>Source code on GitHub</a>
            </li>
            <li>
              <a href={LICENSE_URL}>License: GPL-3.0</a>
            </li>
          </ul>
        </section>
      </main>

      <footer>
        <p className="disclaimer">
          Independent fan-made tool. Not affiliated with, endorsed by, or sponsored by Blizzard Entertainment.
        </p>
      </footer>
    </div>
  );
}
