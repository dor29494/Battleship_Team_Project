import React from "react";
import styled from "styled-components";

const OppnentPixel = ({ status, x, y, lock, clickhandler }) => {

  if (status === "SEA") {
    return (
      <Regularsquare
        onClick={() => {
          clickhandler(x, y, lock);
        }}
      ></Regularsquare>
    );
  } else if (status === "MISS") {
    // return <Misshit>▪️</Misshit>
    return (
      <Misshit
        onClick={() => {
          clickhandler(x, y, lock);
        }}
      >
        MISS
      </Misshit>
    );
  } else if (status === "HIT" || status === "SINK") {
    return (
      <Shiphit
        onClick={() => {
          clickhandler(x, y, lock);
        }}
      >
        X
      </Shiphit>
    );
  }
  else if (status === 'AROUND_SINK') {
    // return <Misshit>▪️</Misshit>
    return <AroundSink>•</AroundSink>
  }
  else if (status === 'SHIP_PART') {
    return (
      <Shippart
        onClick={() => {
          clickhandler(x, y, lock);
        }}
      ></Shippart>
    );
  }
};

export default OppnentPixel;

const Regularsquare = styled.div`
  border: 1px solid;
  border-color: #00ff41;
  width: 50px;
  height: 50px;
  :hover {
    background: #00ff41;
    opacity: 0.5;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Misshit = styled.div`
  background: #00ff41;
  opacity: 0.3;
  border: 3px solid #00ff41;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
`;

const AroundSink = styled(Misshit)`
background: red;
`;

const Shiphit = styled.div`
  border: 1px solid;
  color: red;
  font-size: 5vh;
  border-color: lightblue;
  background: rgba(255, 153, 153, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
`;

const Shippart = styled.div`
  border: 3px solid blue;
  //   background-color: lightgray;
  width: 50px;
  height: 50px;
  cursor: move;
`;