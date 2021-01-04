import React from "react";
import styled from "styled-components";
import { SEA, MISS, HIT, SINK, AROUND_SINK, SHIP_PART } from "../stateManager/stateManager";


const OppnentPixel = ({ status, x, y, lock, clickhandler }) => {

  if (status === SEA) {
    return <RegularSquare onClick={() => clickhandler(x, y, lock)} ></RegularSquare>
  }
  else if (status === MISS) {
    return <MissHit onClick={() => clickhandler(x, y, lock)} ></MissHit>
  }
  else if (status === HIT || status === SINK) {
    return <ShipHit onClick={() => clickhandler(x, y, lock)} >X</ShipHit>
  }
  else if (status === AROUND_SINK) {
    return <AroundSink>•</AroundSink>
  }
  else if (status === SHIP_PART) {
    return <ShipPart onClick={() => clickhandler(x, y, lock)} ></ShipPart>
  }

};

export default OppnentPixel;

const Standard = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegularSquare = styled(Standard)`
  border: 1px solid #00FF41;

    :hover {
      background: #00ff41;
      opacity: 0.5;
    }
`;

const MissHit = styled(Standard)`
  border: 3px solid #00FF41;
  background: #00FF41;
  opacity: 0.3;
`;

const AroundSink = styled(Standard)`
  border: 3px solid #00FF41;
  background: red;
  opacity: 0.3;
`;

const ShipHit = styled(Standard)`
  border: 1px solid lightblue;
  background: rgba(255, 153, 153, 0.5);
  color: red;
  font-size: 5vh;
`;

const ShipPart = styled(Standard)`
  border: 3px solid blue;
  // cursor: move;
`;