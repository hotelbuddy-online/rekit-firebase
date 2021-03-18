import {
  DATA_SAVE,
} from '../../../../src/features/data/redux/constants';

import {
  save,
  reducer,
} from '../../../../src/features/data/redux/save';

describe('data/redux/save', () => {
  it('returns correct action by save', () => {
    expect(save()).toHaveProperty('type', DATA_SAVE);
  });

  it('handles action type DATA_SAVE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: DATA_SAVE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
