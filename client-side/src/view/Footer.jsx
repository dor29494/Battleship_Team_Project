import React from "react"
import styled from "styled-components"

const Footer = () => {


    return (
        <FooterWrapper>
           created by:
        </FooterWrapper>
    )
};

export default Footer;

const FooterWrapper = styled.div`
    position: absolute;
    top: 85rem;
    buttom: 0;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: white;
    border: 3px solid white;
    `;
