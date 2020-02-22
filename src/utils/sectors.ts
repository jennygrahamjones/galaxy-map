import factionSectors from "../data/factionSectors.json";

export const sectorColourByFaction = (sector: string) => {
  const faction = factionSectors.find(f => {
    return f.sectors.includes(sector);
  });
  return faction && faction.colour ? faction.colour : "#4a83ec";
};

export const sectorFaction = (sector: string) => {
  const faction = factionSectors.find(f => {
    return f.sectors.includes(sector);
  });
  return faction && faction.factionName ? faction.factionName : undefined;
};
