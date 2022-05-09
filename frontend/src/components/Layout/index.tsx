import React, { ReactNode, FC } from "react";
import { GlobalStyles } from "@mui/styled-engine";

const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <React.Fragment>
    <GlobalStyles
      styles={{
        "*": { boxSizing: "border-box" },
        body: { margin: 0 }
      }}
    />
    {children}
  </React.Fragment>
);

export default Layout;
