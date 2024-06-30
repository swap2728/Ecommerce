import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const incrementBy = createAction('incrementBy')
const decrement = createAction('decrement')
import { createUser , checkUser ,updateUser ,signOut } from './authAPI';
// function createUser(action) {
//   return action.type.endsWith('rejected')
// }
const initialState = {
    value: 0,
    loggedInUser: null,
    status: 'idle',
    error:null
  };

  export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async(userData) => {
        const response = await createUser(userData);
        return response.data;
    }
  )

  export const checkUserAsync = createAsyncThunk(
    'user/checkUser',
    async (loginInfo) => {
      const response = await checkUser(loginInfo);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );
  export const updateUserAsync = createAsyncThunk(
    'user/updateUser',
    async (update) => {
      const response = await updateUser(update);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );
  export const signOutAsync = createAsyncThunk(
    'user/signOut',
    async (update) => {
      const response = await signOut(update);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment:(state)=>{
        state.value+=1;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
    })
    .addCase(checkUserAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(checkUserAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loggedInUser = action.payload;
    })
    .addCase(checkUserAsync.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error;
    })
    .addCase(updateUserAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(updateUserAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loggedInUser = action.payload;
    })
    .addCase(signOutAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(signOutAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loggedInUser = action.payload;
    })
  },
})


export const { increment } = userSlice.actions;
export const selectLoggedInUser = (state)=>state.auth.loggedInUser;
export const selectError = (state)=>state.auth.error;
export default userSlice.reducer;