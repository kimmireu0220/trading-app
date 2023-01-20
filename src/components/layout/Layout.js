import { Fragment } from "react";

import Main from "./Main";
import Footer from "./Footer";
import Navigation from "./Navigation";

const Layout = (props) => {
  return (
    <Fragment>
      <Navigation />
      <Main>{props.children}</Main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
