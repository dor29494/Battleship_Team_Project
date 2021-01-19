import React, { useContext } from "react";
import { BsContext } from "../stateManager/stateManager";
import { Button } from "../styles/GlobalStyles";
import styled from "styled-components";
import { flex, position } from "../styles/Mixins";

const Modal = () => {
    const { set_show_dc_modal } = useContext(BsContext);
    
    // hide the modal and reload the page
    const ok_button = () => {
      set_show_dc_modal(false)
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
    ${flex()};
    ${position('fixed', '0', false, '0', false)};
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.8);
    z-index: 1;
  `;
  
  const Dialog = styled.div`
    ${flex()};
    flex-direction: column;
    height: 30rem;
    width: 60rem;
    background: grey;
  `;
