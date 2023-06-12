import { Component } from 'react';
import { MdOutlineImageSearch } from 'react-icons/md';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = { searchValue: '' };

  handleChange = evt => {
    this.setState({
      searchValue: evt.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.searchValue.trim() === '') {
      alert('Ooops! You need to enter something');
      return;
    }
    this.props.onSubmit(this.state.searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchform} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchBtn}>
            <MdOutlineImageSearch className={css.buttonLabel} />
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.searchValue}
          />
        </form>
      </header>
    );
  }
}
