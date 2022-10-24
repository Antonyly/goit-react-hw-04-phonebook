import React, { Component } from "react";
import { ContactForm } from './ContactForm/ContactForm'
import { ContactList } from './ContactList/ContactList'
import { Filter } from './Filter/Filter'
import css from './ContactForm/ContactForm.module.css'
  const CONTACTS_KEY = 'Contact'

export class App extends Component {

  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },],
    filter: ''
  }

    componentDidMount() {
    const savedContacts = localStorage.getItem(CONTACTS_KEY)

    if (savedContacts?.length > 0) {
      this.setState({
      contacts: JSON.parse(savedContacts)
    })
    }
  }
  
  componentDidUpdate(prevState) {
    const { contacts } = this.state
    
    if (prevState.contacts !== contacts) {
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts))
    }
  }

  isDuplicate = ({ name }) => {
    const { contacts } = this.state
    const result = contacts.find(contactItem => contactItem.name.toLowerCase() === name.toLowerCase())
    return result
  }

  addContact = (contactObject) => {
    if (this.isDuplicate(contactObject)) {
      return alert(`${contactObject.name} is alredy in contacts`)
    }

    return this.setState(prevState => ({
      contacts: [...prevState.contacts, contactObject],
    }))
  }

  handlerFilterChange = (e) => {
    this.setState({
      filter: e.currentTarget.value
    }) 
  }

  deleteContact = (id) => {
    const { contacts } = this.state
    const newContacts = contacts.filter(contact => contact.id !== id)
    return this.setState({
      contacts: newContacts
    })    
  }
 

  render() {
    const { contacts, filter } = this.state
    const {addContact, handlerFilterChange, deleteContact} = this

    const filtredContacts = contacts.filter(({name}) => name.toLowerCase().includes(filter.toLowerCase()))
    
    return (
      <div className={ css.div}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
  
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handlerFilterChange} />
      <ContactList contacts={filtredContacts} handleClick={deleteContact} />      
    </div>
  );
  }
};