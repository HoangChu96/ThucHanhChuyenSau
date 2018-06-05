import url from '../config/handle';

const searchProduct = (key) => (
    fetch(url.searchUrl)
    .then(res => res.json())
);

export default searchProduct;
