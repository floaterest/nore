import { describe, it, expect } from 'vitest';
import { extract } from '../src/lib/ruby';

describe('ruby injection', () => {
    it.concurrent('prefix and suffix', () => {
        const actual = extract('お知らせ', 'おしらせ');
        expect(actual).toStrictEqual(['お', ['知', 'し'], 'らせ']);
    });
    it.concurrent('suffix only', () => {
        const actual = extract('輝かしい', 'かがやかしい');
        expect(actual).toStrictEqual(['', ['輝', 'かがや'], 'かしい']);
    });
});
