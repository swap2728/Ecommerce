import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder , fetchAllOrders ,updateOrder } from './orderAPI';
import counterSlice from '../counter/counterSlice';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrderPlace:null,
  totalOrders:0
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
    'order/fetchAllOrders',
    async (sort,pagination) => {
      const response = await fetchAllOrders(sort,pagination);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );
  export const updateOrderAsync = createAsyncThunk(
    'order/updateOrder',
    async (update) => {
      const response = await updateOrder(update);
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
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.orders.findIndex(order=>order.id===action.payload.id)
        state.orders[index] = action.payload
      })
  },
});


// export const { increment } = counterSlice.actions;
export const {resetOrder} = orderSlice.actions

export const selectCurrentOrderStatus = (state) => state.order.currentOrderPlace;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;
export default orderSlice.reducer;