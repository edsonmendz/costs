import './footer.css'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

function Footer() {
    return (
      <footer className='footer'>
        <ul className='social_list'>
          <li>
            <FaFacebook />
          </li>
          <li>
            <FaInstagram />
          </li>
          <li>
            <FaLinkedin />
          </li>
        </ul>
        <p className='copy_right'>
          <span>Costs</span> &copy; 2024
        </p>
      </footer>
    )
  }
  
  export default Footer