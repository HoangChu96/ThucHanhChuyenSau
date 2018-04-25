let url = 'http://192.168.1.4/';
let loginUrl =  url + 'app/login.php';
let registerUrl = url + 'app/register.php';
let checkLogin = url + 'app/check_login.php';
let index = url + 'app/';
let typeProduct = url + 'app/images/type/';
let product = url + 'app/images/product/';
let productList = url + 'appBanHang/productList.php?page=';

module.exports = {
  productList: productList,
  loginUrl: loginUrl,
  registerUrl: registerUrl,
  index: index,
  typeProduct: typeProduct,
  product: product,
  checkLogin: checkLogin
}
