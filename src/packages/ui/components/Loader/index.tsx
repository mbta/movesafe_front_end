"use client";
import React from "react";
import { LoaderWrapper } from "./styles";

interface LoaderProps {
  loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  return <LoaderWrapper className="loader-wrapper" hidden={!loading} />;
};

export default Loader;
