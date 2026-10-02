import styles from "./TextArea.module.css";

function TextArea({ className = "", ...rest }) {
  return <textarea className={`${styles.TextArea} ${className}`} {...rest} />;
}

export default TextArea;
