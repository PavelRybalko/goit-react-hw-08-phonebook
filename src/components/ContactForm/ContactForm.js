import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  contactsSelectors,
  contactsOperations,
  contactsActions,
} from 'redux/contacts';
import s from './ContactForm.module.css';

function ContactForm() {
  const isModalOpen = useSelector(contactsSelectors.isModalOpened);
  const contacts = useSelector(contactsSelectors.getEntities);
  const { name: editedName, number: editedNumber, id: editedId } = useSelector(
    contactsSelectors.getEditedContact,
  );
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        console.warn(`Тип поля name - ${name} не обрабатывается!`);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const isValidatedForm = validateForm();
    if (!isValidatedForm) return;

    editedName
      ? dispatch(
          contactsOperations.updateContact({ id: editedId, name, number }),
        )
      : dispatch(contactsOperations.addContact({ name, number }));

    setName('');
    setNumber('');
    editedName &&
      dispatch(
        contactsActions.editedContact({
          id: null,
          name: null,
          number: null,
        }),
      );
  };

  const validateForm = () => {
    if (!name || !number) {
      toast.error('Some fields are empty! Please write something', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const isExistContact = !!contacts.find(contact => contact.name === name);
    isExistContact && alert('Contact is already exist!');

    return !isExistContact;
  };

  return (
    <>
      <form className={s.ContactForm} onSubmit={handleSubmit}>
        <label>
          Name
          <input
            placeholder={isModalOpen ? editedName : ''}
            autoComplete="off"
            className={s.input}
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
          />
        </label>
        <label>
          Number
          <input
            placeholder={isModalOpen ? editedNumber : ''}
            autoComplete="off"
            className={s.input}
            name="number"
            type="tel"
            value={number}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className={s.button}>
          Add contact
        </button>
      </form>
    </>
  );
}

export default ContactForm;
