import { React, useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../Firebase/Firebase';
import '../../Style/style.css';

function Showbrand() {

  const [brand, setBrand] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const firestore = getFirestore(app);
      const data = await getDocs(collection(firestore, "brands"));

      const brand = [];
      data.forEach((doc) => {
        const docData = doc.data();
        brand.push({
          name: docData.brandName,
          image: docData.image,
        });
      });
      console.log(brand);
      setBrand(brand);
    }

    getData();
  }, []);

  return (
    <>
      <div className="container">
        <h5 className="brand-heading">Feature Brand</h5>
        <div className="row">
          <div className="col">
            <div className="card">
              {
                brand.slice(0, 6).map(({name, image}) => (
                  <div className="card-data d-flex align-items-center justify-content-center gap-2 m-2">
                    <div className="card-logo">
                      <img className='brand-logo' src={image} alt="brand-icon" />
                    </div>
                    <div className="card-name">
                      <h5 style={{fontSize: "1.12rem", fontWeight: "400", margin: "0px"}}>{name}</h5>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Showbrand