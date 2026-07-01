import "@awesome.me/webawesome/dist/components/card/card.js";
import "@awesome.me/webawesome/dist/components/button/button.js";
import "@awesome.me/webawesome/dist/components/icon/icon.js";
import styles from "./websites.module.css";

type Website = { name: string; description: string };

type Props = {
  sites: Website[];
  onEdit: (index: number) => void;
};

export function WebsiteList({ sites, onEdit }: Props) {
  return (
    <div className={`wa-grid wa-gap-m ${styles.grid}`}>
      {sites.map((site, i) => (
        <wa-card key={i}>
          <div slot="header" className={styles.cardHeader}>
            <strong>{site.name}</strong>
            <wa-button size="small" appearance="plain" onClick={() => onEdit(i)} aria-label="Edit website">
              <wa-icon name="pen" label="Edit"></wa-icon>
            </wa-button>
          </div>
          <p>{site.description}</p>
        </wa-card>
      ))}
    </div>
  );
}
