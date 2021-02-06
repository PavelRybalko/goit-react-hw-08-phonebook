import { createReducer, combineReducers } from '@reduxjs/toolkit';
import contactsOperations from './contacts-operations';
import { changeFilter } from './contacts-actions';

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
  [contactsOperations.deleteContact.rejected]: () => false,
});

const error = createReducer(null, {
  // [fetchContacts.rejected]: (_, action) => action.payload,
  // [fetchContacts.pending]: () => null,
});

const isModalOpen = createReducer(false, {
  
  // [fetchContacts.rejected]: (_, action) => action.payload,
  // [fetchContacts.pending]: () => null,
});

export default combineReducers({
  filter,
  entities,
  isLoading,
  error,
  isModalOpen,
});
