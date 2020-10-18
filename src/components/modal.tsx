/** @jsx jsx */
import { jsx } from "@emotion/core";

import React, { useContext, useState } from "react";
import { useTransition, animated } from "react-spring";

import { DialogProps, DialogOverlay } from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";
import { CircleButton, DialogContent } from "./lib";

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

const AnimatedDialogContent = animated(DialogContent);
const AnimatedDialogOverlay = animated(DialogOverlay);

const ModalContentBase: React.FC<DialogProps> = (props) => {
  const { isOpen, setIsOpen } = useModalContext();
  const transitions = useTransition(isOpen, String(isOpen), {
    from: {
      opacity: 0,
      transform: "scale(0)",
    },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0)" },
  });

  return (
    <React.Fragment>
      {transitions.map(({ item, key, props: styles }) => (
        <React.Fragment key={key}>
          {item ? (
            <AnimatedDialogOverlay
              style={{ opacity: styles.opacity }}
              onDismiss={() => setIsOpen(false)}
            >
              <AnimatedDialogContent {...props} style={{ ...styles }} />
            </AnimatedDialogOverlay>
          ) : null}
        </React.Fragment>
      ))}
    </React.Fragment>
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
