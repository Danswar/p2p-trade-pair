import React, { ReactNode, FC } from "react";
import { GlobalStyles } from "@mui/styled-engine";

const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <React.Fragment>
    <GlobalStyles
      styles={{
        "*": { boxSizing: "border-box" },
        body: { margin: 0 },
        "#root": {
          background: "#fcfbfb"
        }
      }}
    />
    {children}
  </React.Fragment>
);

export default Layout;
