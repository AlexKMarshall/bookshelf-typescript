import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

import { Logo } from "./.components/logo";
import { LoginForm, FormData } from "./.components/login-form";

type DialogType = "register" | "login";

const App = () => {
  const [openModal, setOpenModal] = useState<DialogType | "none">("none");
  const closeModal = () => setOpenModal("none");
  const handleSubmit = (type: DialogType) => (formData: FormData) => {
    console.log(type, formData);
    closeModal();
  };

  return (
    <div>
      <Logo height="80" width="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => setOpenModal("login")}>Login</button>
      </div>
      <div>
        <button onClick={() => setOpenModal("register")}>Register</button>
      </div>
      <Dialog
        isOpen={openModal === "login"}
        onDismiss={closeModal}
        aria-label="login form"
      >
        <h3>Login</h3>
        <LoginForm onSubmit={handleSubmit("login")} buttonText="Login" />
        <div>
          <button onClick={() => closeModal()}>Close</button>
        </div>
      </Dialog>
      <Dialog
        isOpen={openModal === "register"}
        onDismiss={closeModal}
        aria-label="registration form"
      >
        <h3>Register</h3>
        <LoginForm onSubmit={handleSubmit("register")} buttonText="Register" />
        <div>
          <button onClick={() => closeModal()}>Close</button>
        </div>
      </Dialog>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
