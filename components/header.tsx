import React from "react";
const Header = () => {
    return(
        <div className="header">
            <div className="header-logo">
                <p>QR</p>
                <p>物品管理</p>
            </div>
            <div className="hamburger-menu">
                <input type="checkbox" id="menu-btn-check"></input>
                <label htmlFor="menu-btn-check" className="menu-btn"><span></span></label>
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
            </div>
        </div>
    )
    

}

export default Header;