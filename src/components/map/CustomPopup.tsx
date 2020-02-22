import React from "react";
import styled from "styled-components";
import { PlanetProperties } from "../../interfaces/planet";
import { findFactionForPlanetWithName } from "../../utils/planets";
import PlanetData from "../PlanetData";

const AlliancePopUp = styled.div`
  background: #3f1a1a;
  color: #91aeb3;
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
  padding: 10px;
`;

const EmpirePopUp = styled.div`
  background: white;
  color: #333;
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
  padding: 10px;
`;

const HuttPopUp = styled.div`
  background: #232d16;
  color: #cbbfbb;
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
  padding: 10px;
`;

const UnalliedPopUp = styled.div`
  background: #d6d6d6;
  color: #252525;
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
  padding: 10px;
`;

export const factionSpecificPopup = (planetData: PlanetProperties) => {
  const data = <PlanetData {...planetData} />;

  switch (findFactionForPlanetWithName(planetData.name).factionName) {
    case "Alliance":
      return <AlliancePopUp>{data}</AlliancePopUp>;
    case "Empire":
      return <EmpirePopUp>{data}</EmpirePopUp>;
    case "Neutral/Hutt":
      return <HuttPopUp>{data}</HuttPopUp>;
    default:
      return <UnalliedPopUp>{data}</UnalliedPopUp>;
  }
};
