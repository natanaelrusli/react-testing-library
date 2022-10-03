import Login from './Index'
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer'

test('inputs should be initially empty', () => {
  render(<Login />)

  expect(screen.getByTestId('emailInput').value).toBe('')
  expect(screen.getByTestId('passwordInput').value).toBe('')
})

describe('snapshot testing', () => {
  test('snapshot for login component', () => {
    const login = renderer.create(<Login />).toJSON();
    expect(login).toMatchSnapshot()
  })
})