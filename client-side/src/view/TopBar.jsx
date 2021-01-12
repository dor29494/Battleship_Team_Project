import React, { useEffect, useState, useContext } from "react";
import { IoIosHelpCircleOutline, IoIosHelpCircle } from 'react-icons/io'
import battleship_logo from "../logo/battleship_logo.jpg"
import styled from "styled-components";

const TopBar = () => {

    const [help, set_help] = useState(false);

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
                    <h1 onClick={() => set_help(!help)}>{help ? <IoIosHelpCircle /> : <IoIosHelpCircleOutline />}</h1>
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
    width: 1600px;   
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Logo = styled.img`
  height: 10rem;
`;

const TopBarHeader = styled.span`
  font-size: 2.5rem;
`;