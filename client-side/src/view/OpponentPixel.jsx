import React from "react";
import { OpponentSquare, MissHit, ShipHit, ShipSink, AroundSink, ShipPart } from "../styles/GlobalStyles"
import { SEA, MISS, HIT, SINK, AROUND_SINK, SHIP_PART } from "../stateManager/stateManager";

const dev = true // necessary only for dev - let you see the opponent ship

// checking the pixel status when clicking and render a new one (depends on the pixel status) 
const OpponentPixel = ({ status, x, y, lock, clickhandler }) => {

  if (status === SEA) {
    return <OpponentSquare onClick={() => clickhandler(x, y, lock)} ></OpponentSquare>
  }
  else if (status === MISS) {
    return <MissHit onClick={() => clickhandler(x, y, lock)} >•</MissHit>
  }
  else if (status === HIT) {
    return <ShipHit onClick={() => clickhandler(x, y, lock)} >💥</ShipHit>
  }
  else if (status === SINK) {
    return <ShipSink>🔥</ShipSink>
  }
  else if (status === AROUND_SINK) {
    return <AroundSink>•</AroundSink>
  }
  else if (status === SHIP_PART) {
    //
    if (dev)
      return <ShipPart onClick={() => clickhandler(x, y, lock)} ></ShipPart> // dev tool
    else
    //
      return <OpponentSquare onClick={() => clickhandler(x, y, lock)} ></OpponentSquare>
  }
};

export default OpponentPixel;


