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

// general:
export const StandardPixel = styled.div`
width: 50px;
height: 50px;
display: flex;
justify-content: center;
align-items: center;
`;

// UserPixel + OpponentPixel components:

export const RegularSquare = styled(StandardPixel)`
  border: 1px solid #00FF41;
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
  background: rgba(128, 128, 128, 0.8);
`;

export const ShipPart = styled(StandardPixel)`
  border: 3px solid blue;
  background: rgba(0, 0, 255, 0.3);
`;

export const OpponentSquare = styled(RegularSquare)`

    :hover {
      background: #00ff41;
      opacity: 0.5;
    }
`;

//--------------------------------------------

// UserGrid + OpponentGrid components:

export const Wrapper = styled.div`
// border: 1px solid white;
  height: 580px;
  width: 560px;
  color: white;
  margin: 20px;
  display: grid;
  grid-template-areas:
  'header header'
  'emptyPixel lettersBar'
  'numbersBar grid';
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
  cursor-pointer: ${({ lock_other_player_board }) => (lock_other_player_board ? 'none' : 'auto')};
`;

export const GridHeaders = styled.span`
  text-align: center;
  grid-area: header;
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