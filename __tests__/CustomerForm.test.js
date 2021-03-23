import React from 'react';
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

  const firstsNameField = () =>
    form('customer').elements.firstName;

  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form('customer')).not.toBeNull();
  });

  it('renders the first name as a text box', () => {
    render(<CustomerForm />);
    expectToBeInputFieldOfTypeText(firstsNameField());
  });

  it('includes the existing value for the first name', () => {
    render(<CustomerForm firstName={'Ashley'} />);
    expect(firstsNameField().value).toEqual('Ashley');
  });

  it('renders a label for the first name field', () => {
    render(<CustomerForm />);
    expect(labelFor('firstName')).not.toBeNull();
    expect(labelFor('firstName').textContent).toEqual(
      'First Name'
    );
  });

  it('assigns an id that matches the label id to the first name field', () => {
    render(<CustomerForm />);
    expect(firstsNameField().id).toEqual('firstName');
  });
});
