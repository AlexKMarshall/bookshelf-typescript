/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled/macro";
import React from "react";

import * as colors from "styles/colors";

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
  ({ size = 1 }: StackPropTypes) => ({
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
  space = 1,
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
  ({ space = 1 }: ClusterPropTypes) => ({
    "> *": { margin: `calc(var(--s${space}) / 2 * -1)` },
    "> * > *": {
      margin: `calc(var(--s${space}) / 2)`,
    },
  })
);

type BoxPropTypes = {
  padding?: number;
  borderWidth?: number | string;
  backgroundColor?: string;
  color?: string;
};

const Box = styled.div(
  ({ padding = 1 }: BoxPropTypes) => ({
    padding: `var(--s${padding})`,
  }),
  ({ borderWidth = 1 }: BoxPropTypes) => {
    if (borderWidth === 0) {
      return {
        border: "0 solid",
        outline: "1px solid transparent",
        outlineOffset: "-1px",
      };
    } else if (typeof borderWidth === "number") {
      return {
        border: `${borderWidth}px solid`,
      };
    } else {
      return { boder: `${borderWidth} solid` };
    }
  },
  ({ backgroundColor = colors.base, color = colors.text }: BoxPropTypes) => ({
    backgroundColor,
    color,
    "> *": {
      color: "inherit",
    },
  })
);

const Imposter = styled.div({
  position: "absolute",
  top: "50%",
  left: "50%",
  "--scaleX": 2,
  "--scaleY": 2,
  transform: "translate(-50%, -50%) scale(var(--scaleX), var(--scaleY))",
  "--margin": "var(--s1)",
  overflow: "auto",
  maxWidth: "calc(100% - (var(--margin) * 2))",
  maxHeight: "calc(100% - (var(--margin) * 2))",
});

export { Stack, Cover, Center, Cluster, Box, Imposter };
