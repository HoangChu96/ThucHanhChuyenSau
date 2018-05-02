let url = 'http://192.168.1.7/';
let loginUrl =  url + 'app/login.php';
let registerUrl = url + 'app/register.php';
let changeInfoUrl = url + 'app/change_info.php';
let checkLogin = url + 'app/check_login.php';
let index = url + 'app/';
let typeProduct = url + 'app/images/type/';
let product = url + 'app/images/product/';
let productList = url + 'app/productList.php?page=';
let searchUrl = url + 'app/search.php?key=${key}';

module.exports = {
  productList: productList,
  loginUrl: loginUrl,
  registerUrl: registerUrl,
  index: index,
  typeProduct: typeProduct,
  product: product,
  checkLogin: checkLogin,
  changeInfoUrl: changeInfoUrl,
  searchUrl : searchUrl
}
