import React from 'react';

const RadioOption = ({ isChecked, children, ...attributes }) => <input type="radio" checked={isChecked} {...attributes} />;

export default RadioOption;
