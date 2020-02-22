import factionPlanets from "../data/factionPlanets.json";
import factionSectors from "../data/factionSectors.json";
import planets from "../data/planets.json";
import planetsGeo from "../data/planetsGeo.json";
import missingPlanets from "../data/missingPlanets.json";
import { Planet } from "../interfaces/planet.js";
import { PRIMARY, UNKNOWN, SECONDARY } from "./constants";

export const allPlanets = () => {
  const incompletePlanets = missingPlanets.features as Planet[];
  const completePlanets = planetsGeo.features as Planet[];
  return completePlanets.concat(incompletePlanets);
};

export const coordinatesForPlanet = name => {
  return allPlanets().find(x => x.properties.name === name).geometry
    .coordinates;
};

const getDataForPlanetWithName = (name: string) => {
  return allPlanets()
    .map(planet => planet.properties)
    .filter(property => property.name === name)[0];
};

const findFactionForPlanetWithName = (name: string) => {
  const planetData = getDataForPlanetWithName(name);

  const planetFaction = factionPlanets.find(
    faction => faction.planets.includes(name) && faction.type === PRIMARY
  );
  const sectorFaction = factionSectors.find(sector =>
    sector.sectors.includes(planetData.sector)
  );

  return planetFaction
    ? { factionName: planetFaction.factionName, colour: planetFaction.colour }
    : sectorFaction
    ? { factionName: sectorFaction.factionName, colour: sectorFaction.colour }
    : { factionName: UNKNOWN, colour: "black" };
};

const findSubFactionsForPlanetWithName = (name: string) => {
  const factions = factionPlanets.filter(
    faction => faction.planets.includes(name) && faction.type === SECONDARY
  );
  return factions ? factions : [];
};

const featuresOfPlanet = (name: string) => {
  const planet = planets.find(planet => planet.name === name);
  return planet
    ? planet
    : { climate: UNKNOWN, terrain: UNKNOWN, population: UNKNOWN };
};

export const isFactionCapitol = name => {
  const faction = factionPlanets.find(
    faction => faction.planets.includes(name) && faction.type === PRIMARY
  );
  return faction ? faction.capitol === name : false;
};

export {
  getDataForPlanetWithName,
  findFactionForPlanetWithName,
  featuresOfPlanet,
  findSubFactionsForPlanetWithName
};
