import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import axios from 'axios';

export default function Menu() {
    useEffect(async function () {
        let res = await axios.get('https://localhost:44330/api/users');
        console.log(res.data);
    }, []);

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
