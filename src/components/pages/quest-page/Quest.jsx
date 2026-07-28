import { useParams } from "react-router-dom";
import { useState } from "react";
import {Formik,} from 'formik'

import './quest.css'
import './form.css'

import quests from '../../../assets/quests';
import clockIcon from './img/clock.svg'
import personIcon from '../home-page/img/person.svg'
import puzzleIcon from '../home-page/img/puzzle.svg'
import closeVector from './img/close.svg'

// import Form from "../form/Form";


function Quest() {
    const { id } = useParams();
    const quest = quests.find(item => item.id === +id)

    const [formState, setformState] = useState(false) 
    const [formData, setFormData] = useState({
        'quest': `${quest.title}`,
        'name': '',
        'phone': '',
        'guests': '',
    })
    const validate = (values) => {
        const errors = {};
        if (!values.name) {
          errors.name =  'Required';
        }
        if (!values.phone) {
            errors.phone = 'Required';
        } else if( !/^[0-9]/i.test(values.phone)){
            errors.phone = 'Invalid phone number';
        } else if(values.phone.length >12){
            errors.phone = 'No more 12 sumbols';
        }
        if(!/^[0-9]/i.test(values.guests)){
            errors.guests = 'Enter the nimber'
        } else if(+values.guests < quest.peopleCount[0] || +values.guests > quest.peopleCount[1]){
            errors.guests = `Number of guests from ${quest.peopleCount[0]} to ${quest.peopleCount[1]}`
        } if (values.cookies === false) {
            errors.cookies = 'Agree to condition'
        }
        return errors;
      };

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
                <button className='quest--info-btn' onClick={() => setformState(true)}>BOOK NOW</button>
            </div>
            <div className={formState ? 'form-wrap' : 'hidden'}>
                <div className="form-container">
            <button className='form-close' onClick={()=>setformState(false)}>
                <img src={closeVector} alt="close-button" />
            </button>
            <h3>Match squad</h3>
            <Formik
                initialValues={{name: '', phone: '', guests: '', cookies: false, }}
                validate={validate}
                  onSubmit={(values) => {
                    setFormData({...formData, ...values} )
                  }}
            >   
                {({ handleSubmit, values, errors, handleChange, handleBlur, touched, isSubmitting,})=> (
                    <form onSubmit={handleSubmit}>
                        <input className="form--input" type="name" placeholder='Name' name='name' onChange={handleChange} onBlur={handleBlur} value={values.name} />
                        <p>{errors.name && touched.name && errors.name}</p>

                        <input className="form--input" type="phone" placeholder='Phone numde' name='phone' onChange={handleChange} onBlur={handleBlur} value={values.phone} />
                        <p>{errors.phone && touched.phone && errors.phone}</p>

                        <input type="text" className="form--input"  placeholder='Number of guests' name='guests' onChange={handleChange} onBlur={handleBlur} value={values.guests}/>
                        <p>{errors.guests && touched.guests && errors.guests}</p>

                        <div className="form--cookies-wrap">
                            <input type="checkbox" id="cookies" name="cookies" onChange={handleChange} onBlur={handleBlur} value={values.cookies}/>
                            <label htmlFor="cookies">I agree to the personal data processing rules and the user agreement.</label>
                        </div>
                        <p>{errors.cookies && touched.cookies && errors.cookies}</p>
                        <button className='form-submit' type="submit" disabled={isSubmitting}>Submit</button>    
                    </form>
                )}
            </Formik>
        </div>
            </div>
        </div>
    )
}

export default Quest