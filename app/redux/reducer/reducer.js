const defaultState = {
  isLogedIn: false,
  types: [],
  topProducts:[],
  cartArray: [],
  onSignIn: null,
  dataSource: [],
  saleArray: [],
  cartShow: [],
  searchArray: [],
  quantity: 1
};

const reducer = (state = defaultState, action) =>{
  if(action.type === 'TOOGLE_LOGNIN')
    return {
      ...state,
      isLogedIn: true
    };
  if(action.type === 'TOOGLE_LOGNOUT')
    return {
      ...state,
      isLogedIn: false
    };

  //lay ra danh sach cac type, top product of page index
  if(action.type === 'TYPES')
    return {
      ...state,
      types: action.types,
      topProducts: action.topProducts
    };

  if(action.type === 'TYPEPRODUCT')
    return {
      ...state,
      dataSource: action.dataSource
    };

  if(action.type === 'SALEPRODUCT')
    return {
      ...state,
      saleArray: action.saleArray
    };
  
  //them sp vao gio hang
  if(action.type === 'ADD_CART')
    return{
      ...state,
      cartArray: state.cartArray.concat(action.cartArray)
      // cartArray: []
    };

    //xóa một sản phẩm trong giỏ hàng
  if(action.type === 'DELETE_CART')
    return{
      ...state,
      cartArray: action.cartArray
    };

  if(action.type === 'SEARCH_PRODUCT'){
    return{
      ...state,
      searchArray: action.searchArray
    }
  }

  if(action.type === 'SIGNIN'){
    return {
      ...state,
      isLogedIn: action.isLogedIn
    }
  }
  return state;
};

export default reducer;