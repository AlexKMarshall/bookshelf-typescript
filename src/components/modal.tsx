/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useContext, useState } from "react";

import { DialogProps } from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";
import { CircleButton, Dialog } from "./lib";

type CallbackType = (...args: any[]) => void;

const callAll = (...fns: CallbackType[]) => (...args: any[]) =>
  fns.forEach((fn) => fn && fn(...args));

type ModalContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalContext = React.createContext<ModalContextType | undefined>(
  undefined
);

const Modal: React.FC = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return <ModalContext.Provider value={{ isOpen, setIsOpen }} {...props} />;
};

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "Model compound components cannot be rendered outside the Modal component"
    );
  }
  return context;
};

const ModalDismissButton: React.FC = ({ children: child }) => {
  const { setIsOpen } = useModalContext();

  if (!React.isValidElement(child)) {
    throw new Error(
      "ModalDismissButton must have a valid React Element as its child"
    );
  }

  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props?.onClick),
  });
};

const ModalOpenButton: React.FC = ({ children: child }) => {
  const { setIsOpen } = useModalContext();

  if (!React.isValidElement(child)) {
    throw new Error(
      "ModalOpenButton must have a valid React Element as its child"
    );
  }

  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props?.onClick),
  });
};

const ModalContentBase: React.FC<DialogProps> = (props) => {
  const { isOpen, setIsOpen } = useModalContext();
  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
  );
};

type ModalContentsProps = { title: string } & DialogProps;

const ModalContents: React.FC<ModalContentsProps> = ({
  title,
  children,
  ...props
}) => {
  return (
    <ModalContentBase {...props}>
      <div css={{ display: "flex", justifyContent: "flex-end" }}>
        <ModalDismissButton>
          <CircleButton>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </CircleButton>
        </ModalDismissButton>
      </div>
      <h3 css={{ textAlign: "center", fontSize: "2rem" }}>{title}</h3>
      {children}
    </ModalContentBase>
  );
};

export { Modal, ModalContents, ModalOpenButton, ModalDismissButton };
