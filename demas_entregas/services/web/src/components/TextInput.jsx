import React from "react";

import PropTypes from "prop-types";

const TextInput = ({
                     name,
                     label,
                     onChange,
                     value,
                     type = "text",
                     ...props
                   }) => (
    <label className="row">
      {label}
      <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          {...props}
      />
    </label>
);
TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default TextInput;