import isSubset from '@tanggram/react-core/util/isSubset';

describe('@tanggram/react-core/util/isSubset', () => {
  test('[1,2] is the subset of [1,2,3]', () => {
    expect(isSubset([1, 2], [1, 2, 3])).toBe(true);
  });
  test('[2,1] is the subset of [1,2,3]', () => {
    expect(isSubset([2, 1], [1, 2, 3])).toBe(true);
  });
  test('[] is the subset of []', () => {
    expect(isSubset([], [])).toBe(true);
  });
  test('[null] is the subset of [null]', () => {
    expect(isSubset([null], [null])).toBe(true);
  });
  test('[undefined] is the subset of [undefined]', () => {
    expect(isSubset([undefined], [undefined])).toBe(true);
  });
  test('Always return false with non array candidate', () => {
    expect(isSubset(1, [1])).toBe(false);
  });
  test('Always return false with non array pool', () => {
    expect(isSubset([1], 1)).toBe(false);
  });
});
