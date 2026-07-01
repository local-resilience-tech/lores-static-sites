import { useState } from "react";
import "@awesome.me/webawesome/dist/components/button/button.js";
import "@awesome.me/webawesome/dist/components/input/input.js";
import "@awesome.me/webawesome/dist/components/textarea/textarea.js";
import styles from "./websites.module.css";

type Props = {
  onSubmit: (site: { name: string; description: string }) => void;
  onCancel: () => void;
  initialValues?: { name: string; description: string };
  submitLabel?: string;
};

export function WebsiteForm({ onSubmit, onCancel, initialValues, submitLabel = "Add Website" }: Props) {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [description, setDescription] = useState(initialValues?.description ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), description: description.trim() });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={`wa-stack wa-gap-m ${styles.formFields}`}>
        <wa-input label="Website Name" required value={name} onInput={(e: any) => setName(e.target.value)} />
        <wa-textarea label="Description" value={description} onInput={(e: any) => setDescription(e.target.value)} />
      </div>
      <div slot="footer" className="wa-cluster wa-gap-xs wa-justify-content-end">
        <wa-button type="button" onClick={onCancel}>
          Cancel
        </wa-button>
        <wa-button type="submit" variant="brand">
          {submitLabel}
        </wa-button>
      </div>
    </form>
  );
}
