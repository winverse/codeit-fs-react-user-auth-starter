import styles from "./Avatar.module.css";

function Avatar({ className, size = "medium", src, alt, ...props }) {
  return (
    <img
      className={`${styles.Avatar} ${styles[size]} ${className}`}
      src={src || "/assets/default-avatar.svg"}
      alt={alt}
      {...props}
    />
  );
}

export default Avatar;
