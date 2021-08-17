import { writable } from 'svelte/store';

export const data = writable(
    'ほう、' +
    '<abbr title="delightful">' +
    '<a href="https://www.weblio.jp/content/微笑ましい">微笑ましい</a>' +
    '</abbr>じゃないか',
);
export const output = writable('');
