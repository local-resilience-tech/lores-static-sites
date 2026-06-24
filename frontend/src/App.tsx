import "@awesome.me/webawesome/dist/components/button/button.js";
import "@awesome.me/webawesome/dist/components/card/card.js";
import "@awesome.me/webawesome/dist/components/page/page.js";

const sites = [
  { name: "Example Site", url: "https://example.com", description: "A static site hosted on Lores." },
  { name: "My Blog", url: "https://myblog.com", description: "Personal blog built with a static generator." },
  { name: "Portfolio", url: "https://portfolio.com", description: "Design and development portfolio." },
];

export function App() {
  return (
    <wa-page>
      <div slot="header">
        <h1>My App</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem", padding: "1rem" }}>
        {sites.map((site) => (
          <wa-card key={site.url}>
            <strong slot="header">{site.name}</strong>
            <p>{site.description}</p>
            <div slot="footer-actions">
              <wa-button variant="brand" href={site.url} target="_blank">
                Visit
              </wa-button>
            </div>
          </wa-card>
        ))}
      </div>

      <div slot="footer">
        <p>Footer content goes here.</p>
      </div>
    </wa-page>
  );
}
