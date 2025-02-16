import React, { useState } from 'react';
import Dashboard from '../../Assets/dashboard.png';
import Product from '../../Assets/products.png';
import Category from '../../Assets/category.png';
import Brand from '../../Assets/brand.png';
import Clothes from '../../Assets/clothes.png';
import { Link } from 'react-router-dom';

function Leftside() {

  const [isOpen, setisOpen] = useState(false);

  const openOption = () => {
    setisOpen(!isOpen);
  }

  return (
    <>
      <div className="container bg-dark m-1 p-3 rounded">
        <div className="row">
          <h3 className='text-light text-end'>Admin</h3>
          <ul className='list-group list-unstyled text-light'>
            <li className='d-flex align-items-center gap-2 ms-3 my-2' style={{cursor: 'pointer'}}>
              <img src={Dashboard} alt="dashboard-icon" />
              <Link to="dashboard" className='m-0 text-capitalize text-decoration-none text-light'>dashboard</Link>
            </li>
            <li className='d-flex align-items-center gap-2 ms-3 my-2' style={{cursor: 'pointer'}}>
              <img onClick={openOption} src={Product} alt="dashboard-icon" />
              <Link to="add-product" className='m-0 text-capitalize text-decoration-none text-light'>products</Link>
            </li>
            {
              isOpen && (
                <ul>
                  <li className='d-flex align-items-center gap-2 ms-3 my-3' style={{cursor: 'pointer'}}>
                    <img src={Category} alt="dashboard-icon" />
                    <Link to="add-category" className='m-0 text-capitalize text-decoration-none text-light'>category</Link>
                  </li>
                  <li className='d-flex align-items-center gap-2 ms-3 my-3' style={{cursor: 'pointer'}}>
                    <img src={Brand} alt="dashboard-icon" />
                    <Link to="add-brand" className='m-0 text-capitalize text-decoration-none text-light'>brand</Link>
                  </li>
                  <li className='d-flex align-items-center gap-2 ms-3 my-3' style={{cursor: 'pointer'}}>
                    <img src={Clothes} alt="dashboard-icon" />
                    <Link to="add-products" className='m-0 text-capitalize text-decoration-none text-light'>product</Link>
                  </li>
                </ul>
              )
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default Leftside
