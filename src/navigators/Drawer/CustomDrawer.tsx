import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ToastAndroid, Modal } from 'react-native';
import { Image } from 'react-native-elements';
import { State, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient'
import IconMa from 'react-native-vector-icons/MaterialCommunityIcons'
import { ArrayDrawer } from './ArrayDrawer';
import GreenHouseDB from '../../services/Relays/GreenHouseDB';

const GreenHouse = new GreenHouseDB();

const HeaderDrawer = () =>(
  <View style={styles.header}>
  <View style={styles.imageView}>
    <Image style={styles.accountimage} source={require('../../assets/images/gau.png')}></Image>
  </View>
  <View style={styles.info} >
    <View style={{ width: 150 }}>
      <Text style={styles.accountname}>Header</Text>
      <Text style={styles.email}>Header@gmail.com</Text>
    </View>
    <IconMa name='account-edit' size={20} style={{ marginLeft: 30, }} />
  </View>
</View>
)

const CustomDrawer = (props: any) => {
  const { state, descriptors, navigation } = props;
  const [Arr, setArr]: any = useState([]);
    useEffect(()=>{
        async function GetGreenHouse() {
            const a  = await GreenHouse.GetGreenhouseByFarmId('63a3d99dc69cef7476812bea');
            setArr(a);
        }
        GetGreenHouse();
    },[])
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#99FF66', '#009999', '#2C698D']} style={styles.header}>
        <HeaderDrawer/>
      </LinearGradient>
      {/* Thân drawer */}
      <DrawerContentScrollView>
        <View>
          {ArrayDrawer
            .map((route: any, index: number) => {
              let isFocused = state.routes[state.index].name === route.name;
              const color = isFocused ? '#000033' : '#2C698D';
              const [Show, setShow] = useState(false);
              const [ShowGreenHouse, setShowGreenHouse] = useState(false);
              const handleShowMenu = (route: any, index: number) => {
                if (ArrayDrawer.filter((item: any) => item.parentID === route.id).length > 0
                ) {
                    setShow(!Show);
                } else {
                  if (route.id === 1) {
                    if (Arr.length > 0){
                      setShowGreenHouse(!ShowGreenHouse);
                    }
                    else{
                      ToastAndroid.show('Nhà kính chưa hoạt động', ToastAndroid.SHORT);
                    }
                  }
                  else {
                    navigation.navigate(route.name);
                  }
                }
              };
              const handleChild = (route: any) => {
                navigation.navigate(route.name)
              }
              return (
                <View key={route.id}>
                  {
                    route.parentID === 0 &&
                    <TouchableOpacity
                      style={[styles.item, { backgroundColor: color }]}
                      onPress={() => {
                        handleShowMenu(route, index); // Chuyển đến màn hình tương ứng với mục được chọn
                      }}
                    >
                      <Text style={styles.itemname}>{route.name}</Text> 
                    </TouchableOpacity>
                  }
                  {/* Hiển thị các mục con nếu có */}

                  {
                    Show &&
                    ArrayDrawer
                      .filter((doc: any) => doc.parentID === route.id)
                      .map((item: any, index: number) => {
                        let isFocused = state.routes[state.index].name === item.name;
                        const color = isFocused ? '#000033' : '#2C698D';
                        return (
                          <TouchableOpacity
                            key={index}
                            style={[styles.childitem, { backgroundColor: color }]}
                            onPress={() => {
                              handleChild(item); // Chuyển đến màn hình tương ứng với mục được chọn
                            }}
                          >
                            <Text style={styles.itemchildname}>{item.name}</Text>
                          </TouchableOpacity>
                        )
                      }
                      )

                  }
                  {
                    ShowGreenHouse &&
                    Arr.length > 0 &&
                    Arr
                    .map((item: any, index: number) => {
                      let isFocused = state.routes[state.index].name === item.name;
                      const color = isFocused ? '#000033' : '#2C698D';
                      return (
                        <TouchableOpacity
                          key={index}
                          style={[styles.childitem, { backgroundColor: color }]}
                          onPress={() => {
                            handleChild(item); // Chuyển đến màn hình tương ứng với mục được chọn
                          }}
                        >
                          <Text style={styles.itemchildname}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }
                    )
                  }
                </View>
              );
            })}

        </View>
      </DrawerContentScrollView>

    </View>
  );
};
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C698D',
  },
  header: {
    height: HEIGHT / 4.7,
    marginBottom: 20,
  },
  imageView: {
    marginLeft: 20,
    marginTop: 15,
  },
  accountimage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    resizeMode: 'contain'
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountname: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 14,
    fontWeight: '500',
    color: 'white'
  },
  email: {
    marginLeft: 20,
    fontSize: 12,
    fontWeight: '400',
    color: 'white'
  },
  // Option
  optionView: {
  },
  item: {
    height: 40,
    justifyContent: 'center',
  },
  childitem: {
    height: 40,
    justifyContent: 'center',
  },
  itemchildname: {
    marginLeft: 20,
    color: 'white',
    fontSize: 13,
    fontWeight: '400',
  },
  itemname: {
    paddingHorizontal: 10,
    color: 'white',
    fontSize: 14,
    fontWeight: '400'
  },

});

export default CustomDrawer;