import { EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import type { JSX } from "react/jsx-runtime";

type Variant = "input_modern" | "input_classic";
type Type =
  | "text"
  | "email"
  | "password"
  | "number"
  | "radio"
  | "date"
  | "time"
  | "select"
  | "checkbox"
  | "file"
  | "textarea"
  | "range"
  | "search";

export type InputProps = {
  name: string;
  placeholder: string;
  label: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  disabled?: boolean;
  value?: string | number | undefined;
  onChange?<T>(event: React.ChangeEvent<T>): void;
  onBlur?<T>(event: React.FocusEvent<T>): void;
  onFocus?<T>(event: React.FocusEvent<T>): void;
  onKeyDown?<T>(event: React.KeyboardEvent<T>): void;
  onKeyUp?<T>(event: React.KeyboardEvent<T>): void;
  className?: string;
  options?: {label: string, value: string | number}[];
  variant?: Variant;
  type: Type;
};

const inputs: Record<Type, (inputProps: InputProps) => JSX.Element> = {
  text: ({ ...inputProps }) => <TextInput {...inputProps} />,
  email: ({ ...inputProps }) => <EmailInput {...inputProps} />,
  password: ({ ...inputProps }) => <PasswordInput {...inputProps} />,
  number: ({ ...inputProps }) => <TextInput {...inputProps} />,
  radio: ({ ...inputProps }) => <TextInput {...inputProps} />,
  date: ({ ...inputProps }) => <DateInput {...inputProps} />,
  select: ({ ...inputProps }) => <SelectInput {...inputProps} />,
  checkbox: ({ ...inputProps }) => <TextInput {...inputProps} />,
  file: ({ ...inputProps }) => <TextInput {...inputProps} />,
  textarea: ({ ...inputProps }) => <TextInput {...inputProps} />,
  range: ({ ...inputProps }) => <TextInput {...inputProps} />,
  search: ({ ...inputProps }) => <TextInput {...inputProps} />,
  time: ({ ...inputProps }) => <TimeInput {...inputProps} />,
};

const inputStyles: Record<Variant, string> = {
  input_modern:
    "bg-body_accent_secondary border-1 border-body_border_primary rounded-card_classic p-input text-lg text-body_text_primary placeholder:text-body_text_primary outline-none",
  input_classic:
    "border border-body_border_primary rounded-sm p-1 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400",
};

const TextInput = ({
  variant = "input_modern",
  name,
  placeholder,
  minLength,
  maxLength,
  required,
  disabled,
  value,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  onKeyUp,
  className,
}: InputProps) => {
  return (
    <>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        className={`${className} ${inputStyles[variant]} transition`}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onBlur={onBlur}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
      />
    </>
  );
};

const EmailInput = ({
  variant = "input_modern",
  name,
  placeholder,
  minLength,
  maxLength,
  required,
  disabled,
  value,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  onKeyUp,
  className,
}: InputProps) => {
  return (
    <>
      <input
        type="email"
        name={name}
        placeholder={placeholder}
        className={`${className} ${inputStyles[variant]} transition`}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onBlur={onBlur}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
      />
    </>
  );
};

const PasswordInput = ({
  variant = "input_modern",
  name,
  placeholder,
  minLength,
  maxLength,
  required,
  disabled,
  value,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  onKeyUp,
  className,
}: InputProps) => {
  return (
    <>
      <input
        type="password"
        name={name}
        placeholder={placeholder}
        className={`${className} ${inputStyles[variant]} transition`}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onBlur={onBlur}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
      />
    </>
  );
};

const SelectInput = ({
  variant = "input_modern",
  name,
  placeholder,
  required,
  disabled,
  value,
  onChange,
  onBlur,
  onFocus,
  options,
  className,
}: InputProps) => {
  return (
    <select
      name={name}
      className={`${className} ${inputStyles[variant]} transition !text-body_text_primary font-body_font_primary`}
      value={value}
      onChange={onChange}
      disabled={disabled}
      onFocus={onFocus}
      onBlur={onBlur}
      required={required}
    >
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}

      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const DateInput = ({
  variant = "input_modern",
  name,
  placeholder,
  minLength,
  maxLength,
  required,
  disabled,
  value,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  onKeyUp,
  className,
}: InputProps) => {
  return (
    <>
      <input
        type="date"
        name={name}
        placeholder={placeholder}
        className={`${className} ${inputStyles[variant]} transition`}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onBlur={onBlur}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
      />
    </>
  );
};

const TimeInput = ({
  variant = "input_modern",
  name,
  placeholder,
  minLength,
  maxLength,
  required,
  disabled,
  value,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  onKeyUp,
  className,
}: InputProps) => {
  return (
    <>
      <input
        type="time"
        name={name}
        placeholder={placeholder}
        className={`${className} ${inputStyles[variant]} transition`}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onBlur={onBlur}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
      />
    </>
  );
};

const Label = ({
  label,
  value,
  name,
  variant,
}: {
  label: string;
  value?: string | number | undefined;
  name: string;
  variant: Variant;
}) => {
  if (variant === "input_classic") {
    return (
      <label
        htmlFor={name}
        className="text-sm text-body_text_muted text-body_text_muted"
      >
        {label}
      </label>
    );
  }

  return (
    <label
      htmlFor={name}
      className={`text-xs text-body_text_muted absolute left-0 top-0 p-input py-3 pointer-events-none z-10 ${value ? "opacity-100" : "opacity-0"} transition`}
    >
      {label}
    </label>
  );
};

export default function Input({
  name,
  placeholder,
  label,
  minLength,
  maxLength,
  required = true,
  disabled,
  value,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  onKeyUp,
  options,
  className,
  variant = "input_modern",
  type = "text",

}: InputProps) {


  const [typeOfInput, setTypeOfInput] = useState(type);

  const handleTogglePassword = () => {
    if (typeOfInput === "password") {
      setTypeOfInput("text");
    } else {
      setTypeOfInput("password");
    }
  }

  
  return (
    <div className="flex flex-col gap-2 relative">
      <Label label={label} value={value} name={name} variant={variant} />

      {inputs[typeOfInput]({
        name,
        placeholder,
        label,
        minLength,
        maxLength,
        required,
        disabled,
        value,
        onChange,
        onBlur,
        onFocus,
        onKeyDown,
        onKeyUp,
        options,
        className: `${className} ${ variant === "input_modern"  && value ? "pt-[20px] pb-[12px]" : "p-input"}`,
        variant,
        type,
      })}

      {type === "password" && (
        <EyeIcon
          onClick={handleTogglePassword}
          className="absolute right-0 top-0 m-input mx-6 text-body_text_muted size-6 z-10 cursor-pointer"
        />
      )}
    </div>
  );
}
