import { createReducer, combineReducers } from '@reduxjs/toolkit';
import contactsOperations from './contacts-operations';
import { changeFilter, toggleModal } from './contacts-actions';

const isModalOpen = createReducer(false, {
  [toggleModal]: (state, _) => (state ? false : true),
});

const filter = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});

const entities = createReducer([], {
  [contactsOperations.fetchContacts.fulfilled]: (_, { payload }) => payload,
  [contactsOperations.addContact.fulfilled]: (state, { payload }) => [
    ...state,
    payload,
  ],
  [contactsOperations.updateContact.fulfilled]: (state, { payload }) => {
    state.isModalOpen = false;
    return state.map(el => (el.id === payload.data.id ? payload.data : el));
  },
  [contactsOperations.deleteContact.fulfilled]: (state, action) => {
    return state.filter(({ id }) => id !== action.meta.arg);
  },
});

const isLoading = createReducer(false, {
  [contactsOperations.fetchContacts.pending]: () => true,
  [contactsOperations.fetchContacts.fulfilled]: () => false,
  [contactsOperations.fetchContacts.rejected]: () => false,
  [contactsOperations.addContact.pending]: () => true,
  [contactsOperations.addContact.fulfilled]: () => false,
  [contactsOperations.addContact.rejected]: () => false,
  [contactsOperations.deleteContact.pending]: () => true,
  [contactsOperations.deleteContact.fulfilled]: () => false,
  [contactsOperations.updateContact.rejected]: () => false,
  [contactsOperations.updateContact.pending]: () => true,
  [contactsOperations.updateContact.fulfilled]: () => false,
  [contactsOperations.updateContact.rejected]: () => false,
});

const error = createReducer(null, {
  [contactsOperations.fetchContacts.rejected]: (_, action) => action.payload,
  [contactsOperations.addContact.rejected]: (_, action) => action.payload,
  [contactsOperations.deleteContact.rejected]: (_, action) => action.payload,
  [contactsOperations.updateContact.rejected]: (_, action) => action.payload,
  [contactsOperations.fetchContacts.pending]: () => null,
  [contactsOperations.addContact.pending]: () => null,
  [contactsOperations.deleteContact.pending]: () => null,
  [contactsOperations.updateContact.pending]: () => null,
});

export default combineReducers({
  filter,
  entities,
  isLoading,
  error,
  isModalOpen,
});
