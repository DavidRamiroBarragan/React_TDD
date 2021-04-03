import React from 'react';

const appointmentTimeOfDay = (startAt) => {
  const [h, m] = new Date(startAt).toTimeString().split(':');
  return `${h}:${m}`;
};
export const Appointment = ({
  customer,
  service,
  stylist,
  notes,
  startsAt,
}) => {
  return (
    <div id="appointmentView">
      <h3>
        Today&rsquo;s appointment at{' '}
        {appointmentTimeOfDay(startsAt)}
      </h3>
      <table>
        <tbody>
          <tr>
            <td>Customer</td>
            <td>
              {customer.firstName} {customer.lastName}
            </td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>{customer.phoneNumber}</td>
          </tr>
          <tr>
            <td>Stylist</td>
            <td>{stylist}</td>
          </tr>
          <tr>
            <td>Service</td>
            <td>{service}</td>
          </tr>
          <tr>
            <td>Notes</td>
            <td>{notes}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
