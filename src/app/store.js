import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/auth/authSlice"
import customerReducer from '../features/customers/customerSlice';
import productReducer from "../features/product/productSlice"
import pCategoryReducer from "../features/pcategory/pcategorySlice"
import colorReducer from "../features/color/colorSlice"
import enquiryReducer from "../features/enquiry/enquirySlice"
import uploadReducer from "../features/upload/uploadSlice"
import couponSlice from '../features/coupon/couponSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer, customer: customerReducer, product: productReducer,
    pCategory: pCategoryReducer,
    color: colorReducer,
    enquiry: enquiryReducer,
    upload: uploadReducer,
    coupon: couponSlice,
  },
});