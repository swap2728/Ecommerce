import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder  } from './orderAPI';
import counterSlice from '../counter/counterSlice';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrderPlace:null
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder:(state)=>{
        state.currentOrderPlace = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrderPlace = action.payload;
      });
  },
});

// export const { increment } = counterSlice.actions;
export const {resetOrder} = orderSlice.actions

export const selectCurrentOrderStatus = (state) => state.order.currentOrderPlace;

export default orderSlice.reducer;