import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />);
 });

 //need to test it exists, show 3 different asserts
 //we expect it to be truthy, to be in the document, and verify it has the correct content
test('renders the contact form header', () => {
    render(<ContactForm />);

    const headerElement = screen.queryByText(/contact form/i);
    //console.log(headerElement);
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toBeTruthy();
    expect(headerElement).toHaveTextContent(/contact form/i);
    
});

// test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
//         const firstNameInput = screen.getByLabelText(/first name/i);
//         userEvent.type(firstNameInput, 'foo');
//         const errorInput = screen.getByTestId(/error/);

// });

// test('renders THREE error messages if user enters no values into any fields.', async () => {

// });

// test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {

// });

// test('renders "email must be a valid email address" if an invalid email is entered', async () => {

// });

// test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

// });

// test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

// });

// test('renders all fields text when all fields are submitted.', async () => {

// });
