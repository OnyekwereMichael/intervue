import { Field, ErrorMessage } from 'formik';
import { Input } from '@/components/ui/input';
import React from 'react';

type TextInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  type?: string;
  icon?: React.ReactNode;
  onIconClick?: () => void;
};

const TextInput = ({
  name,
  label,
  placeholder,
  description,
  type = 'text',
  icon,
  onIconClick,
}: TextInputProps) => {
  return (
    <div className="relative">
      <label htmlFor={name} className="label">
        {label}
      </label>

      {/* input wrapper to position icon */}
      <div className="relative">
        <Field
          as={Input}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className="input mt-[0.1rem] pr-10" // add padding to avoid icon overlap
        />

        {icon && (
          <div
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
            onClick={onIconClick}
          >
            {icon}
          </div>
        )}
      </div>

      {description && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}

      <ErrorMessage
        name={name}
        component="p"
        className="text-sm text-red-500"
      />
    </div>
  );
};

export default TextInput;
