import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function signUp() {
    return (
        <div
            style={{
                fontSize: 30,
                maxWidth: 500,
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                margin: 'auto',
            }}
        >
            <h1 style={{ fontSize: 100, color: '#04649d' }}>Sign Up</h1>

            <form action='submit' style={{ textAlign: 'left' }}>
                <div>
                    <p>Email</p>
                    <input type='email' placeholder='Email' />
                </div>
                <div>
                    <p>User Name</p>
                    <input type='text' placeholder='User Name' />
                </div>
                <div>
                    <p>Password</p>
                    <input type='password' placeholder='password' />
                </div>
                <div>
                    <p>Confirn Password</p>
                    <input type='password' placeholder='Confirn password' />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to={'/menu'} className='links'>
                        <Button variant='primary'>Sign Up!</Button>
                    </Link>
                </div>
            </form>
            <Link to={'/login'} style={{ fontSize: 25 }}>
                already registered? log in here!
            </Link>
        </div>
    );
}
