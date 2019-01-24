import React from 'react';

export default function SelectOption({ children, ...attributes }) {
    return <option {...attributes}>{children}</option>;
}
