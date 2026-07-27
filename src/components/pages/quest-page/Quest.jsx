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
    const [formState, setformState] = useState(false) 
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
        if(!/^[0-9]/i.test(values.count)){
            errors.count = 'Enter the nimber'
        } else if(+values.count < quest.peopleCount[0] || +values.count > quest.peopleCount[1]){
            errors.count = `Number of guests from ${quest.peopleCount[0]} to ${quest.peopleCount[1]}`
        } if (values.coockies === false) {
            errors.coockies = 'Agree to condition'
        }

        return errors;
      };

    const quest = quests.find(item => item.id === +id)

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
                initialValues={{name: '', phone: '', count: '', cookies: '', }}
                validate={validate}
                  onSubmit={(values) => {
                    console.log('Submit:', values)
                  }}
            >
                {({ handleSubmit, values, errors, handleChange, handleBlur, touched, isSubmitting,})=> (
                    <form onSubmit={handleSubmit}>
                        <input className="form--input" type="name" placeholder='Name' name='name' onChange={handleChange} onBlur={handleBlur} value={values.name} />
                        <p>{errors.name && touched.name && errors.name}</p>

                        <input className="form--input" type="phone" placeholder='Phone numde' name='phone' onChange={handleChange} onBlur={handleBlur} value={values.phone} />
                        <p>{errors.phone && touched.phone && errors.phone}</p>

                        <input type="text" className="form--input"  placeholder='Number of guests' name='count' onChange={handleChange} onBlur={handleBlur} value={values.count}/>
                        <p>{errors.count && touched.count && errors.count}</p>

                        <div className="form--cookies-wrap">
                            <input type="checkbox" id="cookies" name="cookies" onChange={handleChange} onBlur={handleBlur} value={values.cookies}/>
                            <label htmlFor="cookies">I agree to the personal data processing rules and the user agreement.</label>
                        </div>
                        <p>{errors.coockies && touched.coockies && errors.coockies}</p>
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