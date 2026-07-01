import { useState, useEffect } from "react";
import "@awesome.me/webawesome/dist/components/button/button.js";
import "@awesome.me/webawesome/dist/components/dialog/dialog.js";
import { Layout } from "./components/Layout";
import { WebsiteForm } from "./components/websites/WebsiteForm";
import { WebsiteList } from "./components/websites/WebsiteList";
import { Api, Website } from "./api/Api";

const api = new Api();

export function App() {
  const [sites, setSites] = useState<Website[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    api.api.websitesIndex().then((response) => setSites(response.data));
  }, []);

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
