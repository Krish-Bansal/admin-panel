import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, resetState } from '../features/customers/customerSlice';
import { deleteUser } from "../features/customers/customerSlice"
import { AiFillDelete } from 'react-icons/ai';
import CustomModal from '../components/CustomModal';
const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',

  },
  {
    title: 'Name',
    dataIndex: 'name',
    defaultSortOrder: "descend",
    sorter: (a, b) => a.name.length - b.name.length
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const data1 = [];

for (let i = 0; i < 40; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,

  });
}

const Customers = () => {
  const [open, setOpen] = useState(false);
  const [customerId, setcustomerId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setcustomerId(e);
  };

  const hideModal = () => {
    setOpen(false);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers())
    dispatch(resetState())
  }, [])
  const customerstate = useSelector((state) => state.customer.customers);
  const data1 = [];
  for (let i = 0; i < customerstate.length; i++) {
    if (customerstate[i].role !== "admin") {
      data1.push({
        key: i,
        name: customerstate[i].firstname + " " + customerstate[i].lastname,
        email: customerstate[i].email,
        mobile: customerstate[i].mobile,
        action: (
          <>
            <button className='ms-3 fs-5 text-danger bg-transparent border-0' onClick={() => showModal(customerstate[i]._id)}>
              <AiFillDelete />
            </button>
          </>
        ),
      })
    }
  }

  const deletedUser = (e) => {
    dispatch(deleteUser(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getUsers())
    }, 500)
  }


  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <div>

        <Table columns={columns} dataSource={data1} />
        <CustomModal hideModal={hideModal}
          open={open}
          performAction={() => {
            deletedUser(customerId);
          }}
          title="Are you sure you want to delete this User?" />
      </div>
    </div>
  )
}

export default Customers;
