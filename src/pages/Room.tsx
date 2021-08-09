import React, { FormEvent, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/room.scss'
type RoomParams = {
    id: string;
}

type FirebaseQuestions = Record<string, {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;

}

export function Room() {
    const params = useParams<RoomParams>();
    const roomId = params.id

    const { user } = useAuth();

    const[ title, setTitle] = useState('');
    const[newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);

     async function handleSenQuestion(event: FormEvent){
        event.preventDefault();

        if( newQuestion.trim() === '') { 
            return;
        }

        if(!user){
            throw new Error('You must be loggfed in');
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,

            },

            isHighlighted: false,
            isAnswered: false,
        }

         await database.ref(`rooms/${roomId}/questions`).push(question);

         setNewQuestion('');
     }

     useEffect(() => {
        const roomRef =  database.ref(`rooms/${roomId}`);

        

        roomRef.on('value', room =>{
            const databaseRoom = room.val();
            const firebaseQuestions : FirebaseQuestions =  databaseRoom.questions ?? {}; 

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isAnswered: value.isAnswered,
                    isHighlighted: value.isHighlighted,
                }
            });
            console.log(parsedQuestions);
            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions);
        });
        


     }, []);

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Logo" />
                    <RoomCode code={roomId} />
                </div>
            </header>
          <main>
              <div className="room-title">
                  <h1>Sala {title}</h1>
                  {questions.length > 0 && <span>{questions.length} preguntas</span> }
                  
              </div>
            <form onSubmit={handleSenQuestion}>
                <textarea 
                placeholder=" ingrese su pregunta"
                onChange= { event => setNewQuestion(event.target.value)}
                value={newQuestion}
                />
             <div className="form-footer">
               {user ?(
               <div className="user-info">
                   <img src= {user?.avatar} alt={ user?.name} />
                   <span>{user?.name}</span>
               </div>

               ):(
                   <span> para enviar una pregunta <button>haga su login</button></span>
               )}  
             <Button  type="submit">Enviar Pregunta</Button>          
             </div>   
            </form>
             {JSON.stringify(questions)}
          </main>

        </div>
    );
}
