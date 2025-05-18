import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  name: "",
};

const centerAreaSlice = createSlice({
  name: "centerArea",
  initialState,
  reducers: {
    setBalance(state, action) {
      state.balance = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
  },
});

export const { setBalance, setName } = centerAreaSlice.actions;

export default centerAreaSlice.reducer;
