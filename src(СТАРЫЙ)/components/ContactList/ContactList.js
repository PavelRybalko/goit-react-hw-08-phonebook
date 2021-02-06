import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './ContactList.module.css';
import ContactItem from '../ContactItem';
// import { Loader } from '../Loader';
import { contactsOperations, contactsSelectors } from 'redux/contacts';

const ContactList = () => {
  const dispatch = useDispatch();
  // const isContactsLoading = useSelector(contactsSelectors.getLoading);
  const contacts = useSelector(contactsSelectors.getVisibleContacts);

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  return (
    <>
      <h2 className={s.title}>Contacts</h2>
      {/* {isContactsLoading && <Loader />} */}
      {contacts.length > 0 && (
        <ul className={s.ContactList}>
          {contacts.map(contact => (
            <ContactItem key={contact.id} contact={contact} />
          ))}
        </ul>
      )}
    </>
  );
};

export default ContactList;
