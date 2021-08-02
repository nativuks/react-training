import { FormEvent} from 'react'
import { Link, useHistory } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import googleiconImg from '../assets/images/google-icon.svg';


import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss'
import { useState } from 'react';
import { database } from '../services/firebase';
import { Button } from '../components/Button';


export function NewRoom() {
    const {user} = useAuth();

    const [newRoom, setNewRoom] = useState('');

    const history = useHistory();

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();

        if(newRoom.trim() === '') {
            return;
        }

        console.log('Sala', newRoom);

        const roomRef = await database.ref('rooms');

        const firebaseRoom =  await roomRef.push({
            title: newRoom,
            authorId: user?.id
        });

        console.log(firebaseRoom.key);

        history.push(`/rooms/${firebaseRoom.key}`);

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
                    <form onSubmit={handleCreateRoom}>
                        <input
                            onChange = { event => setNewRoom(event.target.value)} 
                            type="text" />
                        <Button>Crear sala</Button>
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