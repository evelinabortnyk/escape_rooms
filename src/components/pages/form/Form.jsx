import {Formik,} from 'formik'
import closeVector from './img/close.svg'
import './form.css'

function Form ({guestsCount}) {
    console.log(guestsCount)

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
        } else if(values.count < guestsCount[0] || values.count > guestsCount[1]){
            errors.count = `Number of guests from ${guestsCount[0]} to ${guestsCount[1]}`
        }

        return errors;
      };

    return (
        <div className="form-container">
            <button className='form-close'>
                <img src={closeVector} alt="" srcset="" />
            </button>
            <h3>Match squad</h3>
            <Formik
                initialValues={{name: '', phone: '', count: '' }}
                validate={validate}
                  onSubmit={(values) => {
                    console.log('Submit:', values)
                  }}
            >
                {({
                    handleSubmit,
                    values,
                    errors,
                    handleChange,
                    handleBlur,
                    touched,
                    isSubmitting,
                })=> (
                    <form>
                        {/* <label htmlFor="name">Name: </label> */}
                        <input className="form--input" type="name" placeholder='Name' name='name' onChange={handleChange} onBlur={handleBlur} value={values.name} />
                        <p>{errors.name && touched.name && errors.name}</p>

                        {/* <label htmlFor="phone">Phone: </label> */}
                        <input className="form--input" type="phone" placeholder='Phone numde' name='phone' onChange={handleChange} onBlur={handleBlur} value={values.phone} />
                        <p>{errors.phone && touched.phone && errors.phone}</p>

                        {/* <label htmlFor="count">Email: </label> */}
                        <input className="form--input" type="count" placeholder='count' name='Count' onChange={handleChange} onBlur={handleBlur} value={values.count} />
                        <p>{errors.count && touched.count && errors.count}</p>

                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Form