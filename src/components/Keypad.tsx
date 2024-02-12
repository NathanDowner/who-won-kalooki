import React, { useState } from 'react';

interface Props {
  initialValue: number;
}

const LEFT_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'AC', '0'];
const RIGHT_KEYS = ['+', '-', 'Done'];

const Keypad = ({ initialValue }: Props) => {
  const [display, setDisplay] = useState('0');
  return (
    <div className="p-4 w-full border-black border-4 rounded-2xl shadow-md">
      {/* Display */}
      <div className="bg-gray-200 mb-4 rounded-lg px-2 py-1 font-mono text-3xl">
        {display}
      </div>

      <div className="flex gap-3 w-full">
        <div className="grid grid-cols-3 grid-rows-4 gap-2 w-4/6">
          {LEFT_KEYS.map((key) => (
            <button
              className="py-4 border border-black rounded-md grid place-items-center"
              key={key}
            >
              {key}
            </button>
          ))}
          <button className="py-4 border border-black rounded-md grid place-items-center">
            del
          </button>
        </div>
        <div className="grid gap-2 grid-cols-1 grid-rows-4 w-2/6">
          {RIGHT_KEYS.map((operation) => (
            <button
              className="py-4 border border-black rounded-md grid place-items-center last:row-span-2"
              key={operation}
            >
              {operation}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Keypad;
