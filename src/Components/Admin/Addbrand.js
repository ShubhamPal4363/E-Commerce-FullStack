import { React, useState } from 'react';
import Warning from '../../Assets/Warning.png';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import app from '../Firebase/Firebase';

function Addbrand() {

  const [imageUrl, setImageUrl] = useState('');
  const handleImage = async (event) => {
    const file = event.target.files[0];
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'first_time_using_cloudinary');
    data.append('cloud_name', 'djehx7bnf');

    const res = await fetch('https://api.cloudinary.com/v1_1/djehx7bnf/image/upload', {
      method: 'POST',
      body: data
    });
    const image = await res.json();
    setImageUrl(image.url);
  }

  return (
    <>
      <div className="container d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
        <div className="row">
          <div className="bg-warning rounded p-4" style={{overflow: "hidden"}}>
            <h2>Add Brand</h2>
            <div className="col-10 card-body">
              <Formik initialValues={{ brandName: '' }} 
                validationSchema={Yup.object({
                  brandName: Yup.string()
                    .required('Required')
                })}
                onSubmit={async (values, { resetForm }) => {
                  try {
                    const value = values.brandName;

                    const firestore = getFirestore(app);
                    const result = addDoc(collection(firestore, "brands"), {
                      brandName: value,
                      image: imageUrl,
                    });
                    // console.log(result);
                    resetForm();
                  }
                  catch(err) {
                    console.og(err.message);
                  }
                }}
              >
                {formik => (
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                      <label className='my-2 fs-5'>Brand Logo</label>
                      <input type="file" className="form-control" onChange={handleImage} />
                    </div>
                    <div className="form-group">
                      <label className='my-2 fs-5'>Brand Name</label>
                      <input type="text" className="form-control" placeholder='Enter Brand Name...' name='brandName' {...formik.getFieldProps('brandName')} />
                      <br />
                      {formik.touched.brandName && formik.errors.brandName ? (
                        <div className="text-danger">{formik.errors.brandName}</div>
                      ) : null}
                    </div>
                    <button type="submit" className="btn btn-success my-3">Add Brand</button>
                  </form>
                )}
              </Formik>
            </div>
            <div className="card-end text-end" style={{position: "relative"}}>
              <img className="img-fluid" src={Warning} alt="warning-logo" style={{position: "absolute", top: "-4rem", transform: "translateX(-49px)"}} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Addbrand
