import { useState } from "react";
import "@awesome.me/webawesome/dist/components/button/button.js";
import "@awesome.me/webawesome/dist/components/input/input.js";
import "@awesome.me/webawesome/dist/components/textarea/textarea.js";

type Props = {
  onSubmit: (site: { name: string; description: string }) => void;
  onCancel: () => void;
};

export function AddWebsiteForm({ onSubmit, onCancel }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), description: description.trim() });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingBottom: "1rem" }}>
        <wa-input label="Website Name" required value={name} onInput={(e: any) => setName(e.target.value)} />
        <wa-textarea label="Description" value={description} onInput={(e: any) => setDescription(e.target.value)} />
      </div>
      <div slot="footer" style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
        <wa-button type="button" onClick={onCancel}>
          Cancel
        </wa-button>
        <wa-button type="submit" variant="brand">
          Add Website
        </wa-button>
      </div>
    </form>
  );
}
