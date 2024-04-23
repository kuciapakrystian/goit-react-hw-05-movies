import style from './Error.module.css';
import PropTypes from 'prop-types';

export const Error = ({ text }) => {
  return (
    <>
      <h3 className={style.error}>{text}</h3>
    </>
  );
};

Error.propTypes = {
  text: PropTypes.string.isRequired,
};