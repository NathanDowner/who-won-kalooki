import { useEffect, useMemo, useState } from 'react';
import { evaluate as ev } from 'mathjs';
import KeypadKey from './KeypadKey';
import { removeLeadingZero } from '@/utils';

interface Props {
  initialValue: string;
  onClose: (value: string) => void;
  onChange?: (value: string) => void;
}

const LEFT_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const Keypad = ({ initialValue, onClose, onChange }: Props) => {
  const [value, setValue] = useState('');

  const isEvaluating = useMemo(
    () => ['+', '-', '*'].some((operator) => value.includes(operator)),
    [value],
  );

  const addDigit = (digit: string) =>
    setValue((prev) => removeLeadingZero(prev + digit));

  const deleteDigit = () => {
    if (value.length > 1) {
      return setValue((prev) => prev.slice(0, -1));
    }

    clear();
  };

  const clear = () => setValue('0');

  const evaluate = () => {
    const answer = ev(value);
    setValue(String(answer));
    if (onChange) {
      onChange(value);
    }
  };

  const handleClose = () => {
    onClose(value);
    setValue('0');
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className="p-4 w-screen bg-white border-black border-4 border-b-0 rounded-t-2xl shadow-lg">
      {/* Display */}
      <div className="bg-gray-200 mb-4 rounded-lg px-2 py-1 font-mono text-3xl">
        {value}
      </div>

      <div className="flex gap-3 w-full">
        <div className="grid grid-cols-3 grid-rows-4 gap-2 w-4/6">
          {LEFT_KEYS.map((key) => (
            <KeypadKey value={key} onClick={() => addDigit(key)} key={key} />
          ))}
          <KeypadKey value="AC" onClick={() => clear()} />
          <KeypadKey value="0" onClick={() => addDigit('0')} />
          <KeypadKey value="del" onClick={() => deleteDigit()} />
        </div>

        <div className="grid gap-2 grid-cols-1 grid-rows-4 w-2/6">
          <KeypadKey value="+" onClick={() => addDigit('+')} />
          <KeypadKey value="-" onClick={() => addDigit('-')} />
          <KeypadKey value="*" onClick={() => addDigit('*')} />
          {isEvaluating ? (
            <KeypadKey
              css="bg-gray-200 border-gray-200"
              value="="
              onClick={() => evaluate()}
            />
          ) : (
            <KeypadKey
              css="bg-gray-200 border-gray-200"
              value="Done"
              onClick={handleClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Keypad;
