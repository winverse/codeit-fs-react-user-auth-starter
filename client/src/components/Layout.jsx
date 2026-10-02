"use client";

import { useRouter } from "next/navigation";
import Nav, { PublicNav } from "./Nav";
import styles from "./Layout.module.css";

export function LandingLayout({ children }) {
  return (
    <div className={styles.Layout}>
      <Nav />
      <main className={`${styles.Main} ${styles.landing}`}>{children}</main>
    </div>
  );
}

export function MyPageLayout({ children }) {
  return (
    <div className={`${styles.Layout} ${styles.dark}`}>
      <Nav />
      <main className={styles.Main}>
        <div className={styles.Container}>{children}</div>
      </main>
    </div>
  );
}

export function UserLayout({ children }) {
  return (
    <div className={`${styles.Layout} ${styles.dark}`}>
      <PublicNav />
      <main className={styles.Main}>
        <div className={styles.Container}>{children}</div>
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
    <main className={styles.FullLayout}>
      <div className={styles.Container}>
        <div className={styles.BackLinkContainer}>
          <img
            className={styles.BackLink}
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
