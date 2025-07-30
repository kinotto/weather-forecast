import React from 'react';

interface IInputReactDatePicker {
  value: string, 
  placeholder: string,
  onClick?: () => void
}

const InputReactDatePicker: React.FC<IInputReactDatePicker> = ({ onClick, value, placeholder }) => {
  return (
    <input
      onClick={onClick}
      value={value}
      placeholder={value || placeholder}
      readOnly
      style={{
        padding: '0.5rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer',
        width: 150,
        fontFamily: "Roboto",
        fontSize: ".9rem"
      }}
    />
  )
}

export default InputReactDatePicker