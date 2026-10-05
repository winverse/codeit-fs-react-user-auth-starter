import Card from "./Card";
import Link from "./Link";
import * as styles from "./LinkCard.css.js";

function LinkCard({ thumbUrl, title, url, onClick, onDelete }) {
  function handleLinkClick(e) {
    e.stopPropagation();
  }

  function handleDelete(e) {
    e.stopPropagation();
    onDelete();
  }

  return (
    <Card
      className={`${styles.linkCard} ${onClick ? styles.editable : ""}`}
      onClick={onClick}
    >
      <img
        className={styles.thumbnail}
        src={thumbUrl ?? "/assets/og-default.png"}
        alt="썸네일 이미지"
      />
      <div className={styles.container}>
        <div className={styles.linkTitle}>{title}</div>
        <Link
          className={styles.linkUrl}
          appearance="secondary"
          href={url}
          target="_blank"
          onClick={handleLinkClick}
        >
          {url}
        </Link>
      </div>
      {onDelete && (
        <img
          className={styles.linkDelete}
          src="/assets/x-circle.svg"
          alt="삭제 아이콘"
          onClick={handleDelete}
        />
      )}
    </Card>
  );
}

export default LinkCard;
