import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    html,
    body {
      height: 100%;
      background: #0D0208;
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
      color: white;
      font-size: 25px;
     

    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
 
`;
export default GlobalStyles