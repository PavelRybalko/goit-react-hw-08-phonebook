import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { contactsActions, contactsSelectors } from 'redux/contacts';
import s from './Filter.module.css';

const Filter = () => {
  const filter = useSelector(contactsSelectors.getFilter);
  const dispatch = useDispatch();
  return (
    <label className={s.label}>
      Find contacts by name:
      <input
        className={s.input}
        type="text"
        value={filter}
        onChange={event =>
          dispatch(contactsActions.changeFilter(event.currentTarget.value))
        }
      />
    </label>
  );
};

export default Filter;
