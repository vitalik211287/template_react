import css from "./LoadMoreButton.module.css";

export default function LoadMoreButton({ onClick, disabled }) {
  return (
    <button
      className={css.btn}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      Load More
    </button>
  );
}
