import "@awesome.me/webawesome/dist/components/card/card.js";

type Site = { name: string; description: string };

type Props = {
  sites: Site[];
};

export function WebsiteList({ sites }: Props) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem", padding: "1rem" }}>
      {sites.map((site, i) => (
        <wa-card key={i}>
          <strong slot="header">{site.name}</strong>
          <p>{site.description}</p>
        </wa-card>
      ))}
    </div>
  );
}
