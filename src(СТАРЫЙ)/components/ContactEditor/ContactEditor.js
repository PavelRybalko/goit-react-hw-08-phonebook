import { useState } from 'react';
import { useDispatch } from 'react-redux';
import contactsOperations from 'redux/contacts/contacts-operations';
import s from './ContactEditor.module.css';

export default function ContactEditor({ id, previousName, previousNumber }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        console.warn(`Тип поля name - ${name} не обрабатывается!`);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (name !== '' && number !== '') {
      dispatch(contactsOperations.updateContact({ id, name, number }));
      setName('');
      setNumber('');
      return;
    }

    alert('Заполни текст заметки.');
  };

  return (
    <form className={s.editor} onSubmit={handleSubmit}>
      <label>
        Name
        <input
          placeholder={previousName}
          autoComplete="off"
          className={s.input}
          name="name"
          type="text"
          value={name}
          onChange={handleChange}
        />
      </label>
      <label>
        Number
        <input
          placeholder={previousNumber}
          autoComplete="off"
          className={s.input}
          name="number"
          type="tel"
          value={number}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className={s.button}>
        Сохранить
      </button>
    </form>
  );
}

// export default connect(null, mapDispatchToProps)(TodoEditor);
