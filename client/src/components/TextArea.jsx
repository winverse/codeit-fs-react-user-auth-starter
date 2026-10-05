import * as styles from "./TextArea.css.js";

function TextArea({ className = "", ...rest }) {
  return <textarea className={`${styles.textArea} ${className}`} {...rest} />;
}

export default TextArea;
