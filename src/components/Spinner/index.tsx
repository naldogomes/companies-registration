import React from "react";
import styled from "styled-components";
import { StyledSpinner } from "./styles";

export type SpinnerProps = {
  size?: string;
  color?: string;
};

const Spinner = ({ size, color }: SpinnerProps) => (
  <StyledSpinner viewBox="0 0 50 50" size={size} color={color}>
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="4"
    />
  </StyledSpinner>
);

export default Spinner;
