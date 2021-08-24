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
    - add `#{title}` to open an existing file
        - note: add it at the end of the url
    - add `?s={html}` to add custom html inside
## Notes (for Personal Use)
- [index.ts](/src/scripts/index.ts)
    - regex for Japanese characters
- [kashi.ts](/src/scripts/kashi.ts)
    - read/write files in `sessionStorage` (see function `item`)
    
