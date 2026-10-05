import * as styles from "./HorizontalRule.css.js";

function HorizontalRule({ className = "", children }) {
  if (children) {
    return (
      <div className={`${className} ${styles.container}`}>
        <hr className={styles.horizontalRule} />
        <span className={styles.text}>{children}</span>
        <hr className={styles.horizontalRule} />
      </div>
    );
  }

  return <hr className={`${styles.horizontalRule} ${className}`} />;
}

export default HorizontalRule;
