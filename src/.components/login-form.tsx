import React, { useState } from "react";

type PropTypes = {
  onSubmit: (formData: FormData) => void;
  buttonText: string;
};

export type FormData = {
  username: "";
  password: "";
};

const LoginForm = ({ onSubmit, buttonText }: PropTypes) => {
  const [{ username, password }, setFormState] = useState<FormData>({
    username: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((oldState) => ({ ...oldState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={handleChange}
      />
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export { LoginForm };
