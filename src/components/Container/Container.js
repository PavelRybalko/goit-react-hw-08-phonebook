import React from 'react';
import PropTypes from 'prop-types';
import s from './Container.module.css';

const Container = ({ children }) => (
  <div className={s.Container}>{children}</div>
);

export default Container;

Container.propTypes = {
  children: PropTypes.node,
};
