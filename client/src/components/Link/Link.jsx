import BaseLink from "next/link";
import * as styles from "./Link.css.js";

function Link({ className = "", appearance = "primary", children, ...rest }) {
  return (
    <BaseLink
      className={`${styles.link} ${styles[appearance]} ${className}`}
      {...rest}
    >
      {children}
    </BaseLink>
  );
}

export default Link;
