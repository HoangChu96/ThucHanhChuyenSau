import MainApp from '../MainApp';
import Main from '../screens/Main';
import Authentication from '../screens/Authentication';
import ChangeInfo from '../screens/ChangeInfo';
import OrderHistory from '../screens/OrderHistory';
import {StackNavigator} from 'react-navigation';
import Category from '../screens/Category';
import ProductByType from '../components/ProductByType';

const MainStack = StackNavigator(
  {
    MainApp : {screen: MainApp},
    Main: {screen: Main},
    Authentication: {screen: Authentication},
    ChangeInfo: {screen: ChangeInfo},
    OrderHistory: {screen: OrderHistory},
    Category: {screen: Category},
    ProductByType: {screen: ProductByType}
  },
  {
   headerMode: 'none',
   mode: 'modal',
   navigationOptions: {
     gesturesEnabled: false,
   },
   transitionConfig: () => ({
     transitionSpec: {
       duration: 300,
     },
     screenInterpolator: sceneProps => {
       const { layout, position, scene } = sceneProps;
       const { index } = scene;

       const height = layout.initHeight;
       const translateX = position.interpolate({

           inputRange: [index - 1, index, index + 1],
           outputRange: [height, 0, 0],

       });

       const opacity = position.interpolate({
         inputRange: [index-1, index - 0.99, index],
         outputRange: [0, 0.5, 1],
       });

       return { opacity, transform: [{ translateX }] };
      },
    }),
  }
)

export default MainStack;
