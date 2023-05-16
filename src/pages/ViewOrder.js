import React, { useEffect } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, } from '../features/auth/authSlice';
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
    title: 'Count (Quantity)',
    dataIndex: 'count',
  },
  {
    title: 'Color',
    dataIndex: 'color',
    render: (color) => <div style={{ backgroundColor: color, width: 20, height: 20 }}></div>
  },
  {
    title: "Size",
    dataIndex: "size"
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },

];

const ViewOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder(orderId))
  }, [])

  const orderState = useSelector((state) => state?.auth?.singleorder?.orders)
  const data1 = [];

  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState?.orderItems[i]?.product?.title,
      count: orderState?.orderItems[i]?.quantity,
      color: orderState?.orderItems[i]?.color?.title,
      amount: orderState?.orderItems[i]?.price,
      size: orderState?.orderItems[i]?.size
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
