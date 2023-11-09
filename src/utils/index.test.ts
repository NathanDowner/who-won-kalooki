import { describe, it, expect } from 'vitest';
import { Role } from '@/models/role.enum';
import { createListName } from '.';
import { Contributor } from '@/models/contributor.interface';

describe('createListName function', () => {
  it('should return the correct list name for a single owner', () => {
    const names: Contributor[] = [
      { name: 'John Doe', role: Role.OWNER, email: 'jdoe@gmail.com' },
    ];
    const listName = createListName(names);
    expect(listName).toEqual("John's List");
  });
});
