
import { Link } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import googleiconImg from '../assets/images/google-icon.svg';


import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss'

export function NewRoom() {
    const {user} = useAuth();
    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="" />
                <strong>Cree y administre sus salas</strong>
                <p> Responda las dudas de su audiencia</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="" />
                    <h1>{user?.name}</h1>
                    <form>
                        <input type="text" />
                        <button>Entrar a sala</button>
                    </form>
                    <p>
                        Quiere entrar a una sala Existente?
                        <Link to="/">Click here</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}