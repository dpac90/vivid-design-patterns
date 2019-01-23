import React from 'react';

export default ({ children, ...attributes }) => <option {...attributes}>{children}</option>;
