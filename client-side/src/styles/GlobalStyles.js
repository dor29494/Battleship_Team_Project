import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { flex, coolBlue } from "../styles/Mixins";

const GlobalStyles = createGlobalStyle`
  html,
  body {
    // height: 100%;
    background: #000000;
    zoom: 120%;
    @media only screen and (min-width: 600px) {
      {zoom: 85%}
    }
  
  body {
    ${flex()};
    font-family: 'Rajdhani', sans-serif;
    color: white;
    font-size: 25px;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-user-select: none
      -ms-user-select: none;
      user-select: none;
    }
`;

export default GlobalStyles

// general:

export const StandardPixel = styled.div`
  ${flex()};
  // min-height: 10%;
  // min-width: 10%;
  // max-height: 50px;
  // max-width: 50px;
  width: 10%;
  height: 10%;
  

`;

// input component:

export const Button = styled.div`
  ${flex()};
  // height: 20%;
  // height: ;
  width: 15vw;
  padding: 0.5vw;
  height: 4.5vw;
  // width: 55%;
  border: 1px solid #80ffdb;
  border-radius: 3rem;
  color: black;
  background: #64dfdf;
  font-size: 2.5vw;
  font-weight: 400;
  margin: 2%;
  box-shadow: inset 0 0.1rem 1.5rem lightgrey;
  cursor: pointer;

    &:focus {
      // outline: none;
      // box-shadow: 0px 0px yellow, -1em 0 04em white;
      // border: 1px solid red;
      background: red;
    }
    &:hover {
      ${coolBlue};
      background: #ccf2f4;
      color: black;
    }
    @media only screen and (max-width: 600px)
    {
height: 5.5vw;
width: 20vw;
    }
`;

// UserPixel + OpponentPixel components:

export const RegularSquare = styled(StandardPixel)`
  border: 0.1vw solid #7fcdff;
`;

export const OpponentSquare = styled(RegularSquare)`

    :hover {
      background: #f70d1a;
      opacity: 0.5;
    }
`;

export const MissHit = styled(StandardPixel)`
  border: 0.1vw solid #7fcdff;
  background: white;
  opacity: 0.3;
`;

export const AroundSink = styled(StandardPixel)`
  border: 0.1vw solid #7fcdff;
  background: white;
  opacity: 0.3;
`;

export const ShipHit = styled(StandardPixel)`
  border: 0.1vw solid lightblue;
  background: rgba(255, 153, 153, 0.5);
  color: black;
  font-size: 5vw;
`;

export const ShipSink = styled(StandardPixel)`
font-size: 4vw;
background: #f7630c;
border: 0.1vw solid black;
  
`;

export const ShipPart = styled(StandardPixel)`
  border: 0.1vw solid blue;
  background: rgba(0, 0, 255, 0.6);
`;

// UserGrid + OpponentGrid components:

export const GridWrapper = styled.div`

  border: none;
  height: 100%;
  width: 100%;
  color: white;
  display: grid;
  justify-content: center;
  grid-template-areas:
  'header header'
  'progressBar progressBar'
  'emptyPixel lettersBar'
  'numbersBar grid';
  @media only screen and (max-width: 600px) {
    {
      margin-top: 0;
      padding-top: 0;
      zoom: 70%;
     

    }

    
`;

export const PlayerGrid = styled.div`

  display: flex;
  flex-wrap: wrap;
  height: 40vw;
  width: 40vw;
  color: #003B00;
  grid-area: grid;
  @media only screen and (max-width: 600px)
    {
      height: 50vw;
      width: 50vw;
      
    }
    opacity: ${({ lock_other_player_board }) => (lock_other_player_board ? '0.3' : '1')};
`;

export const OtherPlayerGrid = styled(PlayerGrid)`
  cursor: ${({ lock_other_player_board }) => (lock_other_player_board ? 'not-allowed' : 'pointer')};
  opacity: ${({ lock_other_player_board }) => (lock_other_player_board ? '0.3' : '1')};
`;

export const GridHeaders = styled.span`
  text-align: center;
  font-size: 2.5vw;

  grid-area: header;
`;

export const LittleWrapper = styled.div`
  ${flex()};
  width: 100%;
  padding-top: 2%;
  padding-bottom: 5%;

  grid-area: progressBar;
`;

export const LettersBar = styled.div`
  ${flex(false,false)};
  width: 40vw;
  margin-bottom: -1vw;

  grid-area: lettersBar;
  font-size: 3vw;
  @media only screen and (max-width: 600px) {
    {
width: 50vw;

    }
`;

export const NumbersBar = styled.div`
  ${flex('center', false)};
  flex-direction: column;
  height: 40vw;
  font-size: 3vw;
  margin-right: 0.5vw;

  grid-area: numbersBar;
  @media only screen and (max-width: 600px) {
    {
height: 50vw;
    }
`;

export const BarPixel = styled(StandardPixel)`
`;

export const PlaceFiller = styled(StandardPixel)`
  grid-area: emptyPixel;
`;

