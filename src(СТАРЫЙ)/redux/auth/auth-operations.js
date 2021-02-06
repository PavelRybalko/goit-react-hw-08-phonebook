import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import phonebookAPI from 'services/phonebookAPI';

axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';

const token = {
  //обьект с двумя методами
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    //на все("common" или "post") запросы добавить заголовок Авторизации
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) return thunkAPI.rejectWithValue();

    token.set(persistedToken);
    try {
      const user = await phonebookAPI.getCurrentUser();
      return user;
    } catch (error) {
      return error.message;
    }
  },
);

const register = createAsyncThunk('auth/register', async user => {
  try {
    const { data } = await axios.post('/users/signup', user);
    token.set(data.token);
    return data;
  } catch (error) {
    return error.message;
  }
});

const logIn = createAsyncThunk('auth/login', async user => {
  try {
    const { data } = await axios.post('/users/login', user);
    token.set(data.token);
    return data;
  } catch (error) {
    return error.message;
  }
});

const logOut = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.post('/users/logout');
    token.unset();
  } catch (error) {
    return error.message;
  }
});

export default { register, logIn, logOut, fetchCurrentUser };
