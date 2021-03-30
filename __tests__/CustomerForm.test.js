import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { createContainer } from '../utils/domManipulators';
import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {
  let render, container;
  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  const form = (id) => container.querySelector(`form[id="${id}"]`);
  const labelFor = (label) =>
    container.querySelector(`label[for="${label}"]`);

  const expectToBeInputFieldOfTypeText = (formElement) => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual('INPUT');
    expect(formElement.type).toEqual('text');
  };

  const field = (name) => form('customer').elements[name];
  const itRendersAsATextBox = (fieldName) =>
    it('renders as a text box', () => {
      render(<CustomerForm />);
      expectToBeInputFieldOfTypeText(field(fieldName));
    });
  const itIncludeTheExistingValue = (fieldName) =>
    it('includes the existing value', () => {
      render(<CustomerForm {...{ [fieldName]: 'value' }} />);
      expect(field(fieldName).value).toEqual('value');
    });
  const itRendersALabel = (fieldName, value) =>
    it('renders a label', () => {
      render(<CustomerForm />);
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(value);
    });
  const itAssignAnIdThatMatchesTheLabelId = (fieldName, id) =>
    it('assigns an id that matches the label', () => {
      render(<CustomerForm />);
      expect(field(fieldName).id).toEqual(id);
    });
  const itSavesExistingValueWhenSubmitted = (fieldName) =>
    it('saves existing value when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: 'value' }}
          onSubmit={(props) =>
            expect(props[fieldName]).toEqual('value')
          }
        />
      );
      await ReactTestUtils.Simulate.submit(form('customer'));
    });
  const itSavesNewValueWhenSubmitted = (fieldName, value) =>
    it('saves new value when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: 'existingValue' }}
          onSubmit={(props) =>
            expect(props[fieldName]).toEqual(value)
          }
        />
      );
      await ReactTestUtils.Simulate.change(field(fieldName), {
        target: { value, name: fieldName },
      });
      await ReactTestUtils.Simulate.submit(form('customer'));
    });

  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form('customer')).not.toBeNull();
  });

  describe('first name field', () => {
    itRendersAsATextBox('firstName');
    itIncludeTheExistingValue('firstName');
    itRendersALabel('firstName', 'First Name');
    itAssignAnIdThatMatchesTheLabelId('firstName', 'firstName');
    itSavesExistingValueWhenSubmitted('firstName');
    itSavesNewValueWhenSubmitted('firstName', 'Jamie');
  });

  describe('last name field', () => {
    itRendersAsATextBox('lastName');
    itIncludeTheExistingValue('lastName');
    itRendersALabel('lastName', 'Last Name');
    itAssignAnIdThatMatchesTheLabelId('lastName', 'lastName');
    itSavesExistingValueWhenSubmitted('lastName');
    itSavesNewValueWhenSubmitted('lastName', 'Ramiro');
  });

  describe('phoneNumber field', () => {
    itRendersAsATextBox('phoneNumber');
    itIncludeTheExistingValue('phoneNumber');
    itRendersALabel('phoneNumber', 'Phone Number');
    itAssignAnIdThatMatchesTheLabelId(
      'phoneNumber',
      'phoneNumber'
    );
    itSavesExistingValueWhenSubmitted('phoneNumber');
    itSavesNewValueWhenSubmitted('phoneNumber', '123456789');
  });

  it('has a submit button', () => {
    const submitButton = () =>
      container.querySelector('input[type="submit"]');
    expect(submitButton).not.toBeNull();
  });
});
