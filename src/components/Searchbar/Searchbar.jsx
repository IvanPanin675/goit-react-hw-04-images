import { Component } from 'react';
import PropTypes from 'prop-types';

import css from './searchbar.module.css';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ search: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.reset();
  };

  reset() {
    this.setState({ search: '' });
  }

  render() {
    const { search } = this.state;
    const { handleChange, handleSubmit } = this;

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
}

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
