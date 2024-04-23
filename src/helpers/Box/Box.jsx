import style from './Box.module.css';
import PropTypes from 'prop-types';

export const Box = ({ children }) => {
  return <div className={style.box}>{children}</div>;
};

Box.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element.isRequired),
};