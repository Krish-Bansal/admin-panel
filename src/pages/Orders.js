import React, { useEffect } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateAOrder } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';
const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'User Info',
    dataIndex: 'name',
    render: (text, record) => (
      <div className='p-0 m-0'>
        <p>{text}</p>
        <p>{record.email}</p>
        <p>{record.mobile}</p>
      </div>
    )
  },
  {
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Bill Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: "Shipping Info",
    dataIndex: "shipping",
    render: (text, record) => (
      <div className='p-0 m-0'>
        <p>{text}</p>
        <p>{record.address}</p>
        <p>{record.other}</p>
        <p>{record.shipmobile}</p>
      </div>
    )
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];
const Orders = () => {
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders(config3))
    //eslint-disable-next-line
  }, [])
  const orderState = useSelector((state) => state?.auth?.orders?.orders)

  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i]?.user?.firstname + " " + orderState[i]?.user?.lastname,
      email: orderState[i]?.user?.email,
      mobile: orderState[i]?.user?.mobile,
      product:
        <Link to={`/admin/order/${orderState[i]?._id}`}>View Orders</Link>,

      amount: orderState[i]?.totalPriceAfterDiscount,
      date: new Date(orderState[i].createdAt).toLocaleString(),
      shipping:
        `${orderState[i]?.shippingInfo?.firstname} ${orderState[i]?.shippingInfo?.lastname}`,
      address:
        `${orderState[i]?.shippingInfo?.address}, ${orderState[i]?.shippingInfo?.city}, ${orderState[i]?.shippingInfo?.state}`,
      other:
        `${orderState[i]?.shippingInfo?.other}, ${orderState[i]?.shippingInfo?.pincode}`,
      shipmobile:
        `${orderState[i]?.shippingInfo?.mobile}`,
      action: (
        <>
          <select name='' defaultValue={orderState[i]?.orderStatus} onChange={(e) => updateOrderStatus(orderState[i]?._id, e.target.value,)} className='form-control form-select' id="">
            <option value="Ordered" disabled selected> Ordered</option>
            <option value="Processing">Processing</option>
            {/* <option value="Shipped">Shipped</option> */}
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Rejected">Rejected</option>
          </select>
        </>
      ),
    });
  }
  const updateOrderStatus = (a, b) => {
    dispatch(updateAOrder({ id: a, status: b, config: config3 }))
  }

  return (
    <div>
      <h3 className='mb-4 title'>Orders</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  )
}
export default Orders;
