import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Game() {
    let questionNum = 1;
    let question = 'question ?';

    return (
        <div>
            <div
                style={{
                    height: 350,
                    width: 350,
                    backgroundColor: '#00649c',
                    margin: 'auto',
                    marginTop: 50,
                    fontSize: 60,
                    borderRadius: 10,
                }}
            >
                LOGO
            </div>

            <div style={{ fontSize: 40, height: 150 }}>
                <span>{questionNum}. </span> <span>{question}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', height: 150 }} className='links btns'>
                <Button variant='success'>Yes</Button>
                <Button variant='danger'>No</Button>
                <Button variant='warning'>Dont know</Button>
            </div>
            <div>
                <Link to={'/menu'} style={{ fontSize: 25 }}>
                    end game
                </Link>
            </div>
        </div>
    );
}
