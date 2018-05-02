const NavigationReducer = (state='HOME', action) => {
  if(action.type === 'Tab_Home') return 'HOME';
  if(action.type === 'Tab_Category') return 'CATEGORY';
  if(action.type === 'Tab_Favorite') return 'FAVORITE';
  if(action.type === 'Tab_Cart') return 'CART';
  if(action.type === 'Tab_Contact') return 'CONTACT';

  if(action.type === 'Show_MainApp') return 'MAINAPP';
  if(action.type === 'Show_Main') return 'MAIN';
  if(action.type === 'Show_Authentication') return 'AUTHENTICATION';
  if(action.type === 'Show_ChangeInfo') return 'CHANGEINFO';
  if(action.type === 'Show_OrderHistory') return 'ORDER_HISTORY';
  if(action.type === 'Show_ProductList') return 'PRODUCT_LIST';
  if(action.type === 'Show_ProductListView2') return 'PRODUCT_LIST_VIEW2';
  if(action.type === 'Show_ProductDetail') return 'PRODUCT_DETAIL';

  return state;
};

export default NavigationReducer;
