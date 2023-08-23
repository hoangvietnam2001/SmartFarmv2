import {createSlice} from '@reduxjs/toolkit';

const GreenHouseSlice = createSlice({
  name: "GreenHouse",
  initialState: {
    farmID: '',
    GreenHouses: [],
    Relays: [],
    enableModalAdd: false,
    showDropDownTypes: false,
    showDropDownPin: false,
    Type: {value:'', name:''},
    Pin: -1,
    nameDevice:'',
    GreenHouse: {},
    image: '',
    enableModalDelete: false,
    refreshing: false,
  },
  reducers: {
    setFarmID: (state: any, action: any) => {
      state.farmID = action.payload;
    },
    setGreenHouses:(state: any, action: any)=>{
      state.GreenHouses = action.payload;
    },
    setRelay: (state: any, action: any)=>{
      state.Relays = action.payload;
    },
    setModalAdd:(state, action)=>{
      state.enableModalAdd = action.payload;
    },
    setShowType:(state: any, action)=>{
      state.showDropDownTypes = action.payload;
    },
    setShowPin:(state, action)=>{
      state.showDropDownPin = action.payload;
    }, 
    setType: (state, action)=>{
      state.Type = action.payload;
    },
    setPin: (state,action)=>{
      state.Pin = action.payload;
    },
    setGreenHouse: (state: any,action)=>{
      state.GreenHouse = action.payload;
    },
    setNameDevice:  (state,action)=>{
      state.nameDevice = action.payload;
    },
    setImage: (state,action)=>{
      state.image = action.payload;
    },
    setModalDelete: (state: any, action)=>{
      state.enableModalDelete = action.payload
    },
    setRefreshing: (state, action)=>{
      state.refreshing = action.payload
    }
}})

export const { setFarmID, 
  setGreenHouses, 
  setRelay, 
  setModalAdd , 
  setShowType, 
  setShowPin,
  setType,
  setPin,
  setGreenHouse,
  setNameDevice,
  setImage,
  setModalDelete,
  setRefreshing
} = GreenHouseSlice.actions;
export const Farm =  GreenHouseSlice.reducer;
