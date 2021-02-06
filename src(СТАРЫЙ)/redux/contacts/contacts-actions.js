import { createAction } from '@reduxjs/toolkit';

export const fetchContactsRequest = createAction(
  'contacts/fetchContactsRequest',
);
export const fetchContactsSuccess = createAction(
  'contacts/fetchContactsSuccess',
);
export const fetchContactsError = createAction('contacts/fetchContactsError');

export const addContactRequest = createAction('contacts/addContactRequest');
export const addContactSuccess = createAction('contacts/addContactSuccess');
export const addContactError = createAction('contact/addContactsError');

export const deleteContactRequest = createAction(
  'contacts/deleteContactRequest',
);
export const deleteContactSuccess = createAction(
  'contacts/deleteContactSuccess',
);
export const deleteContactError = createAction('contact/deleteContactsError');

// const addContact = createAction('app/addContact', (name, number) =>
// 	({ payload: { name, number } }
// 	));

export const changeFilter = createAction('app/changeFilter');

// const exportModule = {
//   addContactRequest,
//   addContactSuccess,
//   addContactError,
//   changeFilter,
//   fetchContactsRequest,
//   fetchContactsSuccess,
//   fetchContactsError,
// };
// export default exportModule;
