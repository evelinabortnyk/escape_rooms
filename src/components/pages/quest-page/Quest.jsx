import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import './quest.css'
import './form.css'

import clockIcon from './img/clock.svg'
import personIcon from '../home-page/img/person.svg'
import puzzleIcon from '../home-page/img/puzzle.svg'
import closeVector from './img/close.svg'

import Form from "../form/Form";


function Quest() {
    const { id } = useParams();
    const [quest, setQuest] = useState(null)
    const [formState, setFormState] = useState(false)
    const [message, setMessage] = useState("");
    const [modalState, setModalState] = useState(false)

    useEffect(() => {
        fetch(`https://escape-rooms-8h88.onrender.com/dataQuests?id=${id}`)
            .then(res => res.json())
            .then(data => setQuest(data));
    }, []);


    function sendetForm(data) {
        setMessage(data);
    }
    if(formState && message){
        setModalState(true)
        setFormState(false)
    }

    if (!quest) {
        return <div className='data-err'>Loading...</div>
    }
    return (

        <div className='quest-container' style={{ backgroundImage: `url(${quest.coverImg})` }}>
            <div className='quest--info'>
                <p className='quest--info-head'>{quest.type}</p>
                <h2 className='quest--info-title'>{quest.title}</h2>
                <div className='quest--info-details'>
                    <div className='details-component'><img className='details-icon' src={clockIcon} alt="clock" /><p>{quest.duration} min</p></div>
                    <div className='details-component'><img className='details-icon' src={personIcon} alt="person" /><p>{quest.peopleCount[0]}-{quest.peopleCount[1]} pers</p></div>
                    <div className='details-component'><img className='details-icon' src={puzzleIcon} alt="puzzle" /><p>{quest.level}</p></div>
                </div>
                <p className='quest--info-text'>{quest.description}</p>
                <button className='quest--info-btn' onClick={() => setFormState(true)}>BOOK NOW</button>
            </div>
            <div className={formState ? 'form-wrap' : 'hidden'}>
                <div className="form-container">
                    <button className='form-close' onClick={() => setFormState(false)}>
                        <img src={closeVector} alt="close-button" />
                    </button>
                    <h3>Match squad</h3>
                    <Form onSend={sendetForm} guestsCount={quest.peopleCount} questTitle={quest.title}/>
                </div>
            </div>
            <div className={modalState ? 'modal-window' : 'hidden'}>
                <div className="modal-wrap">
                    <p className="modal-title">Thank you! We've received your request and will contact you as soon as possible.</p>
                    <p className="modal-descript">Your next challenge awaits.</p>
                    <button className="modal-button" onClick={()=> setModalState(false)}>Continue</button> 
                </div>
            </div>
        </div>
    )
}

export default Quest