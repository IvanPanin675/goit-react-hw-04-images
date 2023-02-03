import { useState } from 'react';
import PropTypes from 'prop-types';

import css from './searchbar.module.css';

export function Searchbar ({onSubmit}) {
  const [search, setSearch] = useState('');

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearch(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(search);
    setSearch('');
  };

    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <button type="submit" className="button">
            <span className={css.searchFormButton}></span>
          </button>

          <input
            value={search}
            onChange={handleChange}
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
