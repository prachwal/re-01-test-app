import counterSlice, {
  increment,
  decrement,
  incrementByAmount,
  setCounter,
} from './counterSlice';

describe('counterSlice', () => {
  const reducer = counterSlice;

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' } as { type: string })).toEqual({
      value: 0,
    });
  });

  it('should handle increment', () => {
    const state = { value: 0 };
    const action = increment();
    const result = reducer(state, action);
    expect(result).toEqual({ value: 1 });
  });

  it('should handle decrement', () => {
    const state = { value: 1 };
    const action = decrement();
    const result = reducer(state, action);
    expect(result).toEqual({ value: 0 });
  });

  it('should handle incrementByAmount', () => {
    const state = { value: 0 };
    const action = incrementByAmount(5);
    const result = reducer(state, action);
    expect(result).toEqual({ value: 5 });
  });

  it('should handle setCounter', () => {
    const state = { value: 0 };
    const action = setCounter(10);
    const result = reducer(state, action);
    expect(result).toEqual({ value: 10 });
  });
});
