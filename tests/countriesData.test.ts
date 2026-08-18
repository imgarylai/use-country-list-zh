import { countries } from '../src/data/countries';

describe('countries data', () => {
  it('每個中文名都是唯一的', () => {
    const seen = new Map<string, string>();
    for (const c of countries) {
      expect(seen.get(c.nameZh)).toBeUndefined();
      seen.set(c.nameZh, c.code);
    }
  });

  it('國家清單快照', () => {
    expect(countries.map((c) => `${c.code} ${c.nameZh}`)).toMatchSnapshot();
  });
});
