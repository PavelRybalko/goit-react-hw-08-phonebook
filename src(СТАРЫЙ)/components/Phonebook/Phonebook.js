import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';

export default function Phonebook() {
  return (
    <>
      <ContactForm />
      <Filter />
      <ContactList />
    </>
  );
}
