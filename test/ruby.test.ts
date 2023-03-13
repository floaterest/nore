import { describe, it, expect } from 'vitest';
import { extract } from '../src/lib/ruby';

describe('ruby injection', () => {
    it.concurrent('prefix and suffix', () => {
        const actual = extract('お知らせ', 'おしらせ');
        expect(actual).toStrictEqual(['お', ['知', 'し'], 'らせ']);
    });
    it.concurrent('suffix only', () => {
        const actual = extract('輝かしい', 'かがやかしい');
        expect(actual).toStrictEqual([['輝', 'かがや'], 'かしい']);
    });
    it.concurrent('prefix only', () => {
        const actual = extract('ご存知', 'ごぞんじ');
        expect(actual).toStrictEqual(['ご', ['存知', 'ぞんじ']]);
    });
    it.concurrent('no prefix and no suffix', () => {
        const actual = extract('丁々発止', 'ちょうちょうはっし');
        expect(actual).toStrictEqual([['丁々発止', 'ちょうちょうはっし']]);
    });
});
