import { createSlice } from "@reduxjs/toolkit";

const GreenHouseSlice = createSlice({
  name: "GreenHouse",
  initialState: {
    farmID: '',
    GreenHouses: [],
    Relays: [],
  },
  reducers: {
    setFarmID: (state: any, action: any) => {
      state.farmID = action.payload;
    },
    setGreenHouse:(state: any, action: any)=>{
      state.GreenHouses = action.payload;
    },
    setRelay: (state: any, action: any)=>{
      state.Relays = action.payload;
    }
  }
});

export const { setFarmID, setGreenHouse, setRelay } = GreenHouseSlice.actions;
export const Farm =  GreenHouseSlice.reducer;
