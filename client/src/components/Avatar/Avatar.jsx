import * as styles from "./Avatar.css.js";

function Avatar({ className, size = "medium", src, alt, ...props }) {
  return (
    <img
      className={`${styles.avatar} ${styles[size]} ${className}`}
      src={src || "/assets/default-avatar.svg"}
      alt={alt}
      {...props}
    />
  );
}

export default Avatar;
