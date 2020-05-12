import { rationalize } from "mathjs";

const lagrangeFunction = points => {
  let results = {
    polynom: undefined,
    interpolationPolynomials: []
  };
  let degree = points.x.length;
  let interpolationPolynomials = [];
  let expression = "";
  for (let k = 0; k < degree; k++) {
    let numerator = "";
    let denominator = "";
    for (let j = 0; j < degree; j++) {
      if (j !== k) {
        if (points.x[j] < 0) {
          numerator += "(x+" + -points.x[j] + ")";
          if (points.x[k] === 0) {
            denominator += "(" + points.x[j] + ")";
          } else {
            denominator += "(" + points.x[k] + "+" + -points.x[j] + ")";
          }
        } else if (points.x[j] === 0) {
          numerator += "(x) ";
          if (points.x[k] !== 0) {
            denominator += "(" + points.x[k] + ")";
          }
        } else if (points.x[j] > 0) {
          numerator += "(x-" + points.x[j] + ")";
          if (points.x[k] === 0) {
            denominator += "(" + points.x[j] + ")";
          } else {
            denominator += "(" + points.x[k] + "-" + points.x[j] + ")";
          }
        }
      }
    }
    results.interpolationPolynomials.push("("+ numerator + ")/(" + denominator+")");
  }
  expression = results.interpolationPolynomials.map((pol, index) => {
    return ("(" + points.y[index] + "*" + pol + ")")
  }).join(" + ");
  results.polynom = rationalize(expression).toTex({
    // We get simple polynomials via the rationalize() function
    // e.g. : rationalize("(x-1)(x)") = "x^2 - x"
    parenthesis: "auto", // parenthesis option
    implicit: "show", // how to treat implicit multiplication
  });

  return results;
};

export default lagrangeFunction;
