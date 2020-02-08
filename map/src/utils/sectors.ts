import factionSectors from "../data/factionSectors.json";

export const sectorColourByFaction = (sector: string) => {
  const faction = factionSectors.find(f => {
    return f.sectors.includes(sector);
  });
  return faction && faction.color ? faction.color : "#4a83ec";
};

export const sectorFaction = (sector: string) => {
  const faction = factionSectors.find(f => {
    return f.sectors.includes(sector);
  });
  return faction && faction.factionName ? faction.factionName : undefined;
};
