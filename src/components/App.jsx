import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { Layout } from './Style/Layout';

export class PhoneBook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('add');
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  componentDidMount() {
    const contactsMount = JSON.parse(localStorage.getItem('contacts'));
    if (contactsMount) {
      this.setState({ contacts: contactsMount });
    }
  }

  addContact = ({ name, number }) => {
    const existingNames = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    // if (existingNames.includes(newContact.name)) {
    //   alert(`${newContact.name} is already in contacts.`);
    //   return;
    // }
    if (existingNames) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = idContact => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== idContact),
    }));
  };

  handleFilterChange = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  getVisibleContacts = () =>
    this.state.contacts.filter(contact =>
      String(contact.name)
        .toLowerCase()
        .includes(this.state.filter.toLowerCase())
    );

  render() {
    const filteredContacts = this.getVisibleContacts();

    return (
      <Layout>
        <h1>PhoneBook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contact List</h2>
        <Filter value={this.state.filter} onChange={this.handleFilterChange} />
        {this.state.contacts.length > 0 ? (
          <ContactList
            contacts={filteredContacts}
            onDelete={this.deleteContact}
          />
        ) : (
          <p>No contacts yet</p>
        )}
      </Layout>
    );
  }
}
