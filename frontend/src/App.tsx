import { useState } from "react";
import "@awesome.me/webawesome/dist/components/button/button.js";
import "@awesome.me/webawesome/dist/components/dialog/dialog.js";
import "@awesome.me/webawesome/dist/components/page/page.js";
import { AddWebsiteForm } from "./components/AddWebsiteForm";
import { WebsiteList } from "./components/WebsiteList";

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
      <div slot="header" className="wa-split">
        <h1 style={{ margin: 0 }}>Websites</h1>
        <wa-button variant="brand" onClick={() => setShowForm(true)}>
          Add Website
        </wa-button>
      </div>

      <WebsiteList sites={sites} />

      <wa-dialog label="Add a New Website" open={showForm || undefined} onwa-after-hide={() => setShowForm(false)}>
        <AddWebsiteForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />
      </wa-dialog>

      <div slot="footer">
        <p>Footer content goes here.</p>
      </div>
    </wa-page>
  );
}
