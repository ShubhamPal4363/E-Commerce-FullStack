import React from 'react';
import Star from '../../Assets/Star.png';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import app from '../Firebase/Firebase';

function Addcategory() {

  const [imageUrl, setImageUrl] = React.useState('');
  const handleImage = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'first_time_using_cloudinary');
    data.append('cloud_name', 'djehx7bnf');

    const res = await fetch('https://api.cloudinary.com/v1_1/djehx7bnf/image/upload', {
      method: 'POST',
      body: data
    });

    const result = await res.json();
    setImageUrl(result.url);
  }

  return (
    <>
      <div className="container d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
        <div className="row">
          <div className="bg-success rounded p-4" style={{overflow: "hidden"}}>
            <h2 className="text-light">Add Category</h2>
            <div className="card-body">
              <Formik initialValues={{ categoryName: '' }} 
              validationSchema={Yup.object({
                categoryName: Yup.string()
                  .min(4, 'Must be 4 characters or more')
                  .required('Required'),
              })}
              onSubmit={async (values, { resetForm }) => {
                try {
                  const value = values.categoryName;

                  const firestore = getFirestore(app);
                  const result = addDoc(collection(firestore, "categories"), {
                    categoryName: value,
                    image: imageUrl,
                  });
                  console.log(result);
                  resetForm();
                  setImageUrl('');
                }
                catch(err) {
                  console.og(err.message);
                }
              }}
              >
                {formik => (
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                      <label className='my-2 text-light fs-5'>Category Logo</label>
                      <input type="file" className="form-control" onChange={handleImage} />
                    </div>
                    <div className="form-group">
                      <label className='my-2 text-light fs-5'>Category Name</label>
                      <input type="text" className="form-control" placeholder='Enter Category Name' name="categoryName" id="categoryName" {...formik.getFieldProps('categoryName')} />
                      <br />
                      {formik.touched.categoryName && formik.errors.categoryName ? (
                        <div className="text-warning">{formik.errors.categoryName}</div>
                      ) : null}
                    </div>
                    <button className="btn btn-dark my-3">Add Category</button>
                  </form>
                )}
              </Formik>

            </div>
            <div className="card-end text-end" style={{position: "relative"}}>
              <img className="img-fluid" src={Star} alt="star-logo" style={{position: "absolute", top: "-4rem", transform: "translateX(-45px)"}} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Addcategory
