import React, { useEffect, useReducer } from 'react';
import { evaluate as ev } from 'mathjs';
import KeypadKey from './KeypadKey';
import { removeLeadingZero } from '@/utils';

interface Props {
  initialValue: number;
  onClose: (value: string) => void;
  onChange?: (value: string) => void;
}

const LEFT_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

enum ActionType {
  ADD_DIGIT = 'add-digit',
  CLEAR = 'clear',
  DELETE_DIGIT = 'delete-digit',
  EVALUATE = 'evaluate',
}

interface Action {
  type: ActionType;
  payload?: string;
}

interface State {
  value: string;
  isEvaluating: boolean;
}

type CalculatorReducer = (state: State, action: Action) => State;

const calculatorReducer: CalculatorReducer = (state, { type, payload }) => {
  switch (type) {
    case ActionType.ADD_DIGIT:
      if (state.value === '0' && payload === '0') return state;

      return {
        isEvaluating: true,
        value: removeLeadingZero((state.value += payload)),
      };

    case ActionType.DELETE_DIGIT:
      if (state.value.length > 1) {
        return {
          ...state,
          value: state.value.slice(0, -1),
        };
      }
      return { value: '0', isEvaluating: false };

    case ActionType.CLEAR:
      return {
        isEvaluating: false,
        value: '0',
      };

    case ActionType.EVALUATE:
      return {
        value: ev(state.value),
        isEvaluating: false,
      };

    default:
      return state;
  }
};

//--- Action Creators ---//
const addDigit = (digit: string): Action => ({
  type: ActionType.ADD_DIGIT,
  payload: digit,
});

const clearDigit = () => ({ type: ActionType.CLEAR });

const deleteDigit = () => ({ type: ActionType.DELETE_DIGIT });

const evaluate = () => ({
  type: ActionType.EVALUATE,
});

const Keypad = ({ initialValue, onClose, onChange }: Props) => {
  const [state, dispatch] = useReducer(calculatorReducer, {
    value: initialValue.toString(),
    isEvaluating: false,
  });

  useEffect(() => {
    if (onChange) {
      onChange(state.value);
    }
  }, [state.value]);

  return (
    <div className="p-4 w-full border-black border-4 rounded-2xl shadow-md">
      {/* Display */}
      <div className="bg-gray-200 mb-4 rounded-lg px-2 py-1 font-mono text-3xl">
        {state.value}
      </div>

      <div className="flex gap-3 w-full">
        <div className="grid grid-cols-3 grid-rows-4 gap-2 w-4/6">
          {LEFT_KEYS.map((key) => (
            <KeypadKey
              value={key}
              onClick={() => dispatch(addDigit(key))}
              key={key}
            />
          ))}
          <KeypadKey value="AC" onClick={() => dispatch(clearDigit())} />
          <KeypadKey value="0" onClick={() => dispatch(addDigit('0'))} />
          <KeypadKey value="del" onClick={() => dispatch(deleteDigit())} />
        </div>

        <div className="grid gap-2 grid-cols-1 grid-rows-4 w-2/6">
          <KeypadKey value="+" onClick={() => dispatch(addDigit('+'))} />
          <KeypadKey value="-" onClick={() => dispatch(addDigit('-'))} />
          <KeypadKey value="*" onClick={() => dispatch(addDigit('*'))} />
          {state.isEvaluating ? (
            <KeypadKey
              css="bg-gray-200 border-gray-200"
              value="="
              onClick={() => dispatch(evaluate())}
            />
          ) : (
            <KeypadKey
              css="bg-gray-200 border-gray-200"
              value="Done"
              onClick={() => onClose(state.value)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Keypad;
