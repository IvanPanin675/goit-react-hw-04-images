import css from './button.module.css';
import PropTypes from 'prop-types';

const Button = ({ loadMore, children }) => {
  return (
    <button className={css.button} onClick={loadMore}>
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = {
    loadMore: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired,
};