import {
  DATA_SET_AUTH,
} from '../../../../src/features/data/redux/constants';

import {
  setAuth,
  reducer,
} from '../../../../src/features/data/redux/setAuth';

describe('data/redux/setAuth', () => {
  it('returns correct action by setAuth', () => {
    expect(setAuth()).toHaveProperty('type', DATA_SET_AUTH);
  });

  it('handles action type DATA_SET_AUTH correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: DATA_SET_AUTH }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
