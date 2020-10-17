/** @jsx jsx */
import { jsx } from "@emotion/core";

import ReactDOM from "react-dom";
import "./index.css";
import "@reach/dialog/styles.css";

import { Logo } from "./components/logo";
import { Button } from "./components/lib";
import { LoginForm, FormData } from "./components/login-form";
import { Modal, ModalContents, ModalOpenButton } from "./components/modal";

type DialogType = "register" | "login";

const App = () => {
  const handleSubmit = (type: DialogType) => (formData: FormData) => {
    console.log(type, formData);
  };

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Logo height="80" width="80" />
      <h1>Bookshelf</h1>
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gridGap: "0.75rem",
        }}
      >
        <Modal>
          <ModalOpenButton>
            <Button variant="primary">Login</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Login">
            <LoginForm
              onSubmit={handleSubmit("login")}
              submitButton={<Button variant="primary">Login</Button>}
            />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button variant="secondary">Register</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Registration form" title="Register">
            <LoginForm
              onSubmit={handleSubmit("register")}
              submitButton={<Button variant="secondary">Register</Button>}
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
