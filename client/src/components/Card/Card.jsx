import * as styles from "./Card.css.js";

function Card({ className = "", children, onClick }) {
  return (
    <div className={`${styles.card} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}

export default Card;
