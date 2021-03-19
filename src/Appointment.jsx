import React from "react";

const appointmentTimeOfDay = (startAt) => {
  const [h, m] = new Date(startAt).toTimeString().split(":");
  return `${h}:${m}`;
};
export const Appointment = ({ customer }) => {
  return <div>{customer.firstName}</div>;
};
export const AppointmentDayView = ({ appointments }) => {
  return (
    <div id="appointmentDayView">
      <ol>
        {appointments.map((appointment) => (
          <li key={appointment.startAt}>
            {appointmentTimeOfDay(appointment.startAt)}
          </li>
        ))}
      </ol>
    </div>
  );
};
