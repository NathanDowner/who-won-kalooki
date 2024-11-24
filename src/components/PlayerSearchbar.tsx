import { useUserSearch } from '@/features/user';
import { UserProfile } from '@/models/user.model';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { useDebouncedValue } from '@mantine/hooks';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface PlayerSearchbarProps {
  onSelectPlayer: (player: UserProfile) => void;
}

const PlayerSearchbar = ({ onSelectPlayer }: PlayerSearchbarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedValue] = useDebouncedValue(searchTerm, 750);
  const { data: users, updateDocument: searchUsers } = useUserSearch();

  useEffect(() => {
    if (debouncedValue) {
      searchUsers(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <div>
      <Combobox
        onChange={(value: UserProfile) => {
          if (value) {
            onSelectPlayer(value);
          }
        }}
        onClose={() => setSearchTerm('')}
      >
        <ComboboxInput
          autoCorrect="false"
          id="player-search"
          type="search"
          className="border-4 border-gray-700 p-3 rounded-md w-full"
          placeholder="e.g. John Doe or j_Doe"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <small className="italic">*Searches is case-sensitive</small>
        <ComboboxOptions
          anchor="bottom"
          className={clsx(
            'w-[var(--input-width)] z-[100] rounded-md border-2 border-gray-700 bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
          )}
        >
          {users.map((user) => (
            <ComboboxOption
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-200 hover:cursor-pointer"
              key={user.id}
              value={user}
            >
              <div className="flex gap-2 items-center">
                <img
                  src={user.imgUrl}
                  className="border-gray-700 border-2 rounded-full w-8 h-8"
                />
                {user.fullName}{' '}
                <span className="italic text-gray-400 group-hover:text-gray-500">
                  @{user.userName}
                </span>
              </div>
            </ComboboxOption>
          ))}
          {debouncedValue && !users.length && (
            <div>No users match search term.</div>
          )}
        </ComboboxOptions>
      </Combobox>
      {/* options  */}
    </div>
  );
};

export default PlayerSearchbar;
