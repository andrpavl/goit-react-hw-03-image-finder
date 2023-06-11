import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchPics } from './Searchbar/service/fetch';
import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    searchValue: '',
    images: [],
    page: 1,
    loading: false,
  };

  handleSearch = searchValue => {
    this.setState({ searchValue });
  };

  componentDidUpdate(_, prevState) {
    const { searchValue, page } = this.state;
    if (
      prevState.searchValue !== this.state.searchValue ||
      prevState.page !== page
    ) {
      this.setState({ loading: true });
      fetchPics(searchValue, page)
        .then(resp => this.setState({ images: resp.data.hits }))
        .catch(error => console.log(error))
        .finally(() => {
          this.setState({ loading: false });;
        })
    }
  }

  render() {
    const { images, loading } = this.state;
    return (
      <div>
        {loading && <Loader />}
        <Searchbar onSubmit={this.handleSearch}  />
        <ImageGallery images={images} />
      </div>
    );
  }
}
