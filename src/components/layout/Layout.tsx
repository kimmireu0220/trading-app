import { Fragment } from "react";

import Footer from "./Footer";
import Navigation from "./Navigation";

import classes from "./Layout.module.css";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Fragment>
      <Navigation />
      <main className={classes.main}>{children}</main>;
      <Footer />
    </Fragment>
  );
};

export default Layout;
