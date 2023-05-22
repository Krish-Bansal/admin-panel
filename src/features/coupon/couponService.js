import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axoisconfig';

const getCoupons = async (couponData) => {
  const response = await axios.get(`${base_url}coupon/`, couponData);
  return response.data
};
const createCoupons = async (color) => {
  const response = await axios.post(`${base_url}coupon/`, color, config)
  return response.data
}
const getCoupon = async (id) => {
  const response = await axios.get(`${base_url}coupon/${id}`, config)
  return response.data
}
const deleteCoupon = async (id) => {
  const response = await axios.delete(`${base_url}coupon/${id}`, config)
  return response.data
}
const updateCoupon = async (coupon) => {
  const response = await axios.put(`${base_url}coupon/${coupon.id}`,
    { name: coupon.couponData.name, expiry: coupon.couponData.expiry, discount: coupon.couponData.discount },
    config
  );
  console.log(coupon)
  return response.data;
};

const CouponService = {

  getCoupons,
  createCoupons, getCoupon, deleteCoupon, updateCoupon

};
export default CouponService;