import * as styles from "./Button.css.js";

function Button({
  className = "",
  appearance = "primary",
  children,
  as: AsComponent,
  ...rest
}) {
  if (AsComponent) {
    return (
      <AsComponent
        className={`${styles.button} ${styles[appearance]} ${className}`}
        {...rest}
      >
        {children}
      </AsComponent>
    );
  }

  return (
    <button
      className={`${styles.button} ${styles[appearance]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
