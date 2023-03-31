import React from "react";
import styled from "styled-components";

const StyleHeaderlogo = styled.p`
    position: absolute;
    width: 84px;
    height: 50px;
    left: 25px;
    top: 23px;
    
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 21px;
    line-height: 0px;
    padding-bottom: 2px;
    color: #FF6B00;
    background-color: white;
    `;

const StyleHeaderlogo2 = styled.p`
    position: absolute;
    width: 84px;
    height: 50px;
    left: 25px;
    top: 46px;
    
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 21px;
    line-height: 0px;
    padding-bottom: 2px;
    color: #FF6B00;
    background-color: white;
    `;
const StyleHeader = styled.div`
    position: relative;
    width:390px;
    height:96px;
    background-color:white;
    `;

const Header = () => {
    return(
        <StyleHeader>
            <div className="header-logo">
                <StyleHeaderlogo>QR</StyleHeaderlogo>
                <StyleHeaderlogo2>物品管理</StyleHeaderlogo2>
            </div>
        </StyleHeader>
    )
    

}

export default Header;