import React, { useEffect } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateAOrder } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
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
    title: 'Amount',
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
      </div>
    )
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },


];
const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders())
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
        `${orderState[i]?.shippingInfo?.firstname}` + ` ` + `${orderState[i]?.shippingInfo?.lastname}`,
      address:
        `${orderState[i]?.shippingInfo?.address}` + `,` + `${orderState[i]?.shippingInfo?.city}` + `,` + `${orderState[i]?.shippingInfo?.state}`,
      other:

        `${orderState[i]?.shippingInfo?.other}` + `,` + `${orderState[i]?.shippingInfo?.pincode}`,

      action: (
        <>
          <select name='' defaultValue={orderState[i]?.orderStatus} onChange={(e) => updateOrderStatus(orderState[i]?._id, e.target.value,)} className='form-control form-select' id="">
            <option value="Ordered" disabled selected> Ordered</option>
            <option value="Processed">Processed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </>
      ),
    });
  }
  const updateOrderStatus = (a, b) => {
    dispatch(updateAOrder({ id: a, status: b }))
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
