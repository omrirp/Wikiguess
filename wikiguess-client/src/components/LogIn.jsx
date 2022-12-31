import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LogIn() {
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
            <h1 style={{ fontSize: 100, color: '#04649d' }}>Log In</h1>
            <form action='submit' style={{ textAlign: 'left' }}>
                <div>
                    <p>User Name</p>
                    <input type='text' placeholder='User Name' />
                </div>
                <div>
                    <p>Password</p>
                    <input type='password' placeholder='password' />
                </div>

                <div>
                    <Link to={'/menu'} className='links'>
                        <Button variant='primary'>Log In!</Button>
                    </Link>
                </div>
            </form>
            <Link to={'/signup'} style={{ fontSize: 25 }}>
                not registered? sign up now!
            </Link>
        </div>
    );
}
