import React from "react";
import ReactDOM from "react-dom";
import { Appointment, AppointmentDayView } from "../src/Appointment";

describe("Appointment", () => {
  let customer;
  let container;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  const render = (component) => ReactDOM.render(component, container);
  it("renders the customer first name", () => {
    customer = { firstName: "Ashley" };
    render(<Appointment customer={customer} />);
    expect(container.textContent).toMatch("Ashley");
  });

  it("renders another customer name", () => {
    customer = { firstName: "Jordan" };
    render(<Appointment customer={customer} />);
    expect(document.body.textContent).toMatch("Jordan");
  });
});

describe("AppointmentDayView", () => {
  let container;
  const today = new Date();

  const appointments = [
    { startAt: today.setHours(12, 0) },
    { startAt: today.setHours(13, 0) },
  ];
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  const render = (component) => ReactDOM.render(component, container);
  it("renders a div with the right id", () => {
    render(<AppointmentDayView appointments={[]} />);
    expect(container.querySelector("div#appointmentDayView")).not.toBeNull();
  });
  it("renders a div with the right id", () => {
    render(<AppointmentDayView appointments={appointments} />);
    expect(container.querySelector("ol").children).toHaveLength(2);
  });

  it("renders a div with the right id", () => {
    render(<AppointmentDayView appointments={appointments} />);
    expect(container.querySelector("ol").children).toHaveLength(2);
    expect(container.querySelectorAll("li")[0].textContent).toEqual("12:00");
    expect(container.querySelectorAll("li")[1].textContent).toEqual("13:00");
  });
});
