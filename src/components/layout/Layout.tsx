import React, { Fragment } from "react";

import Footer from "./Footer";
import Navigation from "./Navigation";

import classes from "./Layout.module.css";

type Props = { children: React.ReactNode };

const Layout: React.FC<Props> = (props) => {
  return (
    <Fragment>
      <Navigation />
      <main className={classes.main}>{props.children}</main>;
      <Footer />
    </Fragment>
  );
};

export default Layout;
