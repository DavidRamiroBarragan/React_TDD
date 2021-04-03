import React from 'react';
import ReactDOM from 'react-dom';
import { Appointment } from '../src/Appointment';

describe('Appointment', () => {
  let customer;
  let container;
  beforeEach(() => {
    container = document.createElement('div');
  });
  const render = (component) =>
    ReactDOM.render(component, container);
  const appointmentTable = () =>
    container.querySelector('#appointmentView > table');

  it('renders the customer first name', () => {
    customer = { firstName: 'Ashley' };
    render(<Appointment customer={customer} />);
    expect(appointmentTable().textContent).toMatch('Ashley');
  });

  it('renders another customer name', () => {
    customer = { firstName: 'Jordan' };
    render(<Appointment customer={customer} />);
    expect(appointmentTable().textContent).toMatch('Jordan');
  });

  it('renders the customer last name', () => {
    customer = { lastName: 'Jones' };
    render(<Appointment customer={customer} />);
    expect(appointmentTable().textContent).toMatch('Jones');
  });

  it('renders another customer last name', () => {
    customer = { lastName: 'Smith' };
    render(<Appointment customer={customer} />);
    expect(appointmentTable().textContent).toMatch('Smith');
  });

  it('renders the customer phone number', () => {
    customer = { phoneNumber: '123456789' };
    render(<Appointment customer={customer} />);
    expect(appointmentTable().textContent).toMatch('123456789');
  });

  it('renders another customer phone number', () => {
    customer = { phoneNumber: '234567890' };
    render(<Appointment customer={customer} />);
    expect(appointmentTable().textContent).toMatch('234567890');
  });

  it('renders the stylist name', () => {
    render(<Appointment customer={customer} stylist="Sam" />);
    expect(appointmentTable().textContent).toMatch('Sam');
  });

  it('renders another stylist name', () => {
    render(<Appointment customer={customer} stylist="Jo" />);
    expect(appointmentTable().textContent).toMatch('Jo');
  });

  it('renders the salon service', () => {
    render(<Appointment customer={customer} service="Cut" />);
    expect(appointmentTable().textContent).toMatch('Cut');
  });

  it('renders another salon service', () => {
    render(<Appointment customer={customer} service="Blow-dry" />);
    expect(appointmentTable().textContent).toMatch('Blow-dry');
  });
  it('renders the appointments notes', () => {
    render(<Appointment customer={customer} notes="abc" />);
    expect(appointmentTable().textContent).toMatch('abc');
  });

  it('renders other appointment notes', () => {
    render(<Appointment customer={customer} notes="def" />);
    expect(appointmentTable().textContent).toMatch('def');
  });

  it('render a div with a correct id', () => {
    render(<Appointment customer={customer} />);
    expect(
      container.querySelector('div#appointmentView')
    ).not.toBeNull();
  });

  it('render a table', () => {
    render(<Appointment customer={customer} />);
    expect(appointmentTable()).not.toBeNull();
  });

  it('renders a heading with the time', () => {
    const today = new Date();
    const timestamp = today.setHours(9, 0, 0);
    render(
      <Appointment customer={customer} startsAt={timestamp} />
    );
    const heading = container.querySelector('h3');
    expect(heading).not.toBeNull();
    expect(heading.textContent).toEqual(
      'Today’s appointment at 09:00'
    );
  });
});
