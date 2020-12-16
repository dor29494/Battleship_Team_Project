import React from "react"
import styled from "styled-components"

const TopBar = () => {


    return (
        <Wrapper>
            <div>
                <h1>Battleship Team Project</h1>
                <h3>120 players online!</h3>
            </div>

        </Wrapper>



    )
}
const Randomgrid = styled.button`
  border: 1px solid;
  background-color: white;
  color: blue;
  min-width: 6vh;
  min-height: 6vh;
  cursor: pointer;
`;
const Wrapper = styled.div`

position: absolute;
align-items: center;
top: 3rem;
buttom: 0;
right: 0;
left: 0;
display: flex;
min-height: 10rem;
// background: #f2f2f2;
background: white;
color: black;
`
export default TopBar