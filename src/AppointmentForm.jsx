import React, { useState } from 'react';

export const AppointmentForm = ({
  selectTableServices,
  service,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({});
  const handleOnChange = ({ target: { name, value } }) => {
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };
  return (
    <form id="appointment" onSubmit={() => onSubmit(formData)}>
      <label htmlFor="service">Service</label>
      <select
        name="service"
        value={service}
        id="service"
        onChange={handleOnChange}>
        <option />
        {selectTableServices.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </form>
  );
};

AppointmentForm.defaultProps = {
  selectTableServices: [
    'Cut',
    'Blow-dry',
    'Cut & color',
    'Beard trim',
    'Cut & beard trim',
    'Extensions',
  ],
};
