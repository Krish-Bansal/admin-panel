import React, { useEffect } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { getOrderByUser, getOrders } from '../features/auth/authSlice';
import { Link, useLocation } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
const columns = [

  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Product Name',
    dataIndex: 'name',
  },
  {
    title: 'Count',
    dataIndex: 'count',
  },
  {
    title: 'Color',
    dataIndex: 'color',
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
    title: 'Action',
    dataIndex: 'action',
  },


];
const ViewOrder = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByUser(userId))
  }, [])
  const orderState = useSelector((state) => state.auth.orders[0].products)
  console.log(orderState)
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i].product.title,
      count: orderState[i].count,
      color: orderState[i].product.color,
      amount: orderState[i].product.amount,
      date: orderState[i].product.price,
      action: (
        <>
          <Link to="/" className='fs-5 text-danger' style={{ "textDecoration": "none" }}>
            <BiEdit />
          </Link>
          <Link to="/" className='ms-3 fs-5 text-danger'>
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className='mb-4 title'>View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  )
}
export default ViewOrder;
