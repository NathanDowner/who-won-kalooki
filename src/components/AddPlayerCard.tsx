import { Player } from '@/models/player.interface';
import React, { useRef, useState } from 'react';
import defaultUserImg from '@/assets/default-user.svg';

interface Props {
  player: Player;
  onChange: (player: Player) => void;
}

const AddPlayerCard = ({ player, onChange }: Props) => {
  const [name, setName] = useState(player.name);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onChange({ ...player, name });
    inputRef.current?.blur();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex gap-4 items-center border-4 text-xl border-gray-700 p-3 rounded-md`}
    >
      <img
        src={player.imgUrl ?? defaultUserImg}
        className="border-gray-700 border-4 rounded-full w-14 h-14"
      />
      <div className="flex flex-col items-start">
        <input
          ref={inputRef}
          type="text"
          name="name"
          disabled={player.userName !== undefined}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Player name"
          className="input input-ghost -ml-1 pl-0 flex-1 text-xl disabled:border-none disabled:bg-transparent"
        />
        {player.userName && (
          <small className="text-gray-400 italic">@{player.userName}</small>
        )}
      </div>
    </form>
  );
};

export default AddPlayerCard;
