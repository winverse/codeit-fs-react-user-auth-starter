import BaseLink from "next/link";
import styles from "./Link.module.css";

function Link({ className = "", appearance = "primary", children, ...rest }) {
  return (
    <BaseLink
      className={`${styles.Link} ${styles[appearance]} ${className}`}
      {...rest}
    >
      {children}
    </BaseLink>
  );
}

export default Link;
