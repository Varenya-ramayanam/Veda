import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import{ signup,login } from "./AuthApi";

const initialState = {
    status: "idle",
    isAuthenticated: false,
    isAdmin: false,
    error: null,
    signupStatus: "idle",
    signupError: null,
    loginStatus: "idle",
    loginError: null,
    user: null,
    success: null,
};

export const signupAsync=createAsyncThunk('auth/signupAsync',async(cred)=>{
    const res=await signup(cred)
    return res
})

export const loginAsync=createAsyncThunk('auth/loginAsync',async(cred)=>{
    const res=await login(cred)
    return res
})

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.isAdmin = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupAsync.pending, (state) => {
                state.signupStatus = "loading";
            })
            .addCase(signupAsync.fulfilled, (state, action) => {
                state.signupStatus = "succeeded";
                state.success = action.payload.message;
            })
            .addCase(signupAsync.rejected, (state, action) => {
                state.signupStatus = "failed";
                state.signupError = action.error.message;
            })
            .addCase(loginAsync.pending, (state) => {
                state.loginStatus = "loading";
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loginStatus = "succeeded";
                state.isAuthenticated = true;
                state.isAdmin = action.payload.isAdmin;
                state.user = action.payload;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loginStatus = "failed";
                state.loginError = action.error.message;
            });
    },
});


//exporting selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsAdmin = (state) => state.auth.isAdmin;
export const selectUser = (state) => state.auth.user;
export const selectSignupStatus = (state) => state.auth.signupStatus;
export const selectSignupError = (state) => state.auth.signupError;
export const selectLoginStatus = (state) => state.auth.loginStatus;
export const selectLoginError = (state) => state.auth.loginError;
export const selectSuccess = (state) => state.auth.success;


export const {logout}=AuthSlice.actions;
export default AuthSlice.reducer;