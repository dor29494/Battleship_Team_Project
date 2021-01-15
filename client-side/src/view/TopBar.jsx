import React, { useEffect, useState, useContext } from "react";
import { BsContext } from "../stateManager/stateManager";
import battleship_logo from "../logo/battleship_logo.jpg";
import styled, { keyframes } from "styled-components";
import { flash } from 'react-animations';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import Modal from './MsgModal'

const flashAnimation = keyframes`${flash}`;

const TopBar = () => {

    const { connected, both_players_ready, lock_other_player_board, show_modal, game_over_msg } = useContext(BsContext);


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
            <div style={{ width: '100%', height: '100%' }}>
                <LogoWrapper>
                    <Logo src={battleship_logo} alt={"logo"} />
                </LogoWrapper>
                <TopBarHeader>players online: {num}</TopBarHeader>
                {both_players_ready && connected ? <TurnHolder>{!lock_other_player_board ? <TurnText><Flash>Its Your Turn!</Flash></TurnText> : <TurnText>Opponent Turn<Loader style={{ paddingLeft: '5px', position: 'relative', top: '9px' }} type="ThreeDots" color="white" height={50} width={50} /> </TurnText>}
                </TurnHolder> : ' '}
            </div>
            { show_modal && !game_over_msg ? <Modal /> : ' '}
        </TopBarWrapper>
    )
};

export default TopBar

const TopBarWrapper = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  width: 100%;
  height: 16%;
  right: 0;
  align-items: center;
  align-content: center;
  align-items: center;
  color: white;
  z-index: 100;
`;

const LogoWrapper = styled.div`
    width: 100%;  
    height: 100%;
    display: flex;
    align-items: center;
`;

const Logo = styled.img`
  height: 90%;
  margin: 5%;
`;

const TopBarHeader = styled.span`
  font-size: 1.7rem;
  top: 85px;
  left: 4.9%;
  padding: 0.7%;
  position: absolute;
`;

const TurnHolder = styled.div`
width: 100%;
display: flex;
justify-content: center;

`
const TurnText = styled.div`
font-size: 2rem;
display: flex;
`

const Flash = styled.h1`
font-size: 2rem;
animation: 6s ${flashAnimation};
animation-iteration-count: infinite;
`