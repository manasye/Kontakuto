import React from "react";
import { Outlet } from "react-router-dom";
import { LayoutContainer, LayoutContent } from "./index.style";
import Header from "../Header";

export default function Layout() {
  return (
    <LayoutContainer>
      <Header />
      <LayoutContent>
        <Outlet />
      </LayoutContent>
    </LayoutContainer>
  );
}
