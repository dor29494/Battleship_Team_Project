import React, { useContext, useRef } from "react";
import { BsContext } from "../stateManager/stateManager";
import { Button } from "../styles/GlobalStyles";
import styled from "styled-components";
import { flex, position } from "../styles/Mixins";

const Modal = () => {
    const { setShowDcModal } = useContext(BsContext);
    
    // hide the modal and reload the page
    const ok_button = () => {
      setShowDcModal(false)
      location.href = window.location.origin;
    }
  const okref = useRef(null);
  setTimeout(() => {
    okref.current.focus();
  }, 500);
    return (
      <ModalWrapper>
        <Dialog>
          <span style={{fontSize: "3.5vw"}}>Your opponent just leaved the game.</span>
          <br />
          <Button ref={okref} onClick={() => ok_button()}>OK</Button>
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
    z-index: 1000;
    @media only screen and (max-width: 600px) {
      right: 12vw;
      width: 85%;
      top: -16vw;
      height: 120%;
            }
  `;
  
  const Dialog = styled.div`
    ${flex()};
    flex-direction: column;
    height: 30vw;
    width: 60vw;
    background: grey;
  `;
