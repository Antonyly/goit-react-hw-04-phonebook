import React from "react";
import css from './ContactList.module.css'
import PropTypes from "prop-types"

export const ContactList = ({contacts, handleClick}) => {
    return (
        <ul className={css.contsctList}>
            {contacts.map(({name, number, id}) => {
                return <li key={id}>{name}: {number} <button className={css.listBtn} type="button" onClick={() => handleClick(id)}>Delete</button></li>
            })}
        </ul>
    )
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired
    })),
    handleClick: PropTypes.func.isRequired
}