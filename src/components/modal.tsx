/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled/macro";

import React, { useContext, useRef, useState } from "react";
import { useTransition, animated, useSpring, useChain } from "react-spring";

import { DialogProps, DialogOverlay, DialogContent } from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";
import { CircleButton } from "./lib";
import { Box, Cluster, Stack, Imposter } from "components/layout";
import { usePrefersReducedMotion } from "hooks/prefers-reduced-motion";

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

const StyledDialogContent: React.FC<DialogProps & { scale?: any }> = ({
  children,
  scale = 1,
  ...props
}) => {
  const DialogContentCSSReset = styled(DialogContent)({
    width: "unset",
    margin: "unset",
    background: "unset",
    padding: "unset",
    outline: "unset",
  });

  return (
    <Imposter
      style={{ ["--scaleX" as any]: scale, ["--scaleY" as any]: scale }}
    >
      <DialogContentCSSReset {...props}>
        <Box
          padding={2}
          borderWidth={0}
          css={{
            borderRadius: "0.5rem",
            boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.2)",
            pointerEvents: "auto",
          }}
        >
          {children}
        </Box>
      </DialogContentCSSReset>
    </Imposter>
  );
};

const AnimatedDialogContentContainer = animated(StyledDialogContent);
const AnimatedDialogOverlay = animated(DialogOverlay);

const ModalDefaultContent = ({ title }: { title: string }) => (
  <React.Fragment>
    <Cluster justifyContent="flex-end">
      <div>
        <ModalDismissButton>
          <CircleButton>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </CircleButton>
        </ModalDismissButton>
      </div>
    </Cluster>
    <h3 css={{ textAlign: "center" }}>{title}</h3>
  </React.Fragment>
);

type ModalContentsProps = { title: string } & DialogProps;

const ModalContents: React.FC<ModalContentsProps> = ({
  title,
  children,
  ...props
}) => {
  const { isOpen, setIsOpen } = useModalContext();
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<any>();
  const contentsRef = useRef<any>();
  const transitions = useTransition(isOpen, null, {
    from: {
      opacity: 0,
      scale: 0,
    },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
    immediate: prefersReducedMotion,
    config: {
      tension: 300,
    },
    ref: containerRef,
  });

  const spring = useSpring({
    opacity: isOpen ? 1 : 0,
    config: {
      duration: 200,
    },
    ref: contentsRef,
  });

  useChain(isOpen ? [containerRef, contentsRef] : [contentsRef, containerRef]);

  return (
    <React.Fragment>
      {transitions.map(({ item, key, props: styles }) => (
        <React.Fragment key={key}>
          {item ? (
            <AnimatedDialogOverlay
              style={{ opacity: styles.opacity }}
              onDismiss={() => setIsOpen(false)}
            >
              <AnimatedDialogContentContainer {...props} scale={styles.scale}>
                <animated.div style={spring}>
                  <Stack>
                    <ModalDefaultContent title={title} />
                    {children}
                  </Stack>
                </animated.div>
              </AnimatedDialogContentContainer>
            </AnimatedDialogOverlay>
          ) : null}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export { Modal, ModalContents, ModalOpenButton, ModalDismissButton };
