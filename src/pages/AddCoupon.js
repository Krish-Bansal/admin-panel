import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import { createCoupon, getACoupon, resetState } from "../features/coupon/couponSlice";
let schema = yup.object().shape({
  name: yup.string().required("Coupon is Required"),
  expiry: yup.date().required("Expiry Date is Required"),
  discount: yup.number().required("Discount Percentage is Required")
})

const AddCoupon = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getCouponId = location.pathname.split('/')[3]
  const newCoupon = useSelector((state) => state.coupon);
  const { isSuccess, isError, isLoading, createdCoupon, dataCoupon } = newCoupon;
  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId))
    } else {
      dispatch(resetState)
    }

  }, [getCouponId])
  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Added Successfully!")
    }
    if (isError) {
      toast.error("Something Went Wrong!")
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: dataCoupon?.name || "",
      expiry: dataCoupon?.expiry || "",
      discount: dataCoupon?.discount || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createCoupon(values));
      formik.resetForm()
      setTimeout(() => { dispatch(resetState()) }, 3000)
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Add Coupon</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput type="text"
            name="name"
            label="Enter Coupon Name"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
            id="coupon"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput type="date"
            name="expiry"
            label="Enter Expiry Date"
            onChng={formik.handleChange("expiry")}
            onBlr={formik.handleBlur("expiry")}
            val={formik.values.expiry}
            id="expiry"
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput type="number"
            name="discount"
            label="Enter Discount"
            onChng={formik.handleChange("discount")}
            onBlr={formik.handleBlur("discount")}
            val={formik.values.discount}
            id="discount"
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button className="btn btn-success border-0 rounded-3 my-5" type="submit">{getCouponId !== undefined ? "Edit" : "Add"} Coupon </button>
        </form>
      </div>
    </div>
  )
};
export default AddCoupon;