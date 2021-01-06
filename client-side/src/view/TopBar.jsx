import React, { useEffect, useState } from "react";
import styled from "styled-components";
import battleship_logo from "../logo/battleship_logo.jpg"

const TopBar = () => {

    // regenerate false (dynamic) number of players (lol).
    const randomize = (min, max) => Math.round(min + Math.random() * (max - min));
    let initiate_num = randomize(0, 19432542);

    const [num, set_num] = useState(initiate_num);

    useEffect(() => {
        setInterval(() => {
            set_num(num => {
                return randomize(0, 1) ? num + randomize(1, 3) : num - randomize(0, 2);
            });
        }, randomize(0, 5000));
    }, []);

    return (
        <TopBarWrapper>
            <div>
                <LogoWrapper>
                    <Logo src={battleship_logo} alt={"logo"} />
                </LogoWrapper>
                <TopBarHeader>players online: {num}</TopBarHeader>
            </div>
        </TopBarWrapper>
    )
};

export default TopBar

const TopBarWrapper = styled.div`
  position: absolute;
  align-items: center;
  top: 3rem;
  buttom: 0;
  right: 0;
  left: 0;
  display: flex;
  min-height: 10rem;
  color: white;
  margin-left: 10rem;
`;

const LogoWrapper = styled.div`
    width: 100%;   
`;

const Logo = styled.img`
  height: 10rem;
`;

const TopBarHeader = styled.span`
  font-size: 2.5rem;
`;

// const Randomgrid = styled.button`
//   border: 1px solid;
//   background-color: white;
//   color: blue;
//   min-width: 6vh;
//   min-height: 6vh;
//   cursor: pointer;
// `;