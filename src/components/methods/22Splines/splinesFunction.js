import hasDuplicates from "../../../utils/hasDuplicates";

const splinesFunction = points => {
  let results = {
    polynom: undefined,
    interpolationPolynomials: []
  };
  if(hasDuplicates(points.x)){
    throw Error("x has duplicates, a value of x can only be declared once")
  }
  let degree = points.x.length;
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
        } else if (points.x[j] > 0) {
          numerator += "(x-" + points.x[j] + ")";
          if (points.x[k] === 0) {
            denominator += "(" + points.x[j] + ")";
          } else {
            denominator += "(" + points.x[k] + "-" + points.x[j] + ")";
          }
        } else {
          numerator += "(x)";
          if (points.x[k] !== 0) {
            denominator += "(" + points.x[k] + ")";
          }
        }
      }
    }
    results.interpolationPolynomials.push(
      "(" + numerator + ")/(" + denominator + ")"
    );
  }
  results.polynom = results.interpolationPolynomials
    .map((pol, index) => {
      return "(" + points.y[index] + "*" + pol + ")";
    })
    .join(" + ");
  return results;
};

export default splinesFunction;
