import planetsGeo from "../data/planetsGeo.json";
import factionPlanets from "../data/factionPlanets.json";
import planets from "../data/planets.json";

const UNKNOWN = "Unknown";

const fullListOfPlanetNames = planetsGeo.features
  .map(x => x.properties.name)
  .filter(name => name !== null);

const getDataForPlanetWithName = (name: string) => {
  return planetsGeo.features
    .map(planet => planet.properties)
    .filter(property => property.name === name)[0];
};

const findFactionForPlanetWithName = (name: string) => {
  const faction = factionPlanets.find(faction =>
    faction.planets.includes(name)
  );
  return faction
    ? { factionName: faction.factionName, colour: faction.colour }
    : { factionName: "Unallied", colour: "black" };
};

const featuresOfPlanet = (name: string) => {
  const planet = planets.find(planet => planet.name === name);
  return planet
    ? planet
    : { climate: UNKNOWN, terrain: UNKNOWN, population: UNKNOWN };
};

export {
  getDataForPlanetWithName,
  fullListOfPlanetNames,
  findFactionForPlanetWithName,
  featuresOfPlanet
};
