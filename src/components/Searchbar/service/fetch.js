import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35752200-55fbc3ad9b98a84c3d01ddaf0';

export function fetchPics(searchValue, page, signal) {
  const request = axios.get(
    `${BASE_URL}/?key=${API_KEY}&q=${searchValue}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`,
    signal
  );
  return request;
}
