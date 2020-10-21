import React from "react";
import styled from "@emotion/styled/macro";
import { keyframes } from "@emotion/core";
import "@reach/dialog/styles.css";
import {
  Dialog as ReachDialog,
  DialogContent as ReachDialogContent,
} from "@reach/dialog";
import { IconType } from "react-icons";
import { FaSpinner } from "react-icons/fa";
import * as colors from "styles/colors";
import * as mq from "styles/media-queries";

const buttonVariants = {
  primary: {
    background: colors.indigo,
    color: colors.base,
  },
  secondary: {
    background: colors.gray,
    color: colors.text,
  },
};

type ButtonPropTypes = {
  variant?: keyof typeof buttonVariants;
};

const Button = styled.button(
  {
    padding: "10px 15px",
    border: "0",
    lineHeight: "1",
    borderRadius: "3px",
  },
  ({ variant = "primary" }: ButtonPropTypes) => buttonVariants[variant]
);

const Input = styled.input({
  borderRadius: "3px",
  border: `1px solid ${colors.gray10}`,
  background: colors.gray10,
  padding: "8px 12px",
});

const FormGroup = styled.div({
  display: "flex",
  flexDirection: "column",
});

const CircleButton = styled.button({
  borderRadius: "30px",
  padding: "0",
  width: "40px",
  height: "40px",
  lineHeight: "1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: colors.base,
  color: colors.text,
  border: `1px solid ${colors.gray10}`,
  cursor: "pointer",
});

const Dialog = styled(ReachDialog)({
  maxWidth: "450px",
  borderRadius: "3px",
  paddingBottom: "3.5em",
  boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.2)",
  margin: "20vh auto",
  [mq.small]: {
    width: "100%",
    margin: "10vh auto",
  },
});

const DialogContent = styled(ReachDialogContent)({
  maxWidth: "450px",
  borderRadius: "3px",
  paddingBottom: "3.5em",
  boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.2)",
  margin: "20vh auto",
  [mq.small]: {
    width: "100%",
    margin: "10vh auto",
  },
});

const spin = keyframes({
  from: {
    transform: "rotate(0deg)",
  },
  to: {
    transform: "rotate(359deg)",
  },
});

const Spinner: IconType = ({
  "aria-label": ariaLabel = "loading",
  ...props
}) => {
  const AnimatedSpinner = styled(FaSpinner)({
    animation: `${spin} 1s linear infinite`,
  });
  return <AnimatedSpinner aria-label={ariaLabel} {...props} />;
};

const BookListUL = styled.ul({
  listStyle: "none",
  padding: "0",
  display: "grid",
  gridTemplateRows: "repeat(auto-fill, minmax(100px, 1fr))",
  gridGap: "1em",
});

export {
  Button,
  CircleButton,
  Input,
  FormGroup,
  Dialog,
  DialogContent,
  Spinner,
  BookListUL,
};
