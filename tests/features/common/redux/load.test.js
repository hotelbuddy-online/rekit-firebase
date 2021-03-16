import {
  COMMON_LOAD,
} from '../../../../src/features/common/redux/constants';

import {
  load,
  reducer,
} from '../../../../src/features/common/redux/load';

describe('common/redux/load', () => {
  it('returns correct action by load', () => {
    expect(load()).toHaveProperty('type', COMMON_LOAD);
  });

  it('handles action type COMMON_LOAD correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_LOAD }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
