import { createAction } from '@reduxjs/toolkit';

export const toggleModal = createAction('contacts/toggleModal');
export const changeFilter = createAction('contacts/changeFilter');
export const editedContact = createAction('contacts/editedContact');
