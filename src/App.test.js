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

  // It should be queried again because initially it is null, so we need to query it again once it shown
  const invalidEmailLabelElementAgain = screen.queryByText(/the email you input is invalid/i)

  // https://www.npmjs.com/package/@testing-library/jest-dom
  expect(invalidEmailLabelElementAgain).toBeInTheDocument()
})

test('should show password error if password is less than 5 characters', () => {
  render(<App />)
  const expectedEmail = 'nael@gmail.com'

  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i
  })
  const passwordInputElement = screen.getByLabelText('Password')
  const passwordErrorElement = screen.queryByText(
      /The password you entered should contain 5 or more characters/i
  )
  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i
  })

  userEvent.type(emailInputElement, expectedEmail)

  expect(passwordErrorElement).not.toBeInTheDocument()
  
  userEvent.type(passwordInputElement, '123')

  userEvent.click(submitBtnElement)

  const passwordErrorElementAgain = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  )

  expect(passwordErrorElementAgain).toBeInTheDocument()
})

test('should show confirm password error when passwords dont match', () => {
  render(<App />)

  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i,
  })
  const passwordInputElement = screen.getByLabelText('Password')
  const confirmPasswordInputElement = screen.getByLabelText('Confirm password')

  const confirmPasswordErrorElement = screen.queryByText(
    /the passwords don't match. try again/i
  )

  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i
  })

  userEvent.type(emailInputElement, 'nael@email.com')

  expect(confirmPasswordErrorElement).not.toBeInTheDocument()

  userEvent.type(passwordInputElement, '12345')
  userEvent.type(confirmPasswordInputElement, '123456')

  userEvent.click(submitBtnElement)

  const confirmPasswordErrorElementAgain = screen.queryByText(
    /the passwords don't match. try again/i
  )

  expect(confirmPasswordErrorElementAgain).toBeInTheDocument()
})

test('should show no error message if every input is correct', () => {
  render(<App />)

  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i,
  })
  const passwordInputElement = screen.getByLabelText('Password')
  const confirmPasswordInputElement = screen.getByLabelText('Confirm password')

  const emailErrorlElement = screen.queryByText(/the email you input is invalid/i)
  const passwordErrorElement = screen.queryByText(
      /The password you entered should contain 5 or more characters/i
  )
  const confirmPasswordErrorElement = screen.queryByText(
      /the passwords don't match. try again/i
  )

  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i
  })

  userEvent.type(emailInputElement, 'nael@email.com')
  userEvent.type(passwordInputElement, '123456')
  userEvent.type(confirmPasswordInputElement, '123456')

  userEvent.click(submitBtnElement)

  expect(confirmPasswordErrorElement).not.toBeInTheDocument()
  expect(emailErrorlElement).not.toBeInTheDocument()
  expect(passwordErrorElement).not.toBeInTheDocument()
})
