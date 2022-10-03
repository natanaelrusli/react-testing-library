import React, { useState } from 'react'
import validator from 'validator'
import { LoginLink } from './style'

function Index() {
  const [signUpInput, setSignUpInput] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    setSignUpInput({
      ...signUpInput,
      [e.target.name]: e.target.value
    })
  }

  const handleClick = (e) => {
    e.preventDefault()
    // JS validator
    // https://www.npmjs.com/package/validator
    if (!validator.isEmail(signUpInput.email)) {
      return setError('The email you input is invalid')
    } else if (signUpInput.password.length < 5) {
      return setError('The password you entered should contain 5 or more characters')
    } else if (signUpInput.password !== signUpInput.confirmPassword) {
      return setError("The passwords don't match. try again")
    }
  }

  return (
    <div className="container my-5">
      <form action="" className='mb-3'>
        <div className='mb-3'>
          <label htmlFor="email" className='form-label'>
            Email address
          </label>
          <input
            type="email"
            id='email'
            name='email'
            className='form-control'
            value={signUpInput.email}
            onChange={handleChange}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor="password" className='form-label'>
            Password
          </label>
          <input
            type="password"
            id='password'
            name='password'
            className='form-control'
            value={signUpInput.password}
            onChange={handleChange}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor="confirmPassword" className='form-label'>
            Confirm password
          </label>
          <input
            type="password"
            id='confirmPassword'
            name='confirmPassword'
            className='form-control'
            value={signUpInput.confirmPassword}
            onChange={handleChange}
          />
        </div>      

        {
          error && <p className='text-danger'>{error}</p>
        }

        <button type='submit' onClick={handleClick}>Submit</button>  
      </form>
      <p>Already have an account? Login <LoginLink href="/login">here</LoginLink></p>
    </div>
  )
}

export default Index