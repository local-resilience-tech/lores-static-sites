import type React from "react";
import "@awesome.me/webawesome/dist/components/card/card.js";

type Site = { name: string; description: string };

type Props = {
  sites: Site[];
};

export function WebsiteList({ sites }: Props) {
  return (
    <div className="wa-grid wa-gap-m" style={{ "--min-column-size": "18rem", padding: "1rem" } as React.CSSProperties}>
      {sites.map((site, i) => (
        <wa-card key={i}>
          <strong slot="header">{site.name}</strong>
          <p>{site.description}</p>
        </wa-card>
      ))}
    </div>
  );
}
