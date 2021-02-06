import { createSlice } from '@reduxjs/toolkit';
import contactsOperations from './contacts-operations';
import { changeFilter, toggleModal, editedContact } from './contacts-actions';

const initialState = {
  isModalOpen: false,
  editedContact: { id: null, name: null, number: null },
  isLoading: false,
  entities: [],
  filter: '',
  error: null,
};

const setError = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    [editedContact](state, { payload }) {
      state.editedContact = payload;
    },
    [toggleModal](state, _) {
      state.isModalOpen = !state.isModalOpen;
    },
    [changeFilter](state, { payload }) {
      state.filter = payload;
    },
    [contactsOperations.fetchContacts.fulfilled](state, { payload }) {
      state.entities = payload;
      state.isLoading = false;
    },
    [contactsOperations.addContact.fulfilled](state, { payload }) {
      state.entities = [...state.entities, payload];
      state.isLoading = false;
    },
    [contactsOperations.updateContact.fulfilled](state, { payload }) {
      state.isModalOpen = false;
      state.entities = state.entities.map(el =>
        el.id === payload.id ? payload : el,
      );
      state.isLoading = false;
    },
    [contactsOperations.deleteContact.fulfilled](state, action) {
      state.entities = state.entities.filter(
        ({ id }) => id !== action.meta.arg,
      );
      state.isLoading = false;
    },
    [contactsOperations.fetchContacts.pending](state) {
      state.isLoading = true;
    },
    [contactsOperations.addContact.pending](state) {
      state.isLoading = true;
    },
    [contactsOperations.updateContact.pending](state) {
      state.isLoading = true;
    },
    [contactsOperations.deleteContact.pending](state) {
      state.isLoading = true;
    },
    [contactsOperations.fetchContacts.rejected](_, { payload }) {
      setError(_, { payload });
    },
    [contactsOperations.addContact.rejected](state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
    [contactsOperations.updateContact.rejected](state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
    [contactsOperations.deleteContact.rejected](state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export default contactsSlice.reducer;
