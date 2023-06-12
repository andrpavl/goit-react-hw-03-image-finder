import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchPics } from './Searchbar/service/fetch';
import Loader from './Loader/Loader';
import { Button } from './Button/Button';
import css from './App.module.css';

export class App extends Component {
  abortCtrl;

  state = {
    searchValue: '',
    images: [],
    page: 1,
    loading: false,
    error: null,
  };

  handleSearch = searchValue => {
    this.setState({ searchValue, page: 1 });
  };

  componentDidUpdate(_, prevState) {
    const { searchValue, page } = this.state;
    if (
      (prevState.searchValue !== searchValue && searchValue !== '') ||
      prevState.page !== page
    ) {
      this.abortCtrl = new AbortController();
      this.setState({ loading: true, error: null });
      fetchPics(searchValue, page, {
        signal: this.abortCtrl.signal,
      })
        .then(resp => {
          if (resp.data.hits.length > 0) {
            this.setState(prevState => ({
              images: [...prevState.images, ...resp.data.hits],
              error: null,
            }));
          } else {
            this.setState({ images: [], error: 'Can not find anything.' });
          }
        })
        .catch(error => this.setState({ error: error.message }))
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  loadMorePics = async () => {
    const { searchValue, page } = this.state;
    this.abortCtrl = new AbortController();
    try {
      this.setState({ loading: true, error: null });
      const resp = await fetchPics(searchValue, page + 1, {
        signal: this.abortCtrl.signal,
      });
      if (resp.data.hits.length > 0) {
        this.setState(prevState => ({
          images: [...prevState.images, ...resp.data.hits],
          page: prevState.page + 1,
        }));
      } else {
        this.setState({ error: 'Can not find anything.' });
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { images, loading, error } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery images={images} />
        {loading && (
          <div className={css.loader}>
            <Loader  />
          </div>
        )}
        {error && alert(error)}
        {!loading && !error && images.length >= 12 && (
          <Button onClick={this.loadMorePics} />
        )}
      </div>
    );
  }
}
