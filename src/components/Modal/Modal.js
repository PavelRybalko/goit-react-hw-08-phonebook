import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import { useDispatch } from 'react-redux';
import { contactsActions } from 'redux/contacts';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        dispatch(contactsActions.toggleModal());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      dispatch(contactsActions.toggleModal());
    }
  };
  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.content}>{children}</div>
    </div>,
    modalRoot,
  );
}
