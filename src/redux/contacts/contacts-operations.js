import { createAsyncThunk } from '@reduxjs/toolkit';
import phonebookAPI from 'services/phonebookAPI';

// const toggleModal = createAsyncThunk(
//   'contacts/toggleModal',
//   state => !state.contacts,
// );

const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const contacts = await phonebookAPI.fetchContacts();
      return contacts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, { rejectWithValue }) => {
    try {
      const data = await phonebookAPI.addContact({ name, number });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async (contact, { rejectWithValue }) => {
    try {
      const { data } = await phonebookAPI.updateContact(contact);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      await phonebookAPI.deleteContact(id);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const exportModule = {
  addContact,
  updateContact,
  deleteContact,
  fetchContacts,
};

export default exportModule;
