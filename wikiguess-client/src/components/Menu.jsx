import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Menu() {
    return (
        <div>
            <h1 style={{ fontSize: 100, color: '#04649d' }}>Welcome User!</h1>
            <div
                style={{
                    height: 350,
                    width: 350,
                    backgroundColor: '#00649c',
                    margin: 'auto',
                    fontSize: 60,
                    borderRadius: 10,
                }}
            >
                LOGO
            </div>
            <div
                style={{
                    fontSize: 30,
                    maxWidth: 500,
                    display: 'flex',
                    justifyContent: 'center',

                    margin: 'auto',
                }}
                className='links btns'
            >
                <Link to='/game'>
                    <Button variant='primary'>Play!</Button>
                </Link>
                <Link>
                    <Button variant='primary'>Statistics</Button>
                </Link>
                <Link>
                    <Button variant='primary'>Sahe</Button>
                </Link>
            </div>
            <Link to={'/'} style={{ fontSize: 25 }}>
                log out
            </Link>
        </div>
    );
}
