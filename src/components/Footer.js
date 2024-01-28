import { FaHeart } from 'react-icons/fa';

function Footer() {
  return (
    <footer>
      <small>
        &copy; {new Date().getFullYear()} made with{' '}
        <FaHeart style={{ color: 'red' }} /> by -{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/anibal-vallejo-franco/"
        >
          Anibal Vallejo Franco
        </a>
      </small>
    </footer>
  );
}

export default Footer;
