import React from "react"
import styled from "styled-components"

const UserPixel = ({ status }) => {
    // return <h1>none</h1>
    if (status === 'SEA') {
      return (
        <Regularsquare></Regularsquare>
      )
    }
    else if (status === 'MISS') {
      // return <Misshit>▪️</Misshit>
      return <Misshit>MISS</Misshit>
    }
    else if (status === 'HIT' || status === 'SINK') {
      return <Shiphit>X</Shiphit>
    }
    else if (status === 'AROUND_SINK') {
      // return <Misshit>▪️</Misshit>
      return <AroundSink>•</AroundSink>
    }
    else if (status === 'SHIP_PART') {
      return <Shippart></Shippart>
    }
  }

  export default UserPixel;
  
  const Regularsquare = styled.div`
  border: 1px solid;
  border-color: #00FF41;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Misshit = styled.div`
background: #00FF41;
opacity: 0.3;
border: 3px solid #00FF41;
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