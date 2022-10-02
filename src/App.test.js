import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('inputs should be initially empty', () => {
  render(<App />)
  
  // RTL queries
  // https://testing-library.com/docs/queries/about
  const emailInputElement = screen.getByRole('textbox')
  const passwordInputElement = screen.getByLabelText('Password')
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i)
  
  expect(emailInputElement.value).toBe('')
  expect(passwordInputElement.value).toBe('')
  expect(confirmPasswordInputElement.value).toBe('')
})

test('should be able to type an email', () => {
  render(<App />)
  const expectedValue = 'nael@gmail.com'

  // query an elements by multiple conditions
  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i
  })
  userEvent.type(emailInputElement, expectedValue)
  expect(emailInputElement.value).toBe(expectedValue)
})

test('should be able to type password', () => {
  render(<App />)
  const expectedValue = 'password'

  const passwordInputElement = screen.getByLabelText('Password')
  userEvent.type(passwordInputElement, 'password')
  expect(passwordInputElement.value).toBe(expectedValue)
})

test('should be able to type confirm password', () => {
  render(<App />)
  const expectedValue = 'password'

  const passwordInputElement = screen.getByLabelText('Confirm password')
  userEvent.type(passwordInputElement, 'password')
  expect(passwordInputElement.value).toBe(expectedValue)
})

test('should show email error message on invalid email', () => {
  render(<App />)
  const invalidEmail = 'invalid.com'
  // because there are 2 expect in the test, we should use query so it will not throw an error
  const invalidEmailLabelElement = screen.queryByText(/the email you input is invalid/i)
  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i
  })
  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i
  })

  // test if the error not showing at the beginning
  expect(invalidEmailLabelElement).not.toBeInTheDocument()
  userEvent.type(emailInputElement, invalidEmail)
  userEvent.click(submitBtnElement)

  // https://www.npmjs.com/package/@testing-library/jest-dom#tobedisabled
  expect(invalidEmailLabelElement).toBeInTheDocument()
})
