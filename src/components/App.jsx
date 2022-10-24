import {useState, useEffect} from "react";
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './ContactForm/ContactForm.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const CONTACTS_KEY = 'Contact';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const localStorageContacts = localStorage.getItem(CONTACTS_KEY);
    return JSON.parse(localStorageContacts) || [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    return localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts))
  }, [contacts])

  const isDuplicate = ({ name }) => {

    const result = contacts.find(contactItem => contactItem.name.toLowerCase() === name.toLowerCase());
    return result
  };
  const addContact = (contactObject) => {
    if (isDuplicate(contactObject)) {
      return alert(`${contactObject.name} is alredy in contacts`);
      // Notify.failure(`${contactObject.name} is alredy in contacts`);
    } else {
      Notify.success('New contact added');
    }

    return setContacts((p) => [...p, contactObject]);
  };

  const handlerFilterChange = (e) => {
    setFilter(e.currentTarget.value)
  };

  const deleteContact = (id) => {

    const newContacts = contacts.filter(contact => contact.id !== id);
    setContacts(newContacts);
  };
  const filtredContacts = contacts.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()));
    
    return (
      <div className={ css.div}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
  
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handlerFilterChange} />
      <ContactList contacts={filtredContacts} handleClick={deleteContact} />      
    </div>
  );
};
