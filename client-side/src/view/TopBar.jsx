import React, { useEffect, useState, useContext } from "react";
import { BsContext } from "../stateManager/stateManager";
import Modal from './MsgModal'
import battleship_logo from "../logo/battleship_logo.jpg";
import styled, { keyframes } from "styled-components";
import { flex, position } from "../styles/Mixins";
import { flash } from 'react-animations';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const flashAnimation = keyframes`${flash}`;

const TopBar = () => {

    const { both_players_ready, lock_other_player_board, game_over_msg, show_dc_modal } = useContext(BsContext);

    return (
        <TopBarWrapper>
            <div style={{ width: '100%', height: '100%' }}>
                <LogoWrapper>
                    <Logo src={battleship_logo} alt={"logo"} />
                </LogoWrapper>
                {both_players_ready && !game_over_msg ? <TurnHolder>{!lock_other_player_board ? <TurnText><Flash>Its Your Turn!</Flash></TurnText> : <TurnText>Opponent Turn<Loader style={{ paddingLeft: '5px', position: 'relative', top: '9px' }} type="ThreeDots" color="white" height={50} width={50} /> </TurnText>}
                </TurnHolder> : ' '}
            </div>
            { show_dc_modal && !game_over_msg ? <Modal /> : ' '}
        </TopBarWrapper>
    )
};

export default TopBar

const TopBarWrapper = styled.div`
  ${flex('center', false)};
  align-content: center;
  ${position('absolute', '0', false, '0', false )};
  height: 14%;
  width: 100%;
  color: white;
`;

const LogoWrapper = styled.div`
  ${flex('center', false)};
  height: 100%;
  width: 100%;  
`;

const Logo = styled.img`
  height: 90%;
  margin: 1%;
`;

const TopBarHeader = styled.span`
  ${position('absolute', '105px', false, false, '4.9%' )};
  font-size: 1.7rem;
  padding: 0.7%;
`;

const TurnHolder = styled.div`
  ${flex(false, 'center')};
  width: 100%;
`;

const TurnText = styled.div`
  ${flex(false, false)};
  font-size: 2rem;
`;

const Flash = styled.h1`
  animation: 6s ${flashAnimation};
  animation-iteration-count: infinite;
  font-size: 2rem;
`;