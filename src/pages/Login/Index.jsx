import { useState } from "react";
import {
  ErrorMessage,
  FormContainer,
  FormInput,
  FormItem,
  FormLabel,
  HeaderText,
  LoginButton,
  SignupLink
} from "./style";
import { Card } from '../../components/containers/Card'
import validator from "validator";

function Index() {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginInput({
      ...loginInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    // JS validator
    // https://www.npmjs.com/package/validator
    if (!validator.isEmail(loginInput.email)) {
      return setError("The email you input is invalid");
    } else if (loginInput.password.length < 5) {
      return setError(
        "The password you entered should contain 5 or more characters"
      );
    } else if (loginInput.password !== loginInput.confirmPassword) {
      return setError("The passwords don't match. try again");
    }
  };

  return (
    <Card>
      <FormContainer>
        <HeaderText>Login</HeaderText>
        <FormItem>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            data-testid="emailInput"
            name="email"
            id="email"
            onChange={handleChange}
            value={loginInput.email}
          />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInput
            data-testid="passwordInput"
            name="password"
            id="password"
            type={"password"}
            onChange={handleChange}
            value={loginInput.password}
          />
        </FormItem>
        <ErrorMessage>{error}</ErrorMessage>
        <LoginButton onClick={handleClick} className="pointer">
          Login
        </LoginButton>
        <p>Don't have an account? Sign Up <SignupLink href="/">here</SignupLink></p>
      </FormContainer>
    </Card>
  );
}

export default Index;
