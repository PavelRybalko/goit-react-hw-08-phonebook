// import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { contactsOperations, contactsActions } from 'redux/contacts';
import s from './ContactItem.module.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Button } from '@material-ui/core';
import { ButtonGroup } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const ContactItem = ({ contact: { id, name, number } }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <li className={s.ContactList__item}>
      <Card className={classes.root}>
        <CardContent>
          <Typography noWrap className={s.ContactList__text}>
            <span>{name}</span> : <span>{number}</span>
          </Typography>
          <ButtonGroup>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => dispatch(contactsOperations.deleteContact(id))}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                dispatch(contactsActions.editedContact({ id, name, number }));
                dispatch(contactsActions.toggleModal());
              }}
            >
              Edit
            </Button>
          </ButtonGroup>
        </CardContent>
      </Card>
    </li>
  );
};

export default ContactItem;

ContactItem.propTypes = {
  contacts: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    number: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};
