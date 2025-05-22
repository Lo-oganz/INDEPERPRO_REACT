import React from 'react';
//Este componente es el que guarda los input
interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export default InputField;