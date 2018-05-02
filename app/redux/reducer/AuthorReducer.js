const defaultState = {
  isLogedIn: false,
  types: [],
  topProducts:[],
  cartArray: [],
  onSignIn: null
};

const AuthorReducer = (state = defaultState, action) =>{
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

  //them sp vao gio hang
  if(action.type === 'ADD_CART')
    return{
      ...state,
      cartArray: [
        ...state.cartArray,
        action.product
      ]
    };

  if(action.type === 'SIGNIN'){
    return {
      ...state,
      onSignIn: action.onSignIn
    }
  }
  return state;
};

export default AuthorReducer;