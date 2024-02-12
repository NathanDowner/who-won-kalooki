import React, { useReducer } from 'react';
import KeypadKey from './KeypadKey';
import { removeLeadingZero } from '@/utils';

interface Props {
  initialValue: number;
}

const LEFT_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const RIGHT_KEYS = ['+', '-', 'Done'];

enum ActionType {
  ADD_DIGIT = 'add-digit',
  CLEAR = 'clear',
  DELETE_DIGIT = 'delete-digit',
  CHOOSE_OPERATION = 'choose-operation',
  EVALUATE = 'evaluate',
}

interface Action {
  type: ActionType;
  payload?: string;
}

interface State {
  currentOperand: string;
  previousOperand: string;
  operation: string;
}

type CalculatorReducer = (state: State, action: Action) => State;

const initialState: State = {
  currentOperand: '0',
  previousOperand: '',
  operation: '',
};

const calculatorReducer: CalculatorReducer = (state, { type, payload }) => {
  switch (type) {
    case ActionType.ADD_DIGIT:
      return {
        ...state,
        currentOperand: removeLeadingZero((state.currentOperand += payload)),
      };

    case ActionType.DELETE_DIGIT:
      if (state.currentOperand.length > 1) {
        return {
          ...state,
          currentOperand: state.currentOperand.slice(0, -1),
        };
      }
      return { ...state, currentOperand: '0' };

    case ActionType.CLEAR:
      return {
        ...state,
        currentOperand: '0',
        previousOperand: '',
        operation: '',
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

const Keypad = ({ initialValue }: Props) => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  return (
    <div className="p-4 w-full border-black border-4 rounded-2xl shadow-md">
      {/* Display */}
      <div className="bg-gray-200 mb-4 rounded-lg px-2 py-1 font-mono text-3xl">
        {state.previousOperand} {state.operation} {state.currentOperand}
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
