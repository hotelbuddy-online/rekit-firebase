import {
  DATA_LOAD,
} from '../../../../src/features/data/redux/constants';

import {
  load,
  reducer,
} from '../../../../src/features/data/redux/load';

describe('data/redux/load', () => {
  it('returns correct action by load', () => {
    expect(load()).toHaveProperty('type', DATA_LOAD);
  });

  it('handles action type DATA_LOAD correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: DATA_LOAD }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
