import styled from "styled-components"
import { theme } from "../../components/constants/Theme"

export const LoginLink = styled.a`
  color: black;
  text-decoration: none;
  cursor: pointer;
  color: ${theme.colors.orange};
`

export const HeaderText = styled.h1`
  color: ${theme.colors.orange};
  margin-bottom: 20px;
  text-align: center;
`

export const Button = styled.button`
  color: black;
  background-color: cyan;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid blue;
  border-radius: 3px;
`

export const SignupButton = styled(Button)`
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

export const FormControl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`