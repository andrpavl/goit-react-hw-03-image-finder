import { Component } from 'react';
import {MdOutlineImageSearch} from 'react-icons/md';

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
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">
              <MdOutlineImageSearch />
            </span>
          </button>

          <input
            className="input"
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
