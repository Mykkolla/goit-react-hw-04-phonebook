import React from 'react';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { Layout } from './Style/Layout';
import { useState, useEffect } from 'react';

export default function PhoneBook() {
  const initialContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? initialContacts
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const existingNames = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingNames) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const deleteContact = idContact => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== idContact)
    );
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const getVisibleContacts = () =>
    contacts.filter(contact =>
      String(contact.name).toLowerCase().includes(filter.toLowerCase())
    );

  const filteredContacts = getVisibleContacts();
  return (
    <Layout>
      <h1>PhoneBook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contact List</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      {contacts.length > 0 ? (
        <ContactList contacts={filteredContacts} onDelete={deleteContact} />
      ) : (
        <p>No contacts yet</p>
      )}
    </Layout>
  );
}
