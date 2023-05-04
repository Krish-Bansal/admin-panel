import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAproduct, getProducts, resetState } from '../features/product/productSlice';
import { Link } from 'react-router-dom';
import CustomModal from '../components/CustomModal';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length

  },
  {
    title: 'Category',
    dataIndex: 'category',
    sorter: (a, b) => a.category.length - b.category.length

  },
  {
    title: 'Color',
    dataIndex: 'color',
    sorter: (a, b) => a.color.length - b.color.length

  },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price

  },
  {
    title: 'Action',
    dataIndex: 'action',
  },

];


const Productlist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [productId, setproductId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setproductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  }
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products)
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      category: productState[i].category,
      color: <div className='flex'>
        <ul className="colors ps-0 mb-0">
          <div className='bg-black flex '>
            <li style={{ backgroundColor: productState[i]?.color[0]?.title, borderColor: 'white' }}>
            </li>
          </div>

        </ul>
      </div>,
      price: `${productState[i].price}`,
      action: (
        <>
          <Link to={`/admin/product/${productState[i]._id}`} className='fs-5 text-danger' style={{ "textDecoration": "none" }}>
            <BiEdit />
          </Link>
          <button to="/" className='ms-3 fs-5 text-danger bg-transparent border-0' onClick={() => showModal(productState[i]._id)}>
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deletedProduct = (e) => {
    dispatch(deleteAproduct(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts())
    }, 500)
  }
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>

        <Table columns={columns} dataSource={data1} />
        <CustomModal hideModal={hideModal}
          open={open}
          performAction={() => {
            deletedProduct(productId);
          }}
          title="Are you sure you want to delete this Product?" />
      </div>
    </div>
  )
}

export default Productlist
