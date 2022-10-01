import { render, screen } from '@testing-library/react';
import App from './App';

test('inputs should be initially empty', () => {
  render(<App />)
  
  // RTL queries
  // https://testing-library.com/docs/queries/about
  const emailInputElement = screen.getByRole('textbox')
  
  expect(emailInputElement.value).toBe('')
})
