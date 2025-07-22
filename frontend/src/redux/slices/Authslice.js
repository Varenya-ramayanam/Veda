import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get user from local storage
const storedUser = localStorage.getItem("userinfo");
const userFromStorage = storedUser ? JSON.parse(storedUser) : null;


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


// Get guestId from local storage (no JSON parsing needed for plain string)
const initialGuestId = localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId); // Ensure it's always set

// Initial state
const initialState = {
    user: userFromStorage,
    guestId: initialGuestId,
    loading: false,
    error: null,
};

// Async thunk for login
export const login = createAsyncThunk(
    "auth/login",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
                userData
            );
            localStorage.setItem("userinfo", JSON.stringify(response.data.user));
            localStorage.setItem("userToken", response.data.token);
            return response.data.user;

        } catch (error) {
            return rejectWithValue(
                error?.response?.data || { message: "Network error" }
            );
        }
    }
);

// Async thunk for register
export const register = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
                userData
            );
            localStorage.setItem("userinfo", JSON.stringify(response.data.user));
            localStorage.setItem("userToken", response.data.token);
            return response.data.user;

        } catch (error) {
            return rejectWithValue(
                error?.response?.data || { message: "Network error" }
            );
        }
    }
);

// Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.removeItem("userinfo");
            localStorage.removeItem("userToken");
            localStorage.setItem("guestId", state.guestId);
        },
        generateGuestId: (state) => {
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.setItem("guestId", state.guestId);
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload.message;
                state.loading = false;
            })

            // Register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload.message;
                state.loading = false;
            });
    },
});

export const { logout, generateGuestId } = authSlice.actions;
export default authSlice.reducer;
