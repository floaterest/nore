import { describe, it, expect } from 'vitest';
import { extract } from '../src/lib/ruby';

describe('ruby injection', () => {
    it.concurrent('prefix and suffix', () => {
        const actual = extract('お知らせ', 'おしらせ');
        expect(actual).toStrictEqual(['お', ['知', 'し'], 'らせ']);
    });
    it.concurrent('suffix only', () => {
        const actual = extract('逆さ', 'さかさ');
        expect(actual).toStrictEqual([['逆', 'さか'], 'さ']);
    });
    it.concurrent('prefix only', () => {
        const actual = extract('ご飯', 'ごはん');
        expect(actual).toStrictEqual(['ご', ['飯', 'はん']]);
    });
    it.concurrent('no kana', () => {
        const actual = extract('丁々発止', 'ちょうちょうはっし');
        expect(actual).toStrictEqual([['丁々発止', 'ちょうちょうはっし']]);
    });
    it.concurrent('kana in middle', () => {
        const actual = extract('案の定', 'あんのじょう');
        expect(actual).toStrictEqual([['案', 'あん'], 'の', ['定', 'じょう']]);
    })
});
