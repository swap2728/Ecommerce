import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const incrementBy = createAction('incrementBy')
const decrement = createAction('decrement')
import { addToCart ,fetchItemsByUserId ,updateCart,deleteItemFromCart ,resetCart } from './cartAPI';
// function createUser(action) {
//   return action.type.endsWith('rejected')
// }
const initialState = {
    // value: 0,
    status: 'idle',
    items:[]
  };

  export const addToCartAsync = createAsyncThunk(
    'cart/addToCart',
    async(item) => {
        const response = await addToCart(item);
        return response.data;
    }
  )

  export const fetchItemsByUserIdAsync = createAsyncThunk(
    'cart/fetchItemsByUserId',
    async(userid) => {
        const response = await fetchItemsByUserId(userid);
        return response.data;
    }
  )
  export const updateCartAsync = createAsyncThunk(
    'cart/updateCart',
    async(update) => {
        const response = await updateCart(update);
        return response.data;
    }
  )

  export const deleteItemFromCartAsync = createAsyncThunk(
    'cart/deleteItemFromCart',
    async (itemId) => {
      const response = await deleteItemFromCart(itemId);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

  export const resetCartAsync = createAsyncThunk(
    'cart/resetCart',
    async (userId) => {
      const response = await resetCart(userId);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment:(state)=>{
        state.value+=1;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
    })
    .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
        // state.cartLoaded = true;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // state.items = action.payload;
        const index = state.items.findIndex(item=>item.id===action.payload.id)
        state.items[index] = action.payload
        // state.cartLoaded = true;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index =  state.items.findIndex(item=>item.id===action.payload.id)
        state.items.splice(index,1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = [];
        // const index =  state.items.findIndex(item=>item.id===action.payload.id)
        // state.items.splice(index,1);
      })
  },
})


export const { increment } = cartSlice.actions;
// export const selectLoggedInUser = (state)=>state.cart.loggedInUser;
export const selectItems = (state)=>state.cart.items;
export default cartSlice.reducer;