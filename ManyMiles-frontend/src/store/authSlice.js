import {createSlice} from '@reduxjs/toolkit';
// import { useauthService } from '../components/Authentication/authService';
const user=localStorage.getItem('user');
const token=localStorage.getItem("token");
// const storedUser = localStorage.getItem('user');

const  authSlice=createSlice({
    name:'auth',
    initialState:{
        user:user || null,
        isAuthenticated: !!token,
        error:null,
        loading:false
    },
    reducers:{
        // loginStart:(state)=>{
        //     state.loading=true;
        //     state.error=null;
        // },
        loginSuccess:(state,action)=>{
            console.log(action)
            state.user=action.payload.user;
            state.token=action.payload.user.accessToken;
            state.isAuthenticated=true;
            state.loading=false,
            state.error=null
            localStorage.setItem('user',JSON.stringify(action.payload.user.user));
            localStorage.setItem('token',action.payload.user.accessToken);
        },
        // loginFailure: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        //   },
        logout:(state)=>{
            state.user=null;
            state.isAuthenticated=false;
            state.token=null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            // useauthService.logout();
            // localStorage.removeItem('user');
        },
    }
})
// export const login = (credentials) => async (dispatch) => {
//     try {
//       dispatch(loginStart());
//       const data = await authService.login(credentials.email, credentials.password);
//       dispatch(loginSuccess(data.user || data));
//       return data;
//     } catch (error) {
//       dispatch(loginFailure(error.message));
//       throw error;
//     }
//   };
export const {loginSuccess,logout}=authSlice.actions;
export default authSlice.reducer;