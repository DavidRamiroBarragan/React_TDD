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
});
