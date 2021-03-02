import React from "react";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";

const override = css`
  margin: 16px auto;
`;

const Spinner = () => {
  return <BounceLoader color={"#B5B5B5"} size={40} css={override} />;
};

export default Spinner;
