<style>code{font-family: monospace}</style>

# Kashi
List of Japanese songs
https://floateresting.github.io/Kashi

## Features
- Controls
    - Click `0` button to hide/show furigana
    - Click `▲` button to switch kanji and furigana positions
    - Click `Ξ` to scroll to top
- URL
    - `?paste=true`
        - allow paste a raw html and parse automatically when pasted  

## Notes (for Personal Use)
- [kashi.ts](/src/scripts/kashi.ts)
    - read/write files in `sessionStorage` (see function `item`)
- [index.ts](/src/scripts/index.ts)
    - HTTP GET using JQuery
    - choose files and read content
    - stop user from pasting and read clipboard text
    - parse URLSearchParams
