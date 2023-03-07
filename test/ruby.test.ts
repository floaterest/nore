import { describe, it, expect } from 'vitest';
import { extract } from '../src/lib/ruby';

describe('ruby injection', () => {
    it.concurrent('prefix and suffix', async () => {
        const actual = extract('お知らせ', 'おしらせ');
        expect(actual).toStrictEqual(['お', ['知', 'し'], 'らせ']);
    });
});
