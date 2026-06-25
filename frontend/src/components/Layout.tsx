import type { ReactNode } from "react";
import "@awesome.me/webawesome/dist/components/page/page.js";
import styles from "./Layout.module.css";

type Props = {
  title: string;
  headerActions?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
};

export function Layout({ title, headerActions, footer, children }: Props) {
  return (
    <wa-page>
      <div slot="header" className="wa-split">
        <h1 className={styles.title}>{title}</h1>
        {headerActions}
      </div>

      {children}

      <div slot="footer">{footer}</div>
    </wa-page>
  );
}
