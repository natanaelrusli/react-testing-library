import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '../../components/constants/Theme'

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
`

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-top: 5px;
  margin-bottom: 10px;
  width: 100%;
`

export const FormLabel = styled.p`
  font-size: 1.1rem;
  margin-bottom: 7px;
`

export const FormInput = styled.input`
  width: 100%;
  border-radius: 30px;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid black;
`

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const TextH1 = styled.h1`
  color: ${(props) => props.color || 'black'};
`

export const TextBig = styled(TextH1)`
  font-size: 4rem;
  text-transform: 'uppercase';
  &:hover {
    transform: scale(1.2);
    color: yellow;
    transition: 700ms;
  }
`

export const LinkCustom = styled(Link)`
  text-decoration: none;
`

export const Button = styled.button`
  color: black;
  background-color: cyan;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid blue;
  border-radius: 3px;
`

export const LoginButton = styled(Button)`
  background-color: #FFA500;
  color: white;
  border: none;
  outline: none;
  width: 100%;
  border-radius: 30px;
  padding: 10px;
  text-transform: uppercase;
  margin-top: 15px;
  transition: 500ms;
  &:hover {
    background-color: white;
    color: #FFA500;
    transition: 500ms;
    border: 1px solid #FFA500;
  }
`

export const GreenButton = styled(Button)`
  color: green;
  border-color: yellow;
`

export const ErrorMessage = styled.p`
  text-align: left;
  color: red;
`

export const SignupLink = styled.a`
  color: black;
  text-decoration: none;
  cursor: pointer;
  color: #FFA500;
`

export const HeaderText = styled.h1`
  color: ${theme.colors.orange};
  margin-bottom: 20px;
  margin-top: 20px;
  text-align: center;
`