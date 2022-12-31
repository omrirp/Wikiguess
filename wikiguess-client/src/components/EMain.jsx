import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const size = 400;

const main = (
    <div>
        <h1 style={{ fontSize: 150 }}>
            <span style={{ color: '#9a0000' }}>Wik</span>
            <span style={{ color: '#2f9a69' }}>i G</span>
            <span style={{ color: '#00649c' }}>ue</span>
            <span style={{ color: '#2f9a69' }}>ss</span>
        </h1>
        <img
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Wikidata-logo-en.svg/1200px-Wikidata-logo-en.svg.png?20130219185912'
            alt=''
            style={{ height: size, width: size }}
        />
        <div className='navi' style={{ display: 'flex', flexDirection: 'column' }}>
            <Link to={'/login'} className='links'>
                <Button variant='primary'>Log In</Button>
            </Link>
            <Link to={'/signup'} className='links'>
                <Button variant='primary'>Sign Up</Button>
            </Link>
        </div>
    </div>
);

export default main;
