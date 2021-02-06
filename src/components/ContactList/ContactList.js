import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './ContactList.module.css';
import ContactItem from '../ContactItem';
import { Loader } from '../Loader';
import { contactsOperations, contactsSelectors } from 'redux/contacts';
import { Grid } from '@material-ui/core';

const ContactList = () => {
  const dispatch = useDispatch();
  const isContactsLoading = useSelector(contactsSelectors.getLoading);
  const contacts = useSelector(contactsSelectors.getVisibleContacts);

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  return (
    <>
      <h2 className={s.title}>Contacts</h2>
      {isContactsLoading && <Loader />}
      {contacts.length > 0 && (
        <ul className={s.ContactList}>
          <Grid container spacing={3}>
            {contacts.map(contact => (
              <Grid item xs={3} key={contact.id}>
                <ContactItem contact={contact} />
              </Grid>
            ))}
          </Grid>
        </ul>
      )}
    </>
  );
};

export default ContactList;
