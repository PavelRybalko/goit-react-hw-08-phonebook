import axios from 'axios';

axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';

const getCurrentUser = () => {
  return axios.get('/users/current').then(response => response.data);
};

const signupUser = user => {
  return axios.post('/users/signup', user).then(response => response.data);
};

const loginUser = user => {
  return axios.post('/users/login', user).then(response => response.data);
};

const logoutUser = user => {
  return axios.post('/users/logout', user).then(response => response.data);
};

const fetchContacts = () => {
  return axios.get('/contacts').then(response => response.data);
};

const addContact = contact => {
  return axios.post('/contacts', contact).then(({ data }) => data);
};

const updateContact = ({ id, name, number }) => {
  return axios.patch(`/contacts/${id}`, { name, number });
};

const deleteContact = contactId => {
  return axios.delete(`/contacts/${contactId}`);
};

const exportModule = {
  getCurrentUser,
  signupUser,
  loginUser,
  logoutUser,
  fetchContacts,
  addContact,
  updateContact,
  deleteContact,
};

export default exportModule;
