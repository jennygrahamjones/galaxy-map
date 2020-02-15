import factionPlanets from "../data/factionPlanets.json";
import planets from "../data/planets.json";
import planetsGeo from "../data/planetsGeo.json";
import missingPlanets from "../data/missingPlanets.json";
import { Planet } from "../interfaces/planet.js";

const UNKNOWN = "Unknown";

export const allPlanets = () => {
  const incompletePlanets = missingPlanets.features as Planet[];
  const completePlanets = planetsGeo.features as Planet[];
  return completePlanets.concat(incompletePlanets);
};

export const coordinatesForPlanet = name => {
  return allPlanets().find(x => x.properties.name === name).geometry
    .coordinates;
};

const fullListOfPlanetNames = planetsGeo.features
  .map(x => x.properties.name)
  .filter(name => name !== null);

const getDataForPlanetWithName = (name: string) => {
  return allPlanets()
    .map(planet => planet.properties)
    .filter(property => property.name === name)[0];
};

const findFactionForPlanetWithName = (name: string) => {
  const faction = factionPlanets.find(
    faction => faction.planets.includes(name) && faction.type === "primary"
  );
  return faction
    ? { factionName: faction.factionName, colour: faction.colour }
    : { factionName: "Unallied", colour: "black" };
};

const findSubFactionsForPlanetWithName = (name: string) => {
  const factions = factionPlanets.filter(
    faction => faction.planets.includes(name) && faction.type === "secondary"
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
    faction => faction.planets.includes(name) && faction.type === "primary"
  );
  return faction ? faction.capitol === name : false;
};

export {
  getDataForPlanetWithName,
  fullListOfPlanetNames,
  findFactionForPlanetWithName,
  featuresOfPlanet,
  findSubFactionsForPlanetWithName
};
