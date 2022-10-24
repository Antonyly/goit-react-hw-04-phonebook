import {useState} from "react";
import { nanoid } from 'nanoid'
import PropTypes from "prop-types"
import css from './ContactForm.module.css'

export const ContactForm = ({addContact}) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target
        
        if (name === 'name') {
            setName(value);
        };
        if (name === 'number') {
            setNumber(value);
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const contactObj = {
            name,
            number,
            id: nanoid(),
        };
        
        addContact(contactObj);

        resetState();
    };
    const resetState = () => {
        setName('');
        setNumber('');
    };
    
    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <label>Name
                <input
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    value={name}
                    onChange={handleChange}
                />
            </label>
            <label>Number
                <input
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    value={number}
                    onChange={handleChange}
                />
            </label>
            <button className={css.btn} type='submit'>Add contact</button>
        </form>
    )
};


// import React, { Component } from "react";
// import { nanoid } from 'nanoid'
// import PropTypes from "prop-types"
// import css from './ContactForm.module.css'

// export class ContactForm extends Component {

//     state = {
//         name: '',
//         number: ''
//     }
    
//     handleChange = (e) => {
//         const { name, value } = e.target
        
//         this.setState({
//             [name]: value
//         })
//     }

//     handleSubmit = (e) => {
//         e.preventDefault()
//         const {name, number} = this.state

//         const contactObj = {
//             name: name,
//             number: number,
//             id: nanoid()
//         }
        
//         this.props.addContact(contactObj) 

//         this.resetState()
//     }
    
//     resetState = () => {
//         this.setState({
//             name: '',
//             number: ''
//         })
//     }

//     render() {
//         const { handleSubmit, handleChange } = this
//         const {name, number} = this.state


//         return (
//             <form className={css.form}  onSubmit={handleSubmit}>
//                 <label>Name
//                 <input
//                     type="text"
//                     name="name"
//                     pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//                     title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//                     required
//                     value={name}
//                     onChange={handleChange}
//                 />
//                 </label>
//                 <label>Number
//                 <input
//                     type="tel"
//                     name="number"
//                     pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//                     title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//                     required
//                     value={number}
//                     onChange={handleChange}
//                 />
//                 </label>
//                 <button className={css.btn} type='submit'>Add contact</button>
//             </form>
//         )
//     }   
    
// }

ContactForm.propTypes = {
    addContact: PropTypes.func.isRequired
}