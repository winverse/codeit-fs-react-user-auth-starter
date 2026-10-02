"use client";

import Avatar from "./Avatar";
import Button from "./Button";
import Link from "./Link";
import styles from "./Nav.module.css";

export function PublicNav() {
  return (
    <header className={styles.Container}>
      <nav className={`${styles.Nav} ${styles.public}`}>
        <Link href="/">
          <img className={styles.Logo} src="/assets/logo.svg" alt="logo" />
        </Link>
      </nav>
    </header>
  );
}

function Nav() {
  // TODO: 서버에서 내 정보를 가져옵니다.
  const user = null;

  return (
    <header className={styles.Container}>
      <nav className={styles.Nav}>
        <Link href="/">
          <img className={styles.Logo} src="/assets/logo.svg" alt="logo" />
        </Link>
        <div className={styles.Menu}>
          {user ? (
            <>
              {user.name}
              <Avatar src={user.avatar} size="small" />
              <div className={styles.Divider} />
              {/* TODO: 로그아웃을 구현합니다. */}
              <Button appearance="secondary">로그아웃</Button>
            </>
          ) : (
            <>
              <Button as={Link} appearance="secondary" href="/login">
                로그인
              </Button>
              <Button as={Link} href="/register">
                회원가입
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Nav;
