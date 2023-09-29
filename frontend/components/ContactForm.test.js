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

//because state is changing, we are using async and await to account for the state change (ie runs through a handle change)

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
   //each test must render the component that needs to be seen and tested on
    render(<ContactForm />);   
    
    const firstNameInput = screen.getByLabelText(/first name/i);
        userEvent.type(firstNameInput, 'foo');

        const errorMessages = await screen.findAllByTestId('error');
        expect(errorMessages).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {

    render(<ContactForm />);   

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    await waitFor(() => {
        const errorMessages = screen.queryAllByTestId('error');
        expect(errorMessages).toHaveLength(3);

    });


});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {

    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/First Name/i);
    userEvent.type(firstNameInput, 'Matthew');


    const lastNameInput = screen.getByLabelText(/Last Name/i);
    userEvent.type(lastNameInput, 'Smith');

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);


    await waitFor(() => {

        const errorMessages = screen.queryAllByTestId('error');
        expect(errorMessages).toHaveLength(1);

    });

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {

    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, 'abcdefg@gmail');
    
    const errorMessage = await screen.findByText(/must be a valid email address/i);
    expect(errorMessage).toBeInTheDocument();

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/First Name/i);
    userEvent.type(firstNameInput, 'Matthew');

    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, 'abcdefg@gmail.com');

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    const errorMessage = await screen.findByText(/lastName is a required field/i);
    expect(errorMessage).toBeInTheDocument();

    


});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
   render(<ContactForm />);

   const firstNameInput = screen.getByLabelText(/First Name/i);
   userEvent.type(firstNameInput, 'Matthew');

   const lastNameInput = screen.getByLabelText(/Last Name/i);
   userEvent.type(lastNameInput, 'Smith');

   const emailInput = screen.getByLabelText(/email/i);
   userEvent.type(emailInput, 'abcdefg@gmail.com');

//    const messageInput = screen.getByLabelText(/message/i);
//    userEvent.type(messageInput, 'today is nice');

   const submitButton = screen.getByRole('button');
   userEvent.click(submitButton);

   await waitFor(() => {
    const firstNameDisplay = screen.queryByText('Matthew');
    const lastNameDisplay = screen.queryByText('Smith');
    const emailDisplay = screen.queryByText('abcdefg@gmail.com');
  
   const messageDisplay = screen.queryByTestId('messageDisplay');

   expect(firstNameDisplay).toBeInTheDocument();
   expect(lastNameDisplay).toBeInTheDocument();
   expect(emailDisplay).toBeInTheDocument();
   expect(messageDisplay).not.toBeInTheDocument();
 });
});



test('renders all fields text when all fields are submitted.', async () => {
   render(<ContactForm />);

   const firstNameInput = screen.getByLabelText(/First Name/i);
   userEvent.type(firstNameInput, 'Matthew');

   const lastNameInput = screen.getByLabelText(/Last Name/i);
   userEvent.type(lastNameInput, 'Smith');

   const emailInput = screen.getByLabelText(/email/i);
   userEvent.type(emailInput, 'abcdefg@gmail.com');

   const messageInput = screen.getByLabelText(/message/i);
    userEvent.type(messageInput, 'today is nice');

   const submitButton = screen.getByRole('button');
   userEvent.click(submitButton);

   await waitFor(() => {
    const firstNameDisplay = screen.queryByText('Matthew');
    const lastNameDisplay = screen.queryByText('Smith');
    const emailDisplay = screen.queryByText('abcdefg@gmail.com');
   const messageDisplay = screen.queryByText('today is nice');

   expect(firstNameDisplay).toBeInTheDocument();
   expect(lastNameDisplay).toBeInTheDocument();
   expect(emailDisplay).toBeInTheDocument();
   expect(messageDisplay).toBeInTheDocument();

   });

});
