import React from "react";
import FemaleBack from "../BodyMap/FemaleBack";
import FemaleFront from "../BodyMap/FemaleFront";
import MaleFront from "../BodyMap/MaleFront";
import MaleBack from "../BodyMap/MaleBack";

export const BodyMap = ({
  gender,
  view,
  className,
  recentMuscles,
  oldMuscles,
}) => {
  // Renderiza el SVG correcto dependiendo del género y vista
  const renderSVGSource = () => {
    if (gender === "Femenino" && view === "front")
      return (
        <FemaleFront
          className={className}
          recentMuscles={recentMuscles}
          oldMuscles={oldMuscles}
        />
      );
    if (gender === "Femenino" && view === "back")
      return (
        <FemaleBack
          className={className}
          recentMuscles={recentMuscles}
          oldMuscles={oldMuscles}
        />
      );
    if (view === "front")
      return (
        <MaleFront
          className={className}
          recentMuscles={recentMuscles}
          oldMuscles={oldMuscles}
        />
      );
    return (
      <MaleBack
        className={className}
        recentMuscles={recentMuscles}
        oldMuscles={oldMuscles}
      />
    );
  };

  return <>{renderSVGSource()}</>;
};
