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
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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
  `;