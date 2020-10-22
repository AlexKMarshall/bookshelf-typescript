/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled/macro";
import React from "react";

type StackPropTypes = {
  size?: number;
};

const Stack = styled.div(
  {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    "> *": {
      marginTop: 0,
      marginBottom: 0,
    },
  },
  ({ size = 0 }: StackPropTypes) => ({
    "> * + *": {
      marginTop: `var(--s${size})`,
    },
  })
);

type CoverPropTypes = {
  header?: React.ReactElement;
  content: React.ReactElement;
  footer?: React.ReactElement;
  minHeight?: string;
  space?: number;
  hasPadding?: boolean;
};

const Cover = ({
  header,
  content,
  footer,
  minHeight = "100vh",
  space = 0,
  hasPadding = true,
}: CoverPropTypes) => {
  const StyledCover = styled.div({
    display: "flex",
    flexDirection: "column",
    minHeight,
    padding: hasPadding ? `var(--s${space})` : 0,
    "> *": {
      marginTop: `var(--s${space})`,
      marginBottom: `var(--s${space})`,
    },
    "> .header": {
      marginTop: 0,
    },
    "> .footer": {
      marginBottom: 0,
    },
    "> .content": {
      marginTop: "auto",
      marginBottom: "auto",
    },
  });

  return (
    <StyledCover>
      {header ? React.cloneElement(header, { className: "header" }) : null}
      {React.cloneElement(content, { className: "content" })}
      {footer ? React.cloneElement(footer, { className: "footer" }) : null}
    </StyledCover>
  );
};

type CenterPropTypes = {
  maxWidth?: string;
  isTextCentered?: boolean;
  gutterWidth?: number;
  intrinsicCentering?: boolean;
};
const Center = styled.div(
  {
    boxSizing: "content-box",
    marginLeft: "auto",
    marginRight: "auto",
  },
  ({ maxWidth = "var(--measure)" }: CenterPropTypes) => ({ maxWidth }),
  ({ isTextCentered = false }: CenterPropTypes) =>
    isTextCentered ? { textAlign: "center" } : undefined,
  ({ gutterWidth }: CenterPropTypes) =>
    gutterWidth !== undefined
      ? {
          paddingLeft: `var(--s${gutterWidth})`,
          paddingRight: `var(--s${gutterWidth})`,
        }
      : undefined,
  ({ intrinsicCentering = false }: CenterPropTypes) =>
    intrinsicCentering
      ? { display: "flex", flexDirection: "column", alignItems: "center" }
      : undefined
);

type ClusterPropTypes = {
  space?: number;
  justifyContent?: string;
  alignItems?: string;
};

const Cluster = styled.div(
  {
    overflow: "hidden",
    "> *": {
      display: "flex",
      flexWrap: "wrap",
    },
  },
  ({
    justifyContent = "flex-start",
    alignItems = "center",
  }: ClusterPropTypes) => ({ "> *": { justifyContent, alignItems } }),
  ({ space = 0 }: ClusterPropTypes) => ({
    "> *": { margin: `calc(var(--s${space}) / 2 * -1)` },
    "> * > *": {
      margin: `calc(var(--s${space}) / 2)`,
    },
  })
);

export { Stack, Cover, Center, Cluster };
