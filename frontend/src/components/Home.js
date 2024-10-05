import React from 'react';
import img from './../assets/img.jpg';

function Home() {
  return (
    <div className='' style={{ minHeight: '80vh', overflow: 'hidden' , backgroundColor: '#f8f9fa' }}>
      {/* First section */}
      <div className='row' style={{ minHeight: '25vh' }}>
        <div className='col-md-6 d-flex justify-content-center align-items-center flex-column' style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#343a40' }}>Welcome!</h2>
          <p style={{ fontSize: '1rem', textAlign: 'center', color: '#6c757d', marginTop: '1rem', lineHeight: '1.8' }}>
            Our application allows you to efficiently manage your product inventory and their categories.
            Whether you're a retailer, warehouse manager, or store owner, our solution provides you with simple tools
            to track your products, manage stock levels, and organize your categories intuitively.
            Stay up to date with stock alert thresholds, new products, and more.
          </p>
        </div>
        <div className='col-md-6 d-flex flex-column justify-content-center align-items-center'>
          <img src={img} alt="Placeholder" className="img-fluid" style={{ maxWidth: '60%', borderRadius: '0.5rem' }} />
        </div>
      </div>

      {/* Card section with margins on the sides */}
      <div className='row' style={{ minHeight: '30vh', margin: '0.5rem 2rem' }}>
        <h4 className='d-flex justify-content-center' style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#343a40', marginBottom: '0.7rem' }}>About Us</h4>
        <div className='col-md-4'>
          <div className='card shadow-sm' style={{ border: 'none', borderRadius: '1rem' }}>
            <div className='card-body'>
              <h5 className='card-title' style={{ fontSize: '1rem', fontWeight: '600', color: '#007bff' }}>Manage Your Products</h5>
              <p className='card-text' style={{ fontSize: '1rem', color: '#6c757d' }}>
                Easily add, modify, or delete products from our user-friendly interface. Quickly view key information
                such as prices, available quantities, and stock status for real-time and precise tracking.
              </p>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='card shadow-sm' style={{ border: 'none', borderRadius: '1rem' }}>
            <div className='card-body'>
              <h5 className='card-title' style={{ fontSize: '1rem', fontWeight: '600', color: '#007bff' }}>Categorize Your Products</h5>
              <p className='card-text' style={{ fontSize: '1rem', color: '#6c757d' }}>
                Organize your products into different categories for more efficient management. Use our tools to
                classify your products and simplify searches while maintaining a clear overview of your inventory.
              </p>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='card shadow-sm' style={{ border: 'none', borderRadius: '1rem' }}>
            <div className='card-body'>
              <h5 className='card-title' style={{ fontSize: '1rem', fontWeight: '600', color: '#007bff' }}>Stock Level Tracking</h5>
              <p className='card-text' style={{ fontSize: '1rem', color: '#6c757d' }}>
                Proactively manage your stock levels with our threshold alerts. Receive notifications when quantities
                reach critical levels, allowing you to restock in time and avoid shortages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
