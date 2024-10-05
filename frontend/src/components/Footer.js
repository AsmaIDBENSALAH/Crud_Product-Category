import React from 'react'
import { FaInstagram, FaFacebook, FaWhatsapp, FaCopyright } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className='text-white text-center py-2' style={{ background: '#333', minHeight: '10vh', bottom: '0', position: 'fixed', width: '100%' }}>
      <div className='container'>
        <div className='d-flex justify-content-center'>
          <a style={{ color: "#ac2bac" }} href="#!" role="button">
            <i className="fab fa-instagram fa-lg"></i>
          </a>
          {/* Icônes de réseaux sociaux */}
          <a href='https://www.instagram.com' className='text-white mx-3' target='_blank' rel='noopener noreferrer'>
            <FaInstagram size="22px" />
          </a>
          <a href='https://www.facebook.com' className='text-white mx-3' target='_blank' rel='noopener noreferrer'>
            <FaFacebook size="22px" />
          </a>
          <a href='https://www.whatsapp.com' className='text-white mx-3' target='_blank' rel='noopener noreferrer'>
            <FaWhatsapp size="22px" />
          </a>
        </div>
        <div className='mt-2'>
          <FaCopyright /> 2024 My Website
        </div>
      </div>
    </footer>
  )
}

export default Footer
