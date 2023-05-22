import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { deleteACoupon, getCoupons } from "../features/coupon/couponSlice";
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import CustomModal from '../components/CustomModal';
import { deleteAColor } from '../features/color/colorSlice';


const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length
  },
  {
    title: 'Discount (%)',
    dataIndex: 'discount',
    sorter: (a, b) => a.discount.length - b.discount.length
  },
  {
    title: 'Coupon Used',
    dataIndex: 'count',
  },
  {
    title: 'Expiry Date',
    dataIndex: 'expiry',
    sorter: (a, b) => a.expiry.length - b.expiry.length
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },


];


const Couponlist = () => {
  const getTokenFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const config3 = {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
        }`,
      Accept: "application/json",
    },
  };
  const [open, setOpen] = useState(false);
  const [couponId, setcouponId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcouponId(e);
  };

  const hideModal = () => {
    setOpen(false);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCoupons(config3))
  }, [])
  const couponState = useSelector((state) => state.coupon.coupons)
  const data1 = [];
  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i + 1,
      name: couponState[i].name,
      discount: couponState[i].discount,
      count: couponState[i].count,
      expiry: new Date(couponState[i].expiry).toLocaleString(),
      action: (
        <>
          <Link to={`/admin/coupon/${couponState[i]._id}`} className='fs-5 text-danger' style={{ "textDecoration": "none" }}>
            <BiEdit />
          </Link>
          <button className='ms-3 fs-5 text-danger bg-transparent border-0' onClick={() => showModal(couponState[i]._id)}>
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteCoupon = (e) => {
    dispatch(deleteACoupon(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupons(config3))
    }, 500)
  }
  return (

    <div>
      <h3 className="mb-4 title">Coupons</h3>
      <div>

        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCoupon(couponId);
        }}
        title="Are you sure you want to delete this Coupon?" />
    </div>
  )
}

export default Couponlist;
