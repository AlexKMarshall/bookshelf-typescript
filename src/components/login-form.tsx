/** @jsx jsx */
import { jsx } from "@emotion/core";

import React, { useState } from "react";
import { FormGroup, Input, Spinner } from "./lib";

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

  return (
    <form
      onSubmit={handleSubmit}
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        "> div": {
          margin: "10px auto",
          width: "100%",
          maxWidth: "300px",
        },
      }}
    >
      <FormGroup>
        <label htmlFor="username">Username</label>
        <Input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChange}
        />
      </FormGroup>
      <div>
        {React.cloneElement(submitButton, { type: "submit" })}
        <Spinner />
      </div>
    </form>
  );
};

export { LoginForm };
