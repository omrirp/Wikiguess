import './App.css';
import main from './components/EMain';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Menu from './components/Menu';
import Game from './components/Game';

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={main} />
                <Route path='/login' element={<LogIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/menu' element={<Menu />} />
                <Route path='/game' element={<Game />} />
            </Routes>
        </div>
    );
}

export default App;
