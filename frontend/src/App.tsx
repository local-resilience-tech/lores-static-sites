import { useState } from "react";
import "@awesome.me/webawesome/dist/components/button/button.js";
import "@awesome.me/webawesome/dist/components/dialog/dialog.js";
import { Layout } from "./components/Layout";
import { WebsiteForm } from "./components/websites/WebsiteForm";
import { WebsiteList } from "./components/websites/WebsiteList";

type Site = { name: string; description: string };

const initialSites: Site[] = [
  { name: "Example Site", description: "A static site hosted on Lores." },
  { name: "My Blog", description: "Personal blog built with a static generator." },
  { name: "Portfolio", description: "Design and development portfolio." },
];

export function App() {
  const [sites, setSites] = useState<Site[]>(initialSites);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  function handleAdd(site: { name: string; description: string }) {
    setSites((prev) => [...prev, site]);
    setShowForm(false);
  }

  function handleEdit(site: { name: string; description: string }) {
    setSites((prev) => prev.map((s, i) => (i === editIndex ? site : s)));
    setEditIndex(null);
  }

  const editingSite = editIndex !== null ? sites[editIndex] : undefined;

  return (
    <Layout
      title="Websites"
      headerActions={
        <wa-button variant="brand" onClick={() => setShowForm(true)}>
          Add Website
        </wa-button>
      }
      footer={<p>Footer content goes here.</p>}
    >
      <WebsiteList sites={sites} onEdit={setEditIndex} />

      <wa-dialog label="Add a New Website" open={showForm || undefined} onwa-after-hide={() => setShowForm(false)}>
        <WebsiteForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />
      </wa-dialog>

      <wa-dialog label="Edit Website" open={editIndex !== null || undefined} onwa-after-hide={() => setEditIndex(null)}>
        {editingSite && <WebsiteForm onSubmit={handleEdit} onCancel={() => setEditIndex(null)} initialValues={editingSite} submitLabel="Save Changes" />}
      </wa-dialog>
    </Layout>
  );
}
