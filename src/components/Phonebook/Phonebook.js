import { useSelector } from 'react-redux';
import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import { contactsSelectors } from 'redux/contacts';
import Modal from '../Modal';
import s from './Phonebook.module.css';

export default function Phonebook() {
  const isModalOpen = useSelector(contactsSelectors.isModalOpened);
  return (
    <>
      <h2 className={s.title}>Phonebook</h2>
      <ContactForm />
      <Filter />
      <ContactList />

      {isModalOpen && (
        <Modal>
          <ContactForm />
        </Modal>
      )}
    </>
  );
}
