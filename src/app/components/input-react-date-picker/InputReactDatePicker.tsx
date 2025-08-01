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
      onKeyDown={evt => {
        if(evt.key === "Enter" || evt.key === "") {
          evt.preventDefault();
          onClick?.();
        }
      }}
      value={value}
      placeholder={value || placeholder}
      readOnly
      aria-label="pick a date"
      tabIndex={0}
      style={{
        padding: '0.5rem',
        height: '1.9rem',
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