import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    html,
    body {
      height: 100%;
      background: white;
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
     

    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
 
`;
export default GlobalStyles