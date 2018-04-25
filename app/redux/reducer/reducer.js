import {combineReducers} from 'redux';

const defaultState = {
  isLogedIn: false,
  types: [],
  topProducts:[],
  cartArray: [],
  onSignIn: null
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

  //them sp vao gio hang
  if(action.type === 'ADD_CART')
    return{
      ...state,
      cartArray: [].concat(
        ...state.cartArray,
        action.product
      )
    };
  return state;
};

export default reducer;
