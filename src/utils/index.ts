import { Contributor } from '@/models/contributor.interface';
import { Role } from '@/models/role.enum';

export const createUUID = () => {
  return crypto.randomUUID();
};

export const createListName = (names: Contributor[]) => {
  const ownerFirstNames = names
    .filter((contributor) => contributor.role === Role.OWNER)
    .map((contributor) => contributor.name.split(' ')[0]);

  if (ownerFirstNames.length === 0) {
    return '';
  }

  if (ownerFirstNames.length === 1) {
    return `${ownerFirstNames[0]}'s List`;
  }

  if (ownerFirstNames.length === 2) {
    return `${ownerFirstNames[0]} and ${ownerFirstNames[1]}'s List`;
  }

  const lastOwnerName = ownerFirstNames.pop();
  const ownerNamesString = ownerFirstNames.join(', ');
  return `${ownerNamesString}, and ${lastOwnerName}'s List`;
};

export const formatName = (name: string) => {
  const nameParts = name.split(' ');
  if (nameParts.length === 2) {
    return nameParts[0];
  }
  return name;
};

export const formatRound = (round: string) => {
  return round.split('').join('-');
};
