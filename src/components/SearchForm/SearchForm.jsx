import { useState } from 'react';
import style from './SearchForm.module.css';
import PropTypes from 'prop-types';

export const SearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const hanleSubmit = event => {
    event.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  const handleChange = event => {
    setQuery(event.target.value);
  };
  return (
    <form className={style.form} onSubmit={hanleSubmit}>
      <label className={style.label} htmlFor="search">
        Find movie by name
      </label>
      <input
        className={style.full}
        type="text"
        name="search"
        value={query}
        onChange={handleChange}
        placeholder="Search movie..."
        autoComplete="off"
      />
      <button className={style.search} type="submit">
        Search
      </button>
    </form>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};