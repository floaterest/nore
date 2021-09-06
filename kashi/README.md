<style>code{font-family: monospace}</style>

# Kashi
List of Japanese songs
https://floateresting.github.io/Kashi

## Features
- Controls
    - `O/Ø`: hide/show furigana
    - `X/I`: enable/disable content edit
    - `▲/▼`: to switch kanji and furigana positions
    - `Ξ`: show menu
- URL search params
    - `?paste=true`
        - allow paste a raw html and parse automatically when pasted  
    - `?wrap=true`
        - enable word wrapping
## Notes (for Personal Use)
- [kashi.ts](/src/scripts/kashi.ts)
    - read/write files in `sessionStorage` (see function `item`)
- [index.ts](/src/scripts/index.ts)
    - HTTP GET using JQuery
    - choose files and read content
    - stop user from pasting and read clipboard text
    - parse URLSearchParams
