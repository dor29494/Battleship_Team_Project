import React from "react";
import styled from "styled-components";
import { RegularSquare, MissHit, ShipHit, ShipSink, AroundSink, ShipPart } from "../styles/GlobalStyles"
import { SEA, MISS, HIT, SINK, AROUND_SINK, SHIP_PART } from "../stateManager/stateManager";

const UserPixel = ({ status, lock }) => {

  if (status === SEA) {
    return <RegularSquare></RegularSquare>
  }
  else if (status === MISS) {
    return <MissHit>•</MissHit>
  }
  else if (status === HIT) {
    return <ShipHit>X</ShipHit>
  }
  else if (status === SINK) {
    return <ShipSink></ShipSink>
  }
  else if (status === AROUND_SINK) {
    return <AroundSink>•</AroundSink>
  }
  else if (status === SHIP_PART) {
    return <ShipPart is_lock={lock}></ShipPart>
  }
};

export default UserPixel;


// *** when adding the reordering of the player ships before ready, switch "ShipPart" with "PlayerShipPart"
const PlayerShipPart = styled(ShipPart)`
cursor: ${({ lock }) => (lock ? 'none' : 'move')};
`;