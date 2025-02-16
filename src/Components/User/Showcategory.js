import { React, useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../Firebase/Firebase';
import '../../Style/style.css';

function Showcategory() {

  const [category, setCategory] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const firestore = getFirestore(app);
      const data = await getDocs(collection(firestore, "categories"));

      const category = [];
      data.forEach((doc) => {
        const docData = doc.data();
        category.push({
          name: docData.categoryName,
          image: docData.image,
        });
      });
      console.log(category);
      setCategory(category);
    }

    getData();
  }, [])

  return (
    <>
      <div className="container">
        <div className="row">
          <h5 className="category-heading">Featured Category</h5>
          <div className="col d-flex align-items-center justify-content-center flex-wrap gap-2">
            {
              category.slice(0, 5).map(({name, image}) => (
                <div className="card category-card p-3 d-flex align-items-center justify-content-center flex-column gap-2">
                  <div className="card-logo">
                    <img className='img-fluid' src={image} alt="fruit-icon" />
                  </div>
                  <div className="card-name">
                    <h5 style={{fontSize: "1.12rem", fontWeight: "400"}}>{name}</h5>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Showcategory
