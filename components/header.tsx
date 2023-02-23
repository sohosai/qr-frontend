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

const StyleHeader = styled.div`
    position: relative;
    width:390px;
    height:96px;
    background-color:white;
    `;

const HamburgerMenu = styled.div`
    position: absolute;
    width: 20px;
    height: 15px;
    left: 338px;
    top: 41px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 90;
    background-color:(0, 0, 0, 0);
    `;

const HamburgerLine = styled.label`
    content: '';
    display: block;
    height: 3px;
    width: 20px;
    border-radius: 3px;
    background-color: #C5C5C5;
    position: absolute;
    
    ::before {
        bottom: 6px;
    }
    
    ::after {
        top: 6px;
    }`;

const Header = () => {
    return(
        <StyleHeader>
            <div className="header-logo">
                <StyleHeaderlogo>QR</StyleHeaderlogo>
                <StyleHeaderlogo>物品管理</StyleHeaderlogo>
            </div>
            <HamburgerMenu>
                <input type="checkbox" id="menu-btn-check"></input>
                <HamburgerLine htmlFor="menu-btn-check" className="menu-btn"><span></span></HamburgerLine>
                <div className="menu-content">
                    <ul>
                        <li>
                            <a href="#">メニューリンク1</a>
                        </li>
                        <li>
                            <a href="#">メニューリンク2</a>
                        </li>
                        <li>
                            <a href="#">メニューリンク3</a>
                        </li>
                    </ul>
                </div>
            </HamburgerMenu>
        </StyleHeader>
    )
    

}

export default Header;