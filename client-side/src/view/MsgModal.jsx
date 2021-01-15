import React, { useContext } from "react";
import { BsContext } from "../stateManager/stateManager";
import { Button } from "../styles/GlobalStyles";
import styled from "styled-components";

const Modal = () => {
    const { set_show_modal } = useContext(BsContext);
    
    const ok_button = () => {
      set_show_modal(false)
      location.reload();
    }
  
    return (
      <ModalWrapper>
        <Dialog>
          <span>Your opponent just leaved the game.</span>
          <br />
          <Button onClick={() => ok_button()}>OK</Button>
        </Dialog>
      </ModalWrapper>
    )
  };

  export default Modal;
  
  const ModalWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: rgba(0,0,0,0.8);
    z-index: 100;
  `;
  
  const Dialog = styled.div`
    background: grey;
    width: 60rem;
    height: 30rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 100;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  `;
