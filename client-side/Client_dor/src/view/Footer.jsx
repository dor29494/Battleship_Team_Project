import React from "react"
import styled from "styled-components"

const Footer = () => {


    return (
        <Wrapper>
            input
        </Wrapper>



    )
}
export default Footer;
const Wrapper = styled.div`

    position: absolute;
    top: 85rem;
    buttom: 0;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: white;
    `
const Resetgrid = styled.button`
    border: 1px solid;
    background-color: white;
    color: blue;
    min-width: 6vh;
    min-height: 6vh;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 10px;
    `;

const Randomgrid = styled.button`
    border: 1px solid;
    background-color: white;
    color: blue;
    min-width: 6vh;
    min-height: 6vh;
    cursor: pointer;
    margin: 10px;
    `;
const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 728px;
    `
const Playbtn = styled.button`
  border: 1px solid #d6d6d6;
  padding :.2em .8em ; 
  background-color: linear-gradient(to bottom,rgba(225,250,225,1) 0,rgba(195,222,197,1) 100%);
  color:blue;
  cursor : pointer ;
  box-shadow : 0 2px 6px rgba(0,0,0,.25)
  width: 10vh;
  height:6vh;
  margin: 10px;
`;