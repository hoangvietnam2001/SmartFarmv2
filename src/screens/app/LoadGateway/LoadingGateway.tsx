import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	StatusBar,
	TouchableOpacity,
} from 'react-native';
import {useState, useEffect} from 'react';
import Spinner from 'react-native-spinkit';
import Icon from 'react-native-vector-icons/Ionicons';

export default function LoadingGateway({navigation}:{navigation:any}) {
	let [isLoading, setIsLoading] = useState(true);
	let [error, setError] = useState();
	let [response, setResponse] = useState({});

	useEffect(() => {
		fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
			.then(res => res.json())
			.then(
				result => {
					setIsLoading(false);
					setResponse(result);
				},
				error => {
					setIsLoading(false);
					setError(error);
				},
			);


	}, []);

	const getContent = () => {
		if (isLoading) {
			return (
				<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
					<Spinner
						isVisible={true}
						size={204}
						type={'Circle'}
						color={'#4F4A4A'}></Spinner>
					<Icon
						name={'search'}
						color="#000"
						size={87}
						style={{
							position: 'absolute',
						}}
					/>
				</View>
			);
		}

		if (error) {
			return <Text>{error}</Text>;
		}

		return (
			<>
				<TouchableOpacity
					onPress={() => navigation.navigate('AuthScreen', {screen: 'Login'})}
					style={{
						backgroundColor: 'red',
						width: 200,
						height: 50,
						borderRadius: 10,
						justifyContent: 'center',
					}}>
					<Text>Trả về màn hình chính đặt ở đây</Text>
				</TouchableOpacity>
			</>
		);
	};

	return (
		<View style={styles.container}>
			{getContent()}
			<StatusBar barStyle={'default'} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
