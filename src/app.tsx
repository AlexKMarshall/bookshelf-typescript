/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";

import { Logo } from "components/logo";
import { Button } from "components/lib";
import { LoginForm, FormData } from "components/login-form";
import { Modal, ModalContents, ModalOpenButton } from "components/modal";
import { GlobalStyles } from "components/global-styles";
import { Cover, Stack, Center, Cluster } from "components/layout";

type DialogType = "register" | "login";

const App = () => {
  const handleSubmit = (type: DialogType) => (formData: FormData) => {
    console.log(type, formData);
  };

  return (
    <React.Fragment>
      <GlobalStyles />
      <Cover
        content={
          <Center>
            <Stack>
              <Center intrinsicCentering={true}>
                <Logo height="80" width="80" />
              </Center>
              <Center intrinsicCentering={true}>
                <h1>Bookshelf</h1>
              </Center>
              <Cluster justifyContent="center">
                <div>
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
                    <ModalContents
                      aria-label="Registration form"
                      title="Register"
                    >
                      <LoginForm
                        onSubmit={handleSubmit("register")}
                        submitButton={
                          <Button variant="secondary">Register</Button>
                        }
                      />
                    </ModalContents>
                  </Modal>
                </div>
              </Cluster>
            </Stack>
          </Center>
        }
      />
      {/* </div> */}
    </React.Fragment>
  );
};

export { App };
