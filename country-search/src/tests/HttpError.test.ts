import { describe, test, expect, vi } from 'vitest';
import { HttpError } from '../logic/HttpError.ts';

describe('searchCountries', () => {
  test('возвращает пустой массив на 404', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    }));

    const result = await searchCountries('nonexistent', new AbortController().signal);
    expect(result).toEqual([]);
  });

  test('бросает HttpError на 500', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    }));

    await expect(searchCountries('spain', new AbortController().signal))
      .rejects.toThrow(HttpError);
  });

  test('возвращает данные при успехе', async () => {
    const raw = [{ name: 'Spain', capital: 'Madrid', /* ... */ }];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => raw,
    }));

    const result = await searchCountries('spain', new AbortController().signal);
    expect(result).toHaveLength(1);
  });
});