import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import { Title, Subtitle } from "../containers/BigContainer";
import { BorderRadius, Colors, Spacing, Typography } from "../rules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MethodsDashboard = () => {
  const methods = [
    {
      index: 0,
      id: "/methods/function-evaluator",
      theme: "one-var",
      name: "Function evaluator",
    },
    {
      index: 1,
      id: "/methods/incremental-search",
      theme: "one-var",
      name: "Incremental search",
    },
    { index: 2, id: "/methods/bisection", theme: "one-var", name: "Bisection" },
    {
      index: 3,
      id: "/methods/false-position",
      theme: "one-var",
      name: "False position",
    },
    {
      index: 4,
      id: "/methods/fixed-point",
      theme: "one-var",
      name: "Fixed point",
    },
    {
      index: 5,
      id: "/methods/newton-raphson",
      theme: "one-var",
      name: "Newton-Raphson method",
    },
    {
      index: 6,
      id: "/methods/secante",
      theme: "one-var",
      name: "Secant method",
    },
    {
      index: 7,
      id: "/methods/multiple-roots",
      theme: "one-var",
      name: "Multiple roots",
    },
    {
      index: 8,
      id: "/methods/gauss-simple",
      theme: "sys-eq",
      name: "Gaussian elimination (simple)",
    },
    {
      index: 9,
      id: "/methods/gauss-partial",
      theme: "sys-eq",
      name: "Gaussian elimination (partial pivot)",
    },
    {
      index: 10,
      id: "/methods/gauss-total",
      theme: "sys-eq",
      name: "Gaussian elimination (total pivot)",
    },
    {
      index: 11,
      id: "/methods/LU-simple",
      theme: "sys-eq",
      name: "Direct Factorization LU - simple",
    },
    {
      index: 12,
      id: "/methods/LU-partial-pivot",
      theme: "sys-eq",
      name: "Direct Factorization LU - partial",
    },
    { index: 13, id: "/methods/croult", theme: "sys-eq", name: "Croult" },
    { index: 14, id: "/methods/doolittle", theme: "sys-eq", name: "Doolittle" },
    { index: 15, id: "/methods/cholesky", theme: "sys-eq", name: "Cholesky" },
    { index: 16, id: "/methods/jacobi", theme: "sys-eq", name: "Jacobi" },
    {
      index: 17,
      id: "/methods/gauss-seidel",
      theme: "sys-eq",
      name: "Gauss Seidel",
    },
    {
      index: 18,
      id: "/methods/gauss-seidel-SOR",
      theme: "sys-eq",
      name: "Gauss Seidel (SOR)",
    },
    {
      index: 19,
      id: "/methods/vandermonde",
      theme: "interpolation",
      name: "Vandermonde",
    },
    {
      index: 20,
      id: "/methods/newton-interpolation",
      theme: "interpolation",
      name: "Newton (Método de las diferencias divididas)",
    },
    {
      index: 21,
      id: "/methods/lagrange",
      theme: "interpolation",
      name: "Lagrange",
    },
    {
      index: 22,
      id: "/methods/inter-splines-linear",
      theme: "interpolation",
      name: "Splines (linear)",
    },
    {
      index: 23,
      id: "/methods/inter-splines-square",
      theme: "interpolation",
      name: "Splines (quadratic)",
    },
    {
      index: 24,
      id: "/methods/inter-splines-cube",
      theme: "interpolation",
      name: "Splines (cubic)",
    },
  ];
  return (
    <React.Fragment>
      <Title>Methods</Title>
      <Subtitle>30 methods to solve numerical problems</Subtitle>
      <MainContainer>
        <ThemeTitle>
          <FontAwesomeIcon icon={"otter"} />
          Solving equations of one variable
        </ThemeTitle>
        <Theme>
          {methods
            .filter(module => {
              return module.theme === "one-var";
            })
            .map(module => {
              return (
                <ModuleLink key={module.id} to={module.id}>
                  {module.name}
                </ModuleLink>
              );
            })}
        </Theme>
        <ThemeTitle>
          <FontAwesomeIcon icon={"horse-head"} />
          Solution of systems of equations
        </ThemeTitle>
        <Theme>
          {methods
            .filter(module => {
              return module.theme === "sys-eq";
            })
            .map(module => {
              return (
                <ModuleLink key={module.id} to={module.id}>
                  {module.name}
                </ModuleLink>
              );
            })}
        </Theme>
        <ThemeTitle>
          <FontAwesomeIcon icon={"kiwi-bird"} />
          Interpolation
        </ThemeTitle>
        <Theme>
          {methods
            .filter(module => {
              return module.theme === "interpolation";
            })
            .map(module => {
              return (
                <ModuleLink key={module.id} to={module.id}>
                  {module.name}
                </ModuleLink>
              );
            })}
        </Theme>
      </MainContainer>
    </React.Fragment>
  );
};

const ThemeTitle = styled("div")`
  margin-bottom: ${Spacing.lg};
  font-size: ${Typography.subTitle};
  font-weight: 600;
  svg {
    padding: 0 ${Spacing.md} 0 0;
  }
`;

const Theme = styled("div")`
  margin-bottom: ${Spacing.lg};
  display: grid;
  grid-template-columns: 300px 300px 300px 300px;
  grid-column-gap: 25px;
  grid-row-gap: 25px;
  @media (max-width: 1370px) {
    grid-template-columns: 300px 300px 300px;
  }
  @media (max-width: 1080px) {
    grid-template-columns: 300px 300px;
  }
  @media (max-width: 730px) {
    grid-template-columns: 300px;
  }
  justify-items: left;
  align-items: flex-start;
`;

const MainContainer = styled("div")`
  margin: ${Spacing.lg} ${Spacing.xxl};
`;

const ModuleLink = styled(Link)`
  width: 250px;
  padding: ${Spacing.md} ${Spacing.lg};
  border: 2px solid ${Colors.primary.ocean.lighter};
  border-radius: ${BorderRadius.sm};
  &:hover {
    background-color: ${Colors.primary.ocean.darker};
    color: ${Colors.utility.white.default};
    transform: translateY(-3px);
  }
  text-decoration: none;
`;

export default MethodsDashboard;
