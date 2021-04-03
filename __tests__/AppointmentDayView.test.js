import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { AppointmentDayView } from '../src/AppointmentDayView';

describe('AppointmentDayView', () => {
  let container;
  const today = new Date();

  const appointments = [
    {
      startsAt: today.setHours(12, 0),
      customer: { firstName: 'Ashley' },
    },
    {
      startsAt: today.setHours(13, 0),
      customer: { firstName: 'Jordan' },
    },
  ];
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  const render = (component) =>
    ReactDOM.render(component, container);

  it('renders a div with the right id', () => {
    render(<AppointmentDayView appointments={[]} />);
    expect(
      container.querySelector('div#appointmentsDayView')
    ).not.toBeNull();
  });
  it('renders a ol with two children', () => {
    render(<AppointmentDayView appointments={appointments} />);
    expect(container.querySelector('ol').children).toHaveLength(2);
  });

  it('renders two li with the correct appointment starAt value', () => {
    render(<AppointmentDayView appointments={appointments} />);
    expect(container.querySelector('ol').children).toHaveLength(2);
    expect(
      container.querySelectorAll('li')[0].textContent
    ).toEqual('12:00');
    expect(
      container.querySelectorAll('li')[1].textContent
    ).toEqual('13:00');
  });

  it('initially shows a message saying there are no appointments today', () => {
    render(<AppointmentDayView appointments={[]} />);
    expect(container.textContent).toMatch(
      'There are no appointments scheduled for today'
    );
  });

  it('has a button element in each li', () => {
    render(<AppointmentDayView appointments={appointments} />);
    expect(container.querySelectorAll('li > button')).toHaveLength(
      2
    );
    expect(
      container.querySelectorAll('li > button')[0].type
    ).toEqual('button');
  });
  it('renders another appointment when selected', () => {
    render(<AppointmentDayView appointments={appointments} />);
    const button = container.querySelectorAll('button')[1];
    ReactTestUtils.Simulate.click(button);
    expect(container.textContent).toMatch('Jordan');
  });
  it('adds toggled class to button selected', () => {
    render(<AppointmentDayView appointments={appointments} />);
    const button = container.querySelectorAll('button')[1];
    ReactTestUtils.Simulate.click(button);
    expect(button.className).toMatch('toggled');
  });
});
