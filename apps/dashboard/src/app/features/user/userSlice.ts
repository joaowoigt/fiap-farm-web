import { createSlice } from "@reduxjs/toolkit";
import User from "../../../domain/models/farm/user/User";

export interface UserState {
  user: User;
}

const initialState: UserState = {
  user: {
    production: [],
    sales: [],
    goals: {
      productionGoals: [],
      salesGoals: [],
    },
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      console.log("User set in Redux store:", action.payload);
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
