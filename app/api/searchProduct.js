import url from '../config/handle';

const searchProduct = (key) => (
    fetch(url.searchUrl + key)
    .then(res => res.json())
);

export default searchProduct;
