import { React, useEffect, useRef, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useNavigate, useLocation } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState, updateAProduct, getAProduct } from "../features/product/productSlice";
let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
  color: yup
    .array()
    .min(1, "Pick at least one color").max(1, "You can only select one color")
    .required("Color is Required"),
  quantity: yup.number().required("Quantity is Required"),
  // size: yup.array().min(1, "Pick at least one size").required("Size is required")
  images: yup.array()
    .min(1, 'At least one image is required')
    .max(10, 'Maximum 10 images allowed'),
});

const Addproduct = () => {
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
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getColors());
  }, []);

  const catState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct, productTitle, productDescription, productPrice, productCategory, productSize, productTags, productColorTitle, productQuantity, productImage, updatedProduct } = newProduct;

  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getAProduct(getProductId));
    } else {
      dispatch(resetState());
    }
  }, [getProductId]);
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfully!")
    }
    if (isSuccess && updatedProduct) {
      toast.success("Category Updated Successfully!");
      navigate('/admin/product-list')
    }
    if (isError) {
      toast.error("Something Went Wrong!")
    }
  }, [isSuccess, isError, isLoading]);
  const deleteImage = (id) => {
    dispatch(delImg(id));
  }
  const onDrop = (acceptedFiles) => {
    const config = config3; // Assuming config3 is accessible in the current scope
    dispatch(uploadImg({ acceptedFiles, config }));
  };
  const coloropt = colorState?.map((i) => ({
    label: (
      <ul className="colors ps-0">
        <div className='bg-black'>
          <li style={{ backgroundColor: i.title, borderColor: 'white' }}></li>
        </div>
      </ul>
    ),
    value: i._id, // Change this line to use the color title instead of _id
  }));



  const img = [];
  imgState?.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: productTitle || "",
      description: productDescription || "",
      price: productPrice || "",
      category: productCategory || "",
      tags: productTags || "",
      color: [],
      quantity: productQuantity || "",
      images: productImage || [],
      size: productSize || [],
    },

    validationSchema: schema,
    onSubmit: (values) => {
      if (getProductId !== undefined) {

        const data = { id: getProductId, productData: values }
        dispatch(updateAProduct(data))
        dispatch(resetState())
      }
      else {
        dispatch(createProducts(values));
        setColor(null);
        formik.resetForm()
        setTimeout(() => { dispatch(resetState()) }, 3000)
      }
    },
  });
  useEffect(() => {
    if (productColorTitle) {
      handleColors(productColorTitle); // Ensure the value is always an array
    }
  }, [productColorTitle])
  useEffect(() => {
    if (productImage) {
      const imageUrls = productImage.map((image) => ({
        url: image.url,
        public_id: image.public_id,
      }));
      setImgState(imageUrls);
    }
    // ... other field assignments
  }, [productImage]);

  const handleColors = (selectedColors) => {
    formik.setFieldValue('color', Array.isArray(selectedColors) ? selectedColors : [selectedColors]);
  };

  const handleSizes = (selectedSizes) => {
    formik.setFieldValue("size", selectedSizes)
  };
  return (
    <div>
      <h3 className="mb-4 title">{getProductId !== undefined ? "Edit" : "Add"} Product</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onChng={formik.handleChange("price")}
            onBlr={formik.handleBlur("price")}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>


          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Category</option>
            {catState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          {formik.values.category === "Shirt" && (
            <>
              <Select
                mode="multiple"
                allowClear
                className="w-100"
                placeholder="Select sizes"
                value={formik.values.size}
                onChange={handleSizes}
                options={[
                  { label: 'S', value: 'S' },
                  { label: 'M', value: 'M' },
                  { label: 'L', value: 'L' },
                  { label: 'XL', value: 'XL' },
                  { label: 'XXL', value: 'XXL' },
                  { label: "XXXL", value: "XXXL" }
                ]}
              />
              <div className="error">
                {formik.touched.size && formik.errors.size}
              </div>
            </>
          )}

          {formik.values.category === "Pant" && (
            <>
              <Select
                mode="multiple"
                allowClear
                className="w-100"
                placeholder="Select sizes"
                value={formik.values.size}
                onChange={handleSizes}
                options={[
                  { label: '29', value: '29' },
                  { label: '30', value: '30' },
                  { label: '32', value: '32' },
                  { label: '34', value: '34' },
                  { label: '36', value: '36' },
                  { label: '38', value: '38' },
                ]}
              />
              <div className="error">
                {formik.touched.size && formik.errors.size}
              </div>
            </>
          )}
          <select
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Select Tag
            </option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>

          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select colors"
            value={formik.values.color}
            onChange={handleColors}
            options={coloropt}
          />
          {formik.touched.color && formik.errors.color && (
            <div className="error">{formik.errors.color}</div>
          )}
          <CustomInput
            type="number"
            label="Enter Product Quantity"
            name="quantity"
            onChng={formik.handleChange("quantity")}
            onBlr={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>

          <div>
            <p>
              Note: The first uploaded image will be the main image of the product card and single product, the second image will be the hover image of the product card, and the rest of the images will be the images of the single product. Maximum 10 images of a single product are allowed.
            </p>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState && imgState.map((image, index) => (
              <div className="position-relative" key={index}>
                <button
                  type="button"
                  onClick={() => deleteImage(image.public_id)}
                  className="btn-close position-absolute"
                  style={{ top: "10px", right: "10px" }}
                ></button>
                <img src={image.url} alt="" width={200} height={200} />
              </div>
            ))}
          </div>
          {formik.touched.images && formik.errors.images && (
            <div className="error">{formik.errors.images}</div>
          )}
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getProductId !== undefined ? "Edit" : "Add"}  Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;