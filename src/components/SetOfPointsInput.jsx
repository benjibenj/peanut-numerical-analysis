import React, { useEffect, useState } from "react";
import { Parameters, Button, TableStyle } from "../containers/BigContainer";
import styled from "styled-components";
import { Spacing } from "../rules";

const SetOfPointsInput = ({ points, setPoints, setMethodState }) => {
  const [nbPoints, setNbPoints] = useState(points.x.length);
  useEffect(() => {
    if (points.x.length < nbPoints) {
      setPoints(() => ({
        x: points.x.concat(0),
        y: points.y.concat(0),
      }));
    } else if (points.x.length > nbPoints) {
      setPoints(() => ({
        x: points.x.slice(0, nbPoints),
        y: points.y.slice(0, nbPoints),
      }));
    }
  }, [nbPoints]);
  const handleSubmit = event => {
    event.preventDefault();
    let tempPoints = {
      x: [],
      y: [],
    };
    for (let i = 0; i < nbPoints; i++) {
      tempPoints.x.push(event.target[i].value);
    }
    for (let j = nbPoints + 1; j < nbPoints * 2 + 1; j++) {
      tempPoints.y.push(event.target[j].value);
    }
    setPoints(tempPoints);
    setMethodState(prevState => ({
      ...prevState,
      points: "fixed",
    }));
  };
  return (
    <CustomParameters>
      <form onSubmit={handleSubmit}>
        <TableStyle>
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>x</strong>
                </td>
                {points.x.map((set, index) => {
                  return (
                    <td key={index}>
                      <input
                        type="number"
                        step={0.01}
                        defaultValue={points.x[index]}
                      />
                    </td>
                  );
                })}
                <td>
                  <button onClick={() => setNbPoints(points.x.length + 1)}>
                    +
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>y</strong>
                </td>
                {points.y.map((set, index) => {
                  return (
                    <td key={index}>
                      <input
                        type="number"
                        step={0.01}
                        defaultValue={points.y[index]}
                      />
                    </td>
                  );
                })}
                <td>
                  <button onClick={() => setNbPoints(points.x.length - 1)}>
                    -
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </TableStyle>
        <Button>{"Save"}</Button>
      </form>
    </CustomParameters>
  );
};

const CustomParameters = styled(Parameters)`
  input {
    padding: 13px 0;
    text-align: center;
    margin: 0px 5px;
    height: 12px;
    width: 50px;
  }
  margin-bottom: ${Spacing.xs};
`;

export default SetOfPointsInput;
