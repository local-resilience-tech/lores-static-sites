import "@awesome.me/webawesome/dist/components/card/card.js";
import styles from "./websites.module.css";

type Site = { name: string; description: string };

type Props = {
  sites: Site[];
};

export function WebsiteList({ sites }: Props) {
  return (
    <div className={`wa-grid wa-gap-m ${styles.grid}`}>
      {sites.map((site, i) => (
        <wa-card key={i}>
          <strong slot="header">{site.name}</strong>
          <p>{site.description}</p>
        </wa-card>
      ))}
    </div>
  );
}
