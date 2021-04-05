import React, { useState } from 'react';

export const AppointmentForm = ({
  selectTableServices,
  service,
  onSubmit,
  salonOpenAt,
  salonCloseAt,
  today,
  availableTimeSlots,
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
      <TimeSlotTable
        salonOpenAt={salonOpenAt}
        salonCloseAt={salonCloseAt}
        today={today}
        availableTimeSlots={availableTimeSlots}
      />
    </form>
  );
};

const dailyTimeSlots = (salonOpensAt, salonCloseAt) => {
  const totalSlots = (salonCloseAt - salonOpensAt) * 2;
  const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);
  const increment = 30 * 60 * 1000;
  return timeIncrements(totalSlots, startTime, increment);
};
const weeklyDateValues = (startDate) => {
  const midnight = new Date(startDate).setHours(0, 0, 0, 0);
  const increment = 24 * 60 * 60 * 1000;
  return timeIncrements(7, midnight, increment);
};

const timeIncrements = (numTimes, startTime, increment) =>
  Array(numTimes)
    .fill([startTime])
    .reduce((acc, _, i) =>
      acc.concat([startTime + i * increment])
    );

const toTimeValue = (timeStamp) =>
  new Date(timeStamp).toTimeString().substring(0, 5);

const toShortDate = (timestamp) => {
  const [day, , dayOfMonth] = new Date(timestamp)
    .toDateString()
    .split(' ');
  return `${day} ${dayOfMonth}`;
};

const mergeDateAndTime = (date, timeSlot) => {
  const time = new Date(timeSlot);

  return new Date(date).setHours(
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
    time.getMilliseconds()
  );
};

const RadioButtonIfAvailable = ({
  availableTimeSlots,
  date,
  timeSlot,
}) => {
  const startsAt = mergeDateAndTime(date, timeSlot);
  if (
    availableTimeSlots.some(
      (availableTimeSlot) =>
        availableTimeSlot.startsAt === startsAt
    )
  ) {
    return <input type="radio" name="startsAt" value={startsAt} />;
  }

  return null;
};

const TimeSlotTable = ({
  salonOpenAt,
  salonCloseAt,
  today,
  availableTimeSlots,
}) => {
  const timeSlots = dailyTimeSlots(salonOpenAt, salonCloseAt);
  const dates = weeklyDateValues(today);

  return (
    <table id="time-slots">
      <thead>
        <tr>
          {dates.map((d) => (
            <th key={d}>{toShortDate(d)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map((timeSlot) => (
          <tr key={timeSlot}>
            <th>{toTimeValue(timeSlot)}</th>
            {dates.map((date) => (
              <td key={date}>
                <RadioButtonIfAvailable
                  availableTimeSlots={availableTimeSlots}
                  date={date}
                  timeSlot={timeSlot}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
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
  salonOpenAt: 9,
  salonCloseAt: 19,
  today: new Date(),
  availableTimeSlots: [],
};
