# Nore <!-- omit in toc -->
> A PWA app for the Japanese Language (ﾉapanese ﾚanguage)


# Table of Contents <!-- omit in toc -->
- [Ruby](#ruby)
- [Kuromoji](#kuromoji)
- [Programmer's Note](#programmers-note)


# Ruby
> HTML viewer with extra features for the `<ruby>` element

- <img align=center src=/doc/assets/visibility.svg> to toggle `<rt>`
    - e.g. <ruby>乗<rt>の</rt></ruby>れ ⇔ 乗れ
- <img align=center src=/doc/assets/loop.svg> to flip `<rt>` and `<rb>` position
    - e.g. <ruby>乗<rt>の</rt></ruby>れ ⇔ <ruby>の<rt>乗</rt></ruby>れ


# Kuromoji
> Inject furigana using [Kuromoji](https://www.atilika.com/ja/kuromoji/), a Japanese morphological analyzer

- <img align=center src=/doc/assets/code.svg> to redirect output to [Ruby](#ruby)


# Programmer's Note
- routes
    - [`kuromoji.svelte`](/src/routes/kuromoji.svelte)
        - wait until user finishes typing
        - async function in `array.map()`
- lib
    - [`File.svelte`](/src/lib/File.svelte)
        - read file content as string
    - [`LeftRight.svelte`](src/lib/LeftRight.svelte)
        - check if screen is in portrait or landscape mode
    - [`kuro.ts`](src/lib/kuro.ts)
    - separate string into "jpn" and "non-jpn" groups using regex