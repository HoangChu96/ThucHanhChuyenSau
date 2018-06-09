let url = 'http://192.168.1.9/';
let loginUrl =  url + 'app/login.php';
let registerUrl = url + 'app/register.php';
let changeInfoUrl = url + 'app/change_info.php';
let checkLogin = url + 'app/check_login.php';
let index = url + 'app/';
let typeProduct = url + 'app/images/type/';
let product = url + 'app/images/product/';
let productList = url + 'app/productList.php?page=';
let category = url + 'app/product_by_type.php';
let searchUrl = url + 'app/search.php?key=' ;
let saleProduct = url + 'app/get_collection.php?page=${page}';
let cart = url + 'app/cart.php';

module.exports = {
  productList: productList,
  loginUrl: loginUrl,
  registerUrl: registerUrl,
  index: index,
  typeProduct: typeProduct,
  product: product,
  checkLogin: checkLogin,
  changeInfoUrl: changeInfoUrl,
  searchUrl : searchUrl,
  category: category,
  saleProduct: saleProduct,
  cart: cart
}
