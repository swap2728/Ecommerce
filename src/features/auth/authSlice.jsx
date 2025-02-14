import { createAction, createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
const incrementBy = createAction('incrementBy')
const decrement = createAction('decrement')
import { createUser , loginUser ,updateUser ,signOut ,checkAuth } from './authAPI';
// function createUser(action) {
//   return action.type.endsWith('rejected')
// }
const initialState = {
    value: 0,
    loggedInUserToken: null,
    status: 'idle',
    error:null,
    userChecked:false
  };

  export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async(userData) => {
        const response = await createUser(userData);
        return response.data;
    }
  )

  export const checkAuthAsync = createAsyncThunk(
    'user/checkAuth',
     async () => {
    try {
      const response = await checkAuth();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });

  export const loginUserAsync = createAsyncThunk(
    'user/loginUser',
    async (loginInfo, { rejectWithValue }) => {
      try {
        const response = await loginUser(loginInfo);
        return response.data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error);
      }
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
    async () => {
      const response = await signOut();
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
        state.loggedInUserToken = action.payload;
    })
    .addCase(loginUserAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(loginUserAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loggedInUserToken = action.payload;
    })
    .addCase(loginUserAsync.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error;
    })
    .addCase(updateUserAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(updateUserAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loggedInUserToken = action.payload;
    })
    .addCase(signOutAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(signOutAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loggedInUserToken = null;
    })
    .addCase(checkAuthAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(checkAuthAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loggedInUserToken = action.payload;
      state.userChecked = true;
    })
    .addCase(checkAuthAsync.rejected, (state, action) => {
      state.status = 'idle';
      // state.loggedInUserToken = action.payload;
      state.userChecked = true;
    })

  },
})


export const { increment } = userSlice.actions;
export const selectLoggedInUser = (state)=>state.auth.loggedInUserToken;
export const selectError = (state)=>state.auth.error;
export const selectUserChecked = (state)=>state.auth.userChecked;

export default userSlice.reducer;