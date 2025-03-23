import { Container } from "@mui/material";
import React, { Suspense } from "react";

import Header from "./Header.tsx";

interface LayoutProps {
  Page: React.LazyExoticComponent<() => JSX.Element>;
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <>
      <Header />
      <Container component={"main"} sx={{ p: 2 }}>
        <Suspense fallback={null}>
          <props.Page />
        </Suspense>
      </Container>
    </>
  );
};

export default Layout;
