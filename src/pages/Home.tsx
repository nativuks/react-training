import { useHistory } from 'react-router';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import googleiconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth';
export function Home() {

    const { user, signInWithGoogle} = useAuth();
    const history = useHistory()

    async function handleCreateRoom() {
        console.log('CreateRoom');
        if (!user) {
            await signInWithGoogle();
        }
        history.push('/rooms/new')
    }
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
                    <button onClick={handleCreateRoom} className="create-room">
                       <img src={googleiconImg} alt="" />  
                       Cree su sala con Google
                    </button>
                    <div className="separator"> O entre a una sala</div>
                    <form>
                        <input type="text" />
                        <button>Entrar a sala</button>
                    </form>
                </div>
            </main>
        </div>
    );
}