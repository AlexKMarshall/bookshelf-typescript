import React from "react";
import { Global, css } from "@emotion/core";

const GlobalStyles = () => {
  return (
    <Global
      styles={css({
        ":root": {
          "--measure": "60ch",
          "--ratio": "1.5",
          "--s-5": "calc(var(--s-4) / var(--ratio))",
          "--s-4": "calc(var(--s-3) / var(--ratio))",
          "--s-3": "calc(var(--s-2) / var(--ratio))",
          "--s-2": "calc(var(--s-1) / var(--ratio))",
          "--s-1": "calc(var(--s1) / var(--ratio))",
          "--s0": "0",
          "--s1": "1rem",
          "--s2": "calc(var(--s1) * var(--ratio))",
          "--s3": "calc(var(--s2) * var(--ratio))",
          "--s4": "calc(var(--s3) * var(--ratio))",
          "--s5": "calc(var(--s4) * var(--ratio))",
        },
        body: {
          lineHeight: "var(--ratio)",
        },
        "*": {
          margin: 0,
        },
      })}
    />
  );
};

export { GlobalStyles };
