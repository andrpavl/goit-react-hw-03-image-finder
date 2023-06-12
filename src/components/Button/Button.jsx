import css from './Button.module.css'


export const Button = ({ onClick }) => {
  return (
    <>
      <button className={css.LoadMoreBtn} type="submit" onClick={onClick}>Load more</button>
    </>
  );
};
