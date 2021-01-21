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

    const { both_players_ready, lock_other_player_board, show_dc_modal, game_over_msg, game_started, users_counter, set_users_counter } = useContext(BsContext);


    // regenerate false (dynamic) number of players (lol).
    // const randomize = (min, max) => Math.round(min + Math.random() * (max - min));
    // let initiate_num = randomize(0, 19432542);

    // const [num, set_num] = useState(initiate_num);
    // useEffect(() => {
    //     setInterval(() => {
    //         set_num(num => {
    //             return randomize(0, 1) ? num + randomize(1, 3) : num - randomize(0, 2);
    //         });
    //     }, randomize(0, 5000));
    // }, []);

    return (
        <TopBarWrapper>
                <LogoWrapper>
                    <Logo src={battleship_logo} alt={"logo"} onClick={() => location.href = window.location.origin} />
                </LogoWrapper>
                <TopBarHeader>{users_counter} {users_counter > 1 ? 'Players' : 'Player' } Online</TopBarHeader>
                {both_players_ready && !game_over_msg ? <TurnHolder myturn={!lock_other_player_board}>{!lock_other_player_board ? <TurnText><Flash>Its Your Turn!</Flash></TurnText> : <TurnText>Opponent Turn<Loader style={{ paddingLeft: '0.5vw', position: 'relative', top: '1.1vw' }} type="ThreeDots" color="white" height={'4vw'} width={'4vw'} /> </TurnText>}
                </TurnHolder> : ' '}
            { show_dc_modal && !game_over_msg ? <Modal /> : ' '}
        </TopBarWrapper>
    )
};

export default TopBar

const TopBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  // width: 100vw;
  color: white;
  height: 13vw;
  margin-bottom: -8vw;

  @media only screen and (min-width: 600px) {
    {
      width: 130vw;
      margin-bottom: 0;
    }
  }
  
`;
const LogoWrapper = styled.div`
width: 100%;
  `;
  
  const Logo = styled.img`
  height: 10vw;
  cursor: pointer;
`;

const TopBarHeader = styled.span`
  // ${position('absolute', '105vw', false, false, '4.9%' )};
  font-size: 2.5vw;
  width: 100%;
  margin-top: -4vw;
  margin-left: 1.5vw;

`;

const TurnHolder = styled.div`
  ${flex(false, 'center')};
  width: 100%;

  @media only screen and (max-width: 600px)
    {
margin: 3vw;
padding-left: 2vw;
background: ${props => !props.myturn ? 'red' : 'blue'};
display: flex;
// background: blue;
align-items: center;
font-size: 5vw;

    }
`;

const TurnText = styled.div`
  ${flex(false, false)};
  font-size: 3vw;
  align-items: center;
`;

const Flash = styled.h1`
  animation: 6s ${flashAnimation};
  animation-iteration-count: infinite;
  font-size: 3vw;
`;