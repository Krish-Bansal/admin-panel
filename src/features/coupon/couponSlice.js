import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import CouponService from "./couponService";

export const getCoupons = createAsyncThunk('coupon/get-coupons', async (thunkAPI) => {
  try {
    return await CouponService.getCoupons();

  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const createCoupon = createAsyncThunk('coupon/create-coupon', async (couponData, thunkAPI) => {
  try {
    return await CouponService.createCoupons(couponData)
  } catch (error) {
    return thunkAPI.rejectWithValue(error);

  }
});

export const getACoupon = createAsyncThunk("coupon/get-coupon",
  async (id, thunkAPI) => {
    try {
      return await CouponService.getCoupon(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  })
export const deleteACoupon = createAsyncThunk(
  "coupon/delete-coupon",
  async (id, thunkAPI) => {
    try {
      return await CouponService.deleteCoupon(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
);

export const resetState = createAction("Reset_all")

const initialState = {
  coupons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCoupons.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coupons = action.payload;
      })
      .addCase(getCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCoupon = action.payload;
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteACoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteACoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCoupon = action.payload;
      })
      .addCase(deleteACoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getACoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getACoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.dataCoupon = action.payload;
      })
      .addCase(getACoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState)
  },
})

export default couponSlice.reducer;