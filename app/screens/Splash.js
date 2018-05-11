import React, {Component} from 'react';
import {
	StyleSheet, View, Text, Animated, Image
} from 'react-native';

class FadeInView extends React.Component {
	state = {
		fadeAnim: new Animated.Value(0)
	}

	componentDidMount(){
		Animated.timing(
			this.state.fadeAnim,
			{
				toValue: 1,
				duration: 2000,
				useNativeDriver: true,
			}
		).start();
	}

	render() {
	    let { fadeAnim } = this.state;

	    return (
	      <Animated.View                 // Special animatable View
	        style={{
			    opacity: fadeAnim, // Binds directly
			    transform: [{
			      translateY: fadeAnim.interpolate({
			        // inputRange: [0, 1],
			        // outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
			        inputRange: [0, 1],
  					outputRange: [200, 0],
			      }),
			    }],
	         // ...this.props.style,
	          // opacity: fadeAnim,         // Bind opacity to animated value
	        }}
	      >
	        {this.props.children}
	      </Animated.View>
	    );
	}
}


export default class Splash extends Component{

	render(){
		const {container, title, wrapper, imgStyle} = styles;
		return(
			<View style= {container} >
				<FadeInView style={wrapper}>
					<Image 
						style={imgStyle}
						source = {require('../media/appIcon/logo.jpg')}
					/>
	
		        </FadeInView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		backgroundColor: 'white',
		flex:1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	wrapper:{
		width: 250, 
		height: 50, 
		backgroundColor: 'powderblue',
		justifyContent: 'center',
		alignItems: 'center'
	},
	title:{
		fontSize: 40, 
		textAlign: 'center', 
		margin: 10,
		color: '#07fdd7'
	},
	imgStyle:{
		width: 200,
		height: 200
	}
})