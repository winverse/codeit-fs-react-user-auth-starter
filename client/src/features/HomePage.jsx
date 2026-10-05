import Button from "@/components/Button";
import Link from "@/components/Link";
import * as styles from "./HomePage.css.js";

function HomePage() {
  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.heading}>
          나의 링크들을 <span className={styles.accent}>하나로</span>{" "}
          관리하세요.
        </h1>
        <p className={styles.description}>
          파편화된 모든 정보들을, 이제는 하나의 프로필로 관리해봐요.
        </p>
        <Button className={styles.cta} as={Link} href="/login">
          시작하기
        </Button>
      </header>
      <div className={styles.hero}>
        <img
          className={styles.heroLeft}
          src="/assets/hero-placeholder.png"
          alt="빈 화면"
        />
        <img
          className={styles.heroCenter}
          src="/assets/hero.png"
          alt="예시 링크 관리 화면"
        />
        <img
          className={styles.heroRight}
          src="/assets/hero-placeholder.png"
          alt="빈 화면"
        />
      </div>
    </div>
  );
}

export default HomePage;
