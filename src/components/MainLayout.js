import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,

} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx"
import { IoIosPeople } from 'react-icons/io'
import { Outlet } from 'react-router-dom';
import { RiCoupon3Line } from "react-icons/ri";
import { MdOutlineCampaign } from 'react-icons/md'
import { AiOutlineShoppingCart, AiOutlineOrderedList, AiOutlineBgColors } from 'react-icons/ai'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoListUnordered } from 'react-icons/go'
import { HiClipboardList } from 'react-icons/hi'
import { Layout, Menu, theme } from 'antd';
import { GiClothes } from 'react-icons/gi'
import React, { useState } from 'react';
import { BsPatchQuestion, BsCardList } from 'react-icons/bs'
import { BiCategoryAlt, BiColor, BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const userState = useSelector(state => state?.auth?.user)
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout /*onContextMenu={(e) => e.preventDefault()}*/>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" style={{ background: "#001529" }}>
          <h2 className='text-white fs-5 text-center py-3 mb-0'>


            <span className="sm-logo">DEFY </span>
            <span className='lg-logo'>Defy Lifestyle </span>

          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key === "signout") {
              localStorage.clear()
              window.location.reload()
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <RxDashboard className='fs-4' />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <IoIosPeople className='fs-4' />,
              label: 'Customers',
            },
            {
              key: 'catalog',
              icon: <AiOutlineShoppingCart className='fs-4' />,
              label: 'Catalog',
              children: [
                {
                  key: 'product',
                  icon: <GiClothes className='fs-4' />,
                  label: 'Add Product',

                },
                {
                  key: "product-list",
                  icon: <AiOutlineOrderedList className='fs-4' />,
                  label: 'Product List',
                },

                {
                  key: "category",
                  icon: <BiCategoryAlt className='fs-4' />,
                  label: 'Category',
                },
                {
                  key: "list-category",
                  icon: <GoListUnordered className='fs-4' />,
                  label: 'Category List',
                },
                {
                  key: "color",
                  icon: <AiOutlineBgColors className='fs-4' />,
                  label: 'Color',
                },
                {
                  key: "list-color",
                  icon: <BiColor className='fs-4' />,
                  label: 'Color List',
                },
              ]
            },
            {
              key: "orders",
              icon: <HiClipboardList className="fs-4" />,
              label: ' Orders',
            },
            {
              key: 'marketing',
              icon: <MdOutlineCampaign className='fs-4' />,
              label: 'Marketing',
              children: [
                {
                  key: 'coupon',
                  icon: <RiCoupon3Line className='fs-4' />,
                  label: 'Add Coupon',

                },
                {
                  key: "coupon-list",
                  icon: <BsCardList className='fs-4' />,
                  label: 'Coupon List',
                },
              ]
            },
            {
              key: "enquiries",
              icon: <BsPatchQuestion className="fs-4" />,
              label: "Enquiries"
            },
            {
              key: "signout",
              icon: <BiLogOut className="fs-4" />,
              label: "Signout"
            }
          ]}
        />
      </Sider >
      <Layout className="site-layout">
        <Header className='d-flex justify-content-between ps-1 pe-5'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <div className='d-flex gap-4 align-items-center'>
            {/* <div className='position-relative'>
              <IoIosNotifications className='fs-4' />
              <span className='badge bg-warning rounded-circle p-1 position-absolute'>3</span>
            </div> */}
            <div className='d-flex gap-3 align-items-center dropdown' >
              <div>
                <div className='admin-image'>{userState?.firstname?.charAt(0).toUpperCase()}</div>
                {/* <img width={32} height={32} src='https://yt3.ggpht.com/yti/AHXOFjUFLasw0ow4A1OuSdqDn2Cpy0NYvZyx1y1CkPNIyw=s88-c-k-c0x00ffffff-no-rj-mo' alt="" /> */}
              </div>
              <div role="button" id='dropdownMenuLink' data-bs-toggle="dropdown" aria-expanded="false">
                <h5 className='mb-0'>{userState?.firstname + " " + userState?.lastname}</h5>
                <p className='mb-0'>{userState?.email}</p>
              </div>
              <div className='dropdown-menu' aria-labelledby='dropdownMenuLink'>
                <li><Link to="/" className='dropdown-item py-1 mb-1' style={{ "height": "auto", "lineHeight": "20px" }}>
                  View Profile</Link></li>
                <li><Link to="/" className='dropdown-item py-1 mb-1' style={{ "height": "auto", "lineHeight": "20px" }}>Signout</Link></li>


              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer position='top-right' autoClose={250} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable theme='light' />
          <Outlet />
        </Content>
      </Layout>
    </Layout >
  );
};
export default MainLayout;