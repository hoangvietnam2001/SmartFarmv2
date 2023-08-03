import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	SafeAreaView,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {Style} from './Style';
export default function ChooseGateway({navigation}) {
	const [check, setCheck] = useState(false);


	// handle check
	const handleCheck = id => {
		if (id) {
			setCheck(!check);
		}
	};

	const data = [
		{
			id: 1,
			name: 'Gateway trồng Sâm',
			status: false,
		},
		{
			id: 2,
			name: 'Gateway trồng Dưa',
			status: false,
		},
		{
			id: 3,
			name: 'Gateway trồng Cà phê',
			status: false,
		},
	];
	const Item = ({item}) => {
		console.log(item);
		// check-circle
		return (
			<View style={Style.item}>
				<Text style={Style.itemName}>{item.name}</Text>
				<TouchableOpacity onPress={handleCheck}>
					<Icon
						name={check ? 'check-circle' : 'circle-thin'}
						size={18}
						color={'#005A6F'}
						style={Style.itemIcon}
					/>
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<SafeAreaView style={Style.container}>
			<StatusBar
				barStyle={'light-content'}
				backgroundColor={'rgba(44, 105, 141, 1)'}
			/>
			<Text style={Style.title}>Chọn Gateway sử dụng</Text>

			{/* List gateway  */}
			<View style={Style.bgFlatlist}>
				<FlatList
					style={Style.flatlist}
					data={data}
					renderItem={({item}) => {
						return <Item item={item} />;
					}}
					keyExtractor={item => item.id}
					showsVerticalScrollIndicator={false}
				/>
			</View>

			<TouchableOpacity
				style={Style.bgButton}
				onPress={() => navigation.navigate('Loading')}>
				<LinearGradient
					style={Style.button}
					colors={['#07BD89', '#006E8C', '#002E32']}
					start={{x: 0, y: 0}}
					end={{x: 1, y: 0}}>
					<Text style={Style.textButton}>Tiếp tục</Text>
				</LinearGradient>
			</TouchableOpacity>

			<TouchableOpacity>
				<Text style={Style.loginOther}>Đăng nhập bằng tài khoản khác</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}
