import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { deleteAColor, getColors, resetState } from '../features/color/colorSlice';
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import CustomModal from '../components/CustomModal';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',

  },
  {
    title: 'Action',
    dataIndex: 'action',
  },


];


const Colorlist = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };

  const hideModal = () => {
    setOpen(false);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColors())
    dispatch(resetState())
    //eslint-disable-next-line
  }, [])
  const colorState = useSelector((state) => state.color.colors)
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1,
      name: <p>
        <ul className="colors ps-0">
          <div className='bg-black p-1 '><li style={{ backgroundColor: colorState[i]?.title, borderColor: 'white' }}></li></div>

        </ul>
      </p>,
      action: (
        <>
          <Link to={`/admin/color/${colorState[i]._id}`} className='fs-5 text-danger' style={{ "textDecoration": "none" }}>
            <BiEdit />
          </Link>
          <button className='ms-3 fs-5 text-danger bg-transparent border-0' onClick={() => showModal(colorState[i]._id)}>
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteColor = (e) => {
    dispatch(deleteAColor(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors())
    }, 500)
  }

  return (

    <div>
      <h3 className="mb-4 title">Colors</h3>
      <div>

        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteColor(colorId);
        }}
        title="Are you sure you want to delete this Product Color?" />
    </div>
  )
}

export default Colorlist;
