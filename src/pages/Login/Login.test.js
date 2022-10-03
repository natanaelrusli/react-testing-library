import Login from './Index'
import { render, screen } from '@testing-library/react';

test('inputs should be initially empty', () => {
  render(<Login />)

  expect(screen.getByTestId('emailInput').value).toBe('')
  expect(screen.getByTestId('passwordInput').value).toBe('')
})