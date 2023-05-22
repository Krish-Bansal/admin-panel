import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService"
import { toast } from "react-toastify";

const getUserfromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
const initialState = {
  user: getUserfromLocalStorage,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getMonthlyData = createAsyncThunk('orders/monthlydata', async (data, thunkAPI) => {
  try {
    return await authService.getMonthlyOrders(data)

  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getYearlyData = createAsyncThunk('orders/yearlydata', async (data, thunkAPI) => {
  try {
    return await authService.getYearlyStats(data)

  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    return await authService.login(userData);

  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})



export const getOrders = createAsyncThunk('user/getallorders', async (data, thunkAPI) => {
  try {
    return await authService.getOrders(data)

  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getOrder = createAsyncThunk('order/get-order', async (id, thunkAPI) => {
  try {
    return await authService.getOrder(id)

  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})


export const updateAOrder = createAsyncThunk('order/update-order', async (data, thunkAPI) => {
  try {
    return await authService.updateOrder(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = "success"
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleorder = action.payload;
        state.message = "success"
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getMonthlyData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonthlyData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.monthlyData = action.payload;
        state.message = "success"
      })
      .addCase(getMonthlyData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getYearlyData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getYearlyData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.yearlyData = action.payload;
        state.message = "success"
      })
      .addCase(getYearlyData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updateorder = action.payload;
        toast.success("Order Updated Successfully")
      })
      .addCase(updateAOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
  },

});

export default authSlice.reducer;