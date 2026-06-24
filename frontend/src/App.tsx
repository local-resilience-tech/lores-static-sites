import { useState } from "react";
import "@awesome.me/webawesome/dist/components/button/button.js";
import "@awesome.me/webawesome/dist/components/card/card.js";
import "@awesome.me/webawesome/dist/components/dialog/dialog.js";
import "@awesome.me/webawesome/dist/components/page/page.js";
import { AddWebsiteForm } from "./components/AddWebsiteForm";

type Site = { name: string; description: string };

const initialSites: Site[] = [
  { name: "Example Site", description: "A static site hosted on Lores." },
  { name: "My Blog", description: "Personal blog built with a static generator." },
  { name: "Portfolio", description: "Design and development portfolio." },
];

export function App() {
  const [sites, setSites] = useState<Site[]>(initialSites);
  const [showForm, setShowForm] = useState(false);

  function handleAdd(site: { name: string; description: string }) {
    setSites((prev) => [...prev, site]);
    setShowForm(false);
  }

  return (
    <wa-page>
      <div slot="header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1>Websites</h1>
        <wa-button variant="brand" onClick={() => setShowForm(true)}>
          Add Website
        </wa-button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem", padding: "1rem" }}>
        {sites.map((site, i) => (
          <wa-card key={i}>
            <strong slot="header">{site.name}</strong>
            <p>{site.description}</p>
          </wa-card>
        ))}
      </div>

      <wa-dialog label="Add a New Website" open={showForm || undefined} onwa-after-hide={() => setShowForm(false)}>
        <AddWebsiteForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />
      </wa-dialog>

      <div slot="footer">
        <p>Footer content goes here.</p>
      </div>
    </wa-page>
  );
}
