import React from 'react';

export const CustomerForm = ({ firstName }) => {
  return (
    <form id="customer">
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        value={firstName}
        readOnly
      />
    </form>
  );
};
