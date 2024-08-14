import React from "react";

const FormInput = ({
  label,
  name,
  type,
  register,
  errors,
  suffixIcon,
  prefixIcon,
  ...rest
}) => {
  const prefix = prefixIcon ? prefixIcon : null;
  const suffix = suffixIcon ? suffixIcon : null;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {prefix}
      <input
        type={type}
        id={name}
        name={name}
        className={`form-input ${errors[name] ? "input-error" : ""}`}
        {...register(name)}
        {...rest}
        required
      />
      {suffix}
      {errors[name] && <p className="error-message">{errors[name].message}</p>}
    </div>
  );
};

export default FormInput;
