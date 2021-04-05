import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { createContainer } from '../utils/domManipulators';
import { AppointmentForm } from '../src/AppointmentForm';

describe('AppointmentForm', () => {
  let render, container;
  const labelFor = (label) =>
    container.querySelector(`label[for="${label}"]`);

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  const form = (id) => container.querySelector(`form[id="${id}"]`);
  const field = (name) => form('appointment').elements[name];

  it('renders a form', () => {
    render(<AppointmentForm />);
    expect(form).not.toBeNull();
  });

  describe('service field', () => {
    const findOption = (dropDownNode, textContent) => {
      const options = Array.from(dropDownNode.childNodes);
      return options.find(
        (option) => option.textContent === textContent
      );
    };

    const itRendersALabel = (fieldName, value) =>
      it('renders a label', () => {
        render(<AppointmentForm />);
        expect(labelFor(fieldName)).not.toBeNull();
        expect(labelFor(fieldName).textContent).toEqual(value);
      });
    const itAssignAnIdThatMatchesTheLabelId = (fieldName, id) =>
      it('assigns an id that matches the label', () => {
        render(<AppointmentForm />);
        expect(field(fieldName).id).toEqual(id);
      });

    const iiSavesNewValueWhenSubmitted = (fieldName, value) => {
      it('saves a new value when submitted', async () => {
        expect.hasAssertions();
        render(
          <AppointmentForm
            service={value}
            onSubmit={({ service }) =>
              expect(service).toEqual(value)
            }
          />
        );

        await ReactTestUtils.Simulate.change(field(fieldName), {
          target: { value, name: fieldName },
        });
        await ReactTestUtils.Simulate.submit(form('appointment'));
      });
    };

    it('renders as a select box', () => {
      render(<AppointmentForm />);
      expect(field('service')).not.toBeNull();
      expect(field('service').tagName).toEqual('SELECT');
    });

    it('initially has a blank value chosen', () => {
      render(<AppointmentForm />);
      const firstNode = field('service').childNodes[0];
      expect(firstNode.value).toEqual('');
      expect(firstNode.selected).toBeTruthy();
    });
    it('lists all salon service', () => {
      const selectTableServices = [
        'Cut',
        'Blow-dry',
        'Cut & color',
        'Beard trim',
        'Cut & beard trim',
        'Extensions',
      ];

      render(
        <AppointmentForm
          selectTableServices={selectTableServices}
        />
      );
      const optionNodes = Array.from(field('service').childNodes);
      const renderedServices = optionNodes.map(
        (node) => node.textContent
      );
      expect(renderedServices).toEqual(
        expect.arrayContaining(selectTableServices)
      );
    });

    it('pre-selects the existing value', () => {
      const services = ['Cut', 'Blow-dry'];
      render(
        <AppointmentForm
          selectTableServices={services}
          service="Blow-dry"
        />
      );
      const option = findOption(field('service'), 'Blow-dry');

      expect(option.selected).toBeTruthy();
    });

    itRendersALabel('service', 'Service');
    itAssignAnIdThatMatchesTheLabelId('service', 'service');
    iiSavesNewValueWhenSubmitted('service', 'Blow-dry');
  });

  describe('time slot table', () => {
    const timeSlotTable = () =>
      container.querySelector('table#time-slots');
    const startsAtField = (index) =>
      container.querySelectorAll('input[name="startsAt"]')[index];

    it('renders a table for time slots', () => {
      render(<AppointmentForm />);
      expect(timeSlotTable()).not.toBeNull();
    });

    it('renders a time slot for every half an hour between open and close times', () => {
      render(
        <AppointmentForm salonOpenAt={9} salonCloseAt={11} />
      );
      const timesOfDay = timeSlotTable().querySelectorAll(
        'tbody >* th'
      );
      expect(timesOfDay).toHaveLength(4);
      expect(timesOfDay[0].textContent).toEqual('09:00');
      expect(timesOfDay[1].textContent).toEqual('09:30');
      expect(timesOfDay[3].textContent).toEqual('10:30');
    });

    it('renders an empty cell at the start of the header row', () => {
      render(<AppointmentForm />);
      const headerRow = timeSlotTable().querySelector(
        'thead > tr'
      );
      expect(headerRow.firstChild.textContent).toEqual('Mon 05');
    });

    it('renders a week of available dates', () => {
      const today = new Date(2018, 11, 1);
      render(<AppointmentForm today={today} />);
      const dates = timeSlotTable().querySelectorAll(
        'thead >* th:not(:first-child'
      );
      expect(dates).toHaveLength(6);
      expect(dates[0].textContent).toEqual('Sun 02');
      expect(dates[5].textContent).toEqual('Fri 07');
    });

    it('renders a radio button for each time slot', () => {
      const today = new Date();
      const availableTimeSlots = [
        { startsAt: today.setHours(9, 0, 0, 0) },
        { startsAt: today.setHours(9, 30, 0, 0) },
      ];

      render(
        <AppointmentForm
          availableTimeSlots={availableTimeSlots}
          today={today}
        />
      );

      const cells = timeSlotTable().querySelectorAll('td');

      expect(
        cells[0].querySelector('input[type="radio"]')
      ).not.toBeNull();
      expect(
        cells[7].querySelector('input[type="radio"]')
      ).not.toBeNull();
    });

    it('does not render radio buttons for unavailable time slots', () => {
      render(<AppointmentForm availableTimeSlots={[]} />);
      const timesOfDay = timeSlotTable().querySelectorAll('input');
      expect(timesOfDay).toHaveLength(0);
    });

    it('sets radio button values to the index of the corresponding appointment', () => {
      const today = new Date();
      const availableTimeSlots = [
        { startsAt: today.setHours(9, 0, 0, 0) },
        { startsAt: today.setHours(9, 30, 0, 0) },
      ];
      render(
        <AppointmentForm
          availableTimeSlots={availableTimeSlots}
          today={today}
        />
      );

      expect(startsAtField(0).value).toEqual(
        availableTimeSlots[0].startsAt.toString()
      );

      expect(startsAtField(1).value).toEqual(
        availableTimeSlots[1].startsAt.toString()
      );
    });
  });
});
