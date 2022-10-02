import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  render(<App />)
})

afterEach(() => {
  console.log('This will run after each test')
})

beforeAll(() => {
  console.log('This will run before all tests')
})

afterAll(() => {
  console.log('This will run once after all of the tests')
})

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i
  })
  const passwordInputElement = screen.getByLabelText('Password')
  const confirmPasswordElement = screen.getByLabelText(/confirm password/i)

  if (email) {
    userEvent.type(emailInputElement, email)
  }
  if (password) {
    userEvent.type(passwordInputElement, password)
  }
  if (confirmPassword) {
    userEvent.type(confirmPasswordElement, confirmPassword)
  }

  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordElement
  }
}

const clickSubmitBtn = () => {
  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i
  })

  userEvent.click(submitBtnElement)
}

test('inputs should be initially empty', () => {
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
  let email, expectedValue
  email = expectedValue = 'nael@gmail.com'

  const { emailInputElement } = typeIntoForm(
      {email: email}
  )
  expect(emailInputElement.value).toBe(expectedValue)
})

test('should be able to type password', () => {
  let password, expectedValue
  password = expectedValue = 'password'

  const { passwordInputElement } = typeIntoForm({ password: password })
  expect(passwordInputElement.value).toBe(expectedValue)
})

test('should be able to type confirm password', () => {
  let confirmPassword, expectedValue
  confirmPassword = expectedValue = 'password'

  const { confirmPasswordElement } = typeIntoForm({ confirmPassword: confirmPassword })
  expect(confirmPasswordElement.value).toBe(expectedValue)
})

test('should show email error message on invalid email', () => {
  const invalidEmail = 'invalid.com'
  // because there are 2 expect in the test, we should use query so it will not throw an error
  const invalidEmailLabelElement = screen.queryByText(/the email you input is invalid/i)

  typeIntoForm({ email: '' })

  // test if the error not showing at the beginning
  expect(invalidEmailLabelElement).not.toBeInTheDocument()

  typeIntoForm({
    email: invalidEmail
  })

  clickSubmitBtn()

  // It should be queried again because initially it is null, so we need to query it again once it shown
  const invalidEmailLabelElementAgain = screen.queryByText(/the email you input is invalid/i)

  // https://www.npmjs.com/package/@testing-library/jest-dom
  expect(invalidEmailLabelElementAgain).toBeInTheDocument()
})

test('should show password error if password is less than 5 characters', () => {
  const email = 'nael@gmail.com'
  const invalidPassword = '1234'

  const passwordErrorElement = screen.queryByText(
      /The password you entered should contain 5 or more characters/i
  )

  expect(passwordErrorElement).not.toBeInTheDocument()

  typeIntoForm({
    email: email,
    password: invalidPassword
  })

  clickSubmitBtn()

  const passwordErrorElementAgain = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  )

  expect(passwordErrorElementAgain).toBeInTheDocument()
})

test('should show confirm password error when passwords dont match', () => {
  const validEmail = 'nael@gmail.com'
  const validPassword = '12345678'
  const invalidCofirmPassword = '12345'

  const confirmPasswordErrorElement = screen.queryByText(
    /the passwords don't match. try again/i
  )

  typeIntoForm({
    email: validEmail,
    password: validPassword,
    confirmPassword: invalidCofirmPassword
  })

  expect(confirmPasswordErrorElement).not.toBeInTheDocument()

  clickSubmitBtn()

  const confirmPasswordErrorElementAgain = screen.queryByText(
    /the passwords don't match. try again/i
  )

  expect(confirmPasswordErrorElementAgain).toBeInTheDocument()
})

test('should show no error message if every input is correct', () => {
  const validEmail = 'nael@gmail.com'
  const validPassword = '12345678'
  const validConfirmPassword = '12345678'

  const emailErrorlElement = screen.queryByText(/the email you input is invalid/i)
  const passwordErrorElement = screen.queryByText(
      /The password you entered should contain 5 or more characters/i
  )
  const confirmPasswordErrorElement = screen.queryByText(
      /the passwords don't match. try again/i
  )

  typeIntoForm({
    email: validEmail,
    password: validPassword,
    confirmPassword: validConfirmPassword
  })

  clickSubmitBtn()

  expect(confirmPasswordErrorElement).not.toBeInTheDocument()
  expect(emailErrorlElement).not.toBeInTheDocument()
  expect(passwordErrorElement).not.toBeInTheDocument()
})
