import { Formik, } from 'formik'
import { useState } from 'react'
import './form.css'
import closeVector from './img/close.svg'


function Form({ guestsCount, questTitle }) {
    const [formData, setFormData] = useState({
        'quest': '',
        'name': '',
        'phone': '',
        'guests': '',
    })

    async function sendForm(obj){
        try{
            const response = await fetch('http://localhost:8080/reserve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
        const data = await response.json();
        
        } catch (error) {
            console.log('Error:', error)
            errorMessageCreate()
        }
    }

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Required';
        }
        if (!values.phone) {
            errors.phone = 'Required';
        } else if (!/^[0-9]/i.test(values.phone)) {
            errors.phone = 'Invalid phone number';
        } else if (values.phone.length > 12) {
            errors.phone = 'No more 12 sumbols';
        }
        if (!/^[0-9]/i.test(values.guests)) {
            errors.guests = 'Enter the nimber'
        } else if (+values.guests < guestsCount[0] || +values.guests > guestsCount[1]) {
            errors.guests = `Number of guests from ${guestsCount[0]} to ${guestsCount[1]}`
        } if (values.cookies === false) {
            errors.cookies = 'Agree to condition'
        }
        return errors;
    };

    return (
        <div className="form-container">
            <button className='form-close' onClick={() => setformState(false)}>
                <img src={closeVector} alt="close-button" />
            </button>
            <h3>Match squad</h3>
            <Formik
                initialValues={{ name: '', phone: '', guests: '', cookies: false, }}
                validate={validate}
                onSubmit={(values) => {
                    const data = { ...formData, ...values, 'quest': `${questTitle}`, }
                    setFormData(data)
                    sendForm(data)
                }}
            >
                {({ handleSubmit, values, errors, handleChange, handleBlur, touched, isSubmitting, }) => (
                    <form onSubmit={handleSubmit}>
                        <input className="form--input" type="name" placeholder='Name' name='name' onChange={handleChange} onBlur={handleBlur} value={values.name} />
                        <p>{errors.name && touched.name && errors.name}</p>

                        <input className="form--input" type="phone" placeholder='Phone numde' name='phone' onChange={handleChange} onBlur={handleBlur} value={values.phone} />
                        <p>{errors.phone && touched.phone && errors.phone}</p>

                        <input type="text" className="form--input" placeholder='Number of guests' name='guests' onChange={handleChange} onBlur={handleBlur} value={values.guests} />
                        <p>{errors.guests && touched.guests && errors.guests}</p>

                        <div className="form--cookies-wrap">
                            <input type="checkbox" id="cookies" name="cookies" onChange={handleChange} onBlur={handleBlur} value={values.cookies} />
                            <label htmlFor="cookies">I agree to the personal data processing rules and the user agreement.</label>
                        </div>
                        <p>{errors.cookies && touched.cookies && errors.cookies}</p>
                        <button className='form-submit' type="submit" disabled={isSubmitting}>Submit</button>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Form