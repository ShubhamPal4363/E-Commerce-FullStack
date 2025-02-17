import React, { useState, useEffect } from 'react';
import Product from '../../Assets/prdts.png';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import app from '../Firebase/Firebase';

function Addprdt() {
  const [imageUrl, setImageUrl] = useState('');
  const [categoryData, setcategoryData] = useState([]);

  const handleImage = async (e, formik) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'first_time_using_cloudinary');
    data.append('cloud_name', 'djehx7bnf');

    const res = await fetch('https://api.cloudinary.com/v1_1/djehx7bnf/image/upload', {
      method: 'POST',
      body: data,
    });

    const result = await res.json();
    setImageUrl(result.url);
    formik.setFieldValue('productImage', result.url);  // Update Formik with image URL
  };

  useEffect(() => {
    async function fetchCategory() {
      const firestore = getFirestore(app);
      const snapShot = await getDocs(collection(firestore, 'categories'));
      const categories = [];
      snapShot.forEach((doc) => {
        categories.push(doc.data().categoryName);
      });
      setcategoryData(categories);
    }

    fetchCategory();
  }, []);

  return (
    <>
      <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="row">
          <div className="bg-success rounded p-4 my-2" style={{ overflow: 'hidden' }}>
            <h2 className="text-light">Add Product</h2>
            <div className="card-body">
              <Formik
                initialValues={{
                  productName: '',
                  productCat: '',
                  productPrice: '',
                  productDiscount: '',
                  productImage: null,
                }}
                validationSchema={Yup.object({
                  productName: Yup.string().min(4, 'Must be 4 characters or more').required('Name is required'),
                  productCat: Yup.string().required('Please select a category'),
                  productPrice: Yup.number().required('Price is required').positive('Price must be positive'),
                  productDiscount: Yup.number().required('Discount is required').min(0, 'Discount cannot be negative').max(100, 'Discount cannot be more than 100'),
                  productImage: Yup.mixed().required('Product image is required'),
                })}
                onSubmit={async (values, { resetForm }) => {
                  try {
                    const firestore = getFirestore(app);
                    const result = await addDoc(collection(firestore, 'products'), {
                      image: imageUrl,
                      productName: values.productName,
                      productPrice: values.productPrice,
                      productDiscount: values.productDiscount,
                      productCat: values.productCat,
                    });
                    console.log('Firestore result:', result);
                    resetForm();
                    setImageUrl('');
                  } catch (err) {
                    console.log('Error:', err.message);
                  }
                }}
              >
                {(formik) => (
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                      <label className="my-2 text-light fs-5">Product Image</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => {
                          formik.setFieldValue('productImage', e.currentTarget.files[0]);
                          handleImage(e, formik);
                        }}
                      />
                      {formik.touched.productImage && formik.errors.productImage && (
                        <div className="text-white">{formik.errors.productImage}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="my-2 text-light fs-5">Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Product Name"
                        name="productName"
                        id="productName"
                        {...formik.getFieldProps('productName')}
                      />
                      {formik.touched.productName && formik.errors.productName && (
                        <div className="text-white">{formik.errors.productName}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="my-2 text-light fs-5">Product Category</label>
                      <select
                        name="productCat"
                        id="productCat"
                        className="form-control"
                        {...formik.getFieldProps('productCat')}
                      >
                        <option value="">Select a Category</option>
                        {categoryData.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      {formik.touched.productCat && formik.errors.productCat && (
                        <div className="text-white">{formik.errors.productCat}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="my-2 text-light fs-5">Product Price</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Price"
                        name="productPrice"
                        {...formik.getFieldProps('productPrice')}
                      />
                      {formik.touched.productPrice && formik.errors.productPrice && (
                        <div className="text-white">{formik.errors.productPrice}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="my-2 text-light fs-5">Product Discount</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Discount"
                        name="productDiscount"
                        {...formik.getFieldProps('productDiscount')}
                      />
                      {formik.touched.productDiscount && formik.errors.productDiscount && (
                        <div className="text-white">{formik.errors.productDiscount}</div>
                      )}
                    </div>
                    <button type="submit" className="btn btn-dark my-3">Add Product</button>
                  </form>
                )}
              </Formik>
            </div>
            <div className="card-end text-end" style={{ position: 'relative' }}>
              <img
                className="img-fluid"
                src={Product}
                alt="star-logo"
                style={{ position: 'absolute', top: '-4rem', transform: 'translateX(-58px)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addprdt;
