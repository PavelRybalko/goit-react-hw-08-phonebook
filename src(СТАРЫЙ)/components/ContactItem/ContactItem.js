import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { contactsOperations, contactsSelectors } from 'redux/contacts';
import s from './ContactItem.module.css';
import Modal from '../Modal';
import ContactEditor from '../ContactEditor';

const ContactItem = ({ contact: { id, name, number } }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const toggleModal = () => setIsModalOpen(state => !state);
  const isModalOpen = useSelector(contactsSelectors.isModalOpen());
  const dispatch = useDispatch();

  return (
    <>
      <li className={s.ContactList__item}>
        <p className={s.ContactList__text}>
          <span>{name}</span> : <span>{number}</span>
        </p>
        <button
          type="button"
          onClick={() => dispatch(contactsOperations.deleteContact(id))}
        >
          Delete
        </button>
        <button
          type="button"
          onClick={
            toggleModal
            // () => dispatch(contactsOperations.updateContact({ id, name, number }))
          }
        >
          Edit
        </button>
        {isModalOpen && (
          <Modal onClose={toggleModal}>
            <ContactEditor
              onSave={toggleModal}
              id={id}
              previousName={name}
              previousNumber={number}
            />
          </Modal>
        )}
      </li>
    </>
  );
};

export default ContactItem;

ContactItem.propTypes = {
  contacts: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    number: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};
