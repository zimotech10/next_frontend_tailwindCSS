"use client";

import React, { use } from "react";
import SignUp from "@/components/modals/SignUp";
import useScreen from "@/hooks/useScreen";
import connectBgDesktop from "@/public/images/connect-bg-desktop.png";
import connectBgMobile from "@/public/images/connect-bg-mobile.png";

const SignUpPage = () => {
  const isMobile = useScreen();
  return <SignUp />;
};

export default SignUpPage;
