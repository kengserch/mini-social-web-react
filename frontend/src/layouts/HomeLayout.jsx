import React from "react";
import Header from "../components/header";
import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
      <>
          <Header />
          <Outlet />
      </>
  );
};

export default HomeLayout;
