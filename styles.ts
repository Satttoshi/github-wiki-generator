import { createGlobalStyle } from "styled-components";

import localfont from "@next/font/local";

const quicksand = localfont({
  src: "/public/fonts/quicksand.ttf",
});

const theme0 = {
  "--1": "#F0F5F9",
  "--2": "#C9D6DF",
  "--3": "#52616B",
  "--4": "#1E2022",
};

export default createGlobalStyle`

*,
*::before,
*::after {
    box-sizing: border-box;
}

:root {
  --1: ${() => theme0["--1"]};
  --2: ${() => theme0["--2"]};
  --3: ${() => theme0["--3"]};
  --4: ${() => theme0["--4"]};

  --font1: ${quicksand.style.fontFamily}, serif;
}
  
body {
    color: var(--1);
    background-color: var(--4);
    font-family: var(--font1);
}

`;
