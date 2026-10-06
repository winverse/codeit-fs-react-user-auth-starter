import * as styles from "./Label.css.js";

function Label({ className = "", children, ...rest }) {
  return (
    <label className={`${styles.label} ${className}`} {...rest}>
      {children}
    </label>
  );
}

export default Label;
