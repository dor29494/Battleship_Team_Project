import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    html,
    body {
      height: 100%;
   zoom: 90%;
    }
    html {
      font-size: 10px;
  
    }
    body {
      font-size: 1.6rem;
      font-family:sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
     
      background: linear-gradient(
        to bottom,
        #064273 0%,
        #7fcdff 100%
      ); 
    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
 
`;
export default GlobalStyles