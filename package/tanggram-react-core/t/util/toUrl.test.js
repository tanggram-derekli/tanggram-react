import toUrl from '@tanggram/react-core/util/toUrl';

describe('@tanggram/react-core/util/toUrl', () => {
  test('Base url "http://www.tanggram.com" with uri "/home" to be "http://www.tanggram.com/home"', () => {
    expect(toUrl("http://www.tanggram.com", "/home")).toBe("http://www.tanggram.com/home");
  });
  test('Base url "http://www.tanggram.com" with uri "home" to be "http://www.tanggram.comhome"', () => {
    expect(toUrl("http://www.tanggram.com", "home")).toBe("http://www.tanggram.comhome");
  });
  test('Base url "http://www.tanggram.com" with uri "http://www.tanggram.com/home" to be "http://www.tanggram.com/home"', () => {
    expect(toUrl("http://www.tanggram.com", "http://www.tanggram.com/home")).toBe("http://www.tanggram.com/home");
  });
  test('Base url "aaa" with uri "/home" to be "aaa/home"', () => {
    expect(toUrl("aaa", "/home")).toBe("aaa/home");
  });
});
