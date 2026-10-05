"use client";

import { useRouter } from "next/navigation";
import Nav, { PublicNav } from "./Nav";
import * as styles from "./Layout.css.js";

export function LandingLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Nav />
      <main className={`${styles.main} ${styles.landing}`}>{children}</main>
    </div>
  );
}

export function MyPageLayout({ children }) {
  return (
    <div className={`${styles.layout} ${styles.dark}`}>
      <Nav />
      <main className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>
    </div>
  );
}

export function UserLayout({ children }) {
  return (
    <div className={`${styles.layout} ${styles.dark}`}>
      <PublicNav />
      <main className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>
    </div>
  );
}

export function FullLayout({ children }) {
  const router = useRouter();

  function handleClickBack() {
    router.back();
  }

  return (
    <main className={styles.fullLayout}>
      <div className={styles.container}>
        <div className={styles.backLinkContainer}>
          <img
            className={styles.backLink}
            src="/assets/left-arrow.svg"
            alt="뒤로가기"
            onClick={handleClickBack}
          />
        </div>
        {children}
      </div>
    </main>
  );
}
