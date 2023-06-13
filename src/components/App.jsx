import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchPics } from '../service/fetch';
import Loader from './Loader/Loader';
import { Button } from './Button/Button';
import css from './App.module.css';
import Notiflix from 'notiflix';

export class App extends Component {
  abortCtrl;

  state = {
    searchValue: '',
    images: [],
    page: 1,
    loading: false,
    error: null,
    areMore: true,
  };

  handleSearch = searchValue => {
    this.setState({ searchValue, page: 1, images: [] });
  };

  async componentDidUpdate(_, prevState) {
    const { searchValue, page } = this.state;

    if (
      prevState.searchValue !== this.state.searchValue ||
      prevState.page !== this.state.page
    ) {
      this.abortCtrl = new AbortController();
      try {
        this.setState({ loading: true });
        const { data } = await fetchPics(searchValue, page, {
          signal: this.abortCtrl.signal,
        });
        if (data.hits) {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            areMore: data.hits.length >= 12,
          }));
        } else {
          this.setState({
            images: [],
            error: 'Can not find anything.',
            areMore: false,
          });
        }
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  loadMorePics = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, loading, error, areMore } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery images={images} />
        {loading && (
          <div className={css.loader}>
            <Loader />
          </div>
        )}
        {error && Notiflix.Notify.failure(error)}
        {!loading && !error && images.length >= 12 && areMore && (
          <Button onClick={this.loadMorePics} />
        )}
      </div>
    );
  }
}
