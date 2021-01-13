import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

const GlobalStyles = createGlobalStyle`
    html,
    body {
      height: 100%;
      background: #000000;
   zoom: 90%;
   
  }
  
  html {
    font-size: 16px;
    
  }
  
  body {
    // font-family:sans-serif;
    font-family: 'Rajdhani', sans-serif;
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
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
`;

export default GlobalStyles

// general:
export const StandardPixel = styled.div`
width: 10%;
height: 10%;
//50px
display: flex;
justify-content: center;
align-items: center;
`;

// input component:

export const Button = styled.div`
  margin: 1%;
  // font-family: "Expletus Sans";
  text-align: left;
  font-size: 2.2rem;
  width: 30%;
  height: 10%;
  text-align: center;
  border-radius: 3rem;
  font-weight: 400;
  color: white;
  background: #003B00;
  border: 1px solid #00FF41;
  box-shadow: inset 0 0.1rem 1.5rem lightgrey;
  // #00FF41
  cursor: pointer;

    &:focus {
      outline: none;
      box-shadow: 0px 0px yellow, -1em 0 04em white;
    }
    &:hover {
      background: #1aff1a;
      color: black;
      -webkit-box-shadow: 2px 3px 16px 5px rgba(0,255,65,0.75); 
box-shadow: 2px 3px 16px 5px rgba(0,255,65,0.75);
    }
    display: flex;
    align-items: center;
    justify-content: center;
`;



// UserPixel + OpponentPixel components:

export const RegularSquare = styled(StandardPixel)`
  border: 1px solid #00FF41;
`;

export const OpponentSquare = styled(RegularSquare)`

    :hover {
      background: #00ff41;
      opacity: 0.5;
    }
`;

export const MissHit = styled(StandardPixel)`
  border: 3px solid #00FF41;
  background: #00FF41;
  opacity: 0.3;
`;

export const AroundSink = styled(StandardPixel)`
  border: 3px solid #00FF41;
  background: red;
  opacity: 0.3;
`;

export const ShipHit = styled(StandardPixel)`
  border: 1px solid lightblue;
  background: rgba(255, 153, 153, 0.5);
  color: red;
  font-size: 5vh;
`;

export const ShipSink = styled(StandardPixel)`
  background: grey;
`;

export const ShipPart = styled(StandardPixel)`
  border: 3px solid blue;
  background: rgba(0, 0, 255, 0.3);
  // background: white;
`;

//--------------------------------------------

// UserGrid + OpponentGrid components:

export const GridWrapper = styled.div`
  border: none;
  height: 100%;
  width: 800px;
  color: white;
  // margin: 10%;
  display: grid;
  justify-content: center;

  grid-template-areas:
  'header header'
  'progressBar progressBar'
  'emptyPixel lettersBar'
  'numbersBar grid';
  // 
  `;

export const PlayerGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 500px;
  width: 500px;
  color: #003B00;
  grid-area: grid;

`;

export const OtherPlayerGrid = styled(PlayerGrid)`
  cursor: ${({ lock_other_player_board }) => (lock_other_player_board ? 'not-allowed' : 'pointer')};
  opacity: ${({ lock_other_player_board }) => (lock_other_player_board ? '0.3' : '1')};
  `;

export const GridHeaders = styled.span`
  text-align: center;
  grid-area: header;
  font-size: 2rem;
`;

export const LittleWrapper = styled.div`
width: 100%;
padding-top: 2%;
padding-bottom: 5%;
display: flex;
align-items: center;
justify-content: center;
grid-area: progressBar;
color: red;
`;

export const LettersBar = styled.div`
  // border: 1px solid white;
  width: 500px;
  display: flex;
  grid-area: lettersBar;
`;

export const NumbersBar = styled.div`
  // border: 1px solid white;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-area: numbersBar;
`;
export const BarPixel = styled(StandardPixel)`
  // border: 1px solid white;
`;

export const PlaceFiller = styled(StandardPixel)`
  grid-area: emptyPixel;
`;

//--------------------------------------------

