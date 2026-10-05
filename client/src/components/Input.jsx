import * as styles from "./Input.css.js";

function Input({ className = "", ...rest }) {
  return <input className={`${styles.input} ${className}`} {...rest} />;
}

export default Input;
