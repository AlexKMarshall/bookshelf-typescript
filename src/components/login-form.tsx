/** @jsx jsx */
import { jsx } from "@emotion/core";

import React, { useState } from "react";
import { Input, Spinner } from "./lib";
import { Stack } from "components/layout";

type PropTypes = {
  onSubmit: (formData: FormData) => void;
  submitButton: React.ReactElement;
};

export type FormData = {
  username: "";
  password: "";
};

const LoginForm = ({ onSubmit, submitButton }: PropTypes) => {
  const [{ username, password }, setFormState] = useState<FormData>({
    username: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((oldState) => ({ ...oldState, [name]: value }));
  };

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    onSubmit({ username, password });
  };

  const Form = Stack.withComponent("form");

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <label htmlFor="username">Username</label>
        <Input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleChange}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChange}
        />
      </InputGroup>
      <div>
        {React.cloneElement(submitButton, { type: "submit" })}
        <Spinner />
      </div>
    </Form>
  );
};

const InputGroup: React.FC = ({ children }) => (
  <Stack size={-2}>{children}</Stack>
);

export { LoginForm };
