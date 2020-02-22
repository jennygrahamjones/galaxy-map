import React from "react";
import styled from "styled-components";

import { PlanetProperties } from "../../interfaces/planet";
import { findFactionForPlanetWithName } from "../../utils/planets";
import { colours } from "../../utils/theme";
import PlanetData from "../PlanetData";

const AlliancePopUp = styled.div`
  background: ${colours.popup.backgrounds.alliance};
  color: ${colours.popup.text.alliance};
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
  padding: 10px;
`;

const EmpirePopUp = styled.div`
  background: ${colours.popup.backgrounds.empire};
  color: ${colours.popup.text.empire};
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
  padding: 10px;
`;

const HuttPopUp = styled.div`
  background: ${colours.popup.backgrounds.hutt};
  color: ${colours.popup.text.hutt};
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
  padding: 10px;
`;

const UnalliedPopUp = styled.div`
  background: ${colours.popup.backgrounds.neutral};
  color: ${colours.popup.text.neutral};
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
