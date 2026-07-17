import { useState } from 'react'

import './header.css'
import Logo from './img/logo.svg'

function Header() {
    const [menuActive, setMenuActive] = useState(false)
    const [classListBtn, setClassListBtn] = useState("menu-btn")
    const [classListMenu, setClassListMenu] = useState("burger-menu")

    const naviArr = [
        { 'value': 'Quests', 'link': '', },
        { 'value': 'FOR BEGINNERS', 'link': '', },
        { 'value': 'REVIEWS', 'link': '', },
        { 'value': 'PROMOTIONS', 'link': '', },
        { 'value': 'contacts', 'link': '', },
    ]

    const text = '< Front end developer />'

    function menuClick() {
        setMenuActive(!menuActive)

        if (menuActive === true) {
            setClassListBtn('menu-btn-active')
            setClassListMenu('burger-menu-active')
        } else {
            setClassListBtn('menu-btn')
            setClassListMenu('burger-menu')
        }
    }
    return (
        <header>
            <div className="header-component header--logo">
                <img src={Logo} alt="" />
            </div>
            <a href="#" className={`menu-btn ${classListBtn}`} value={menuActive} onClick={() => menuClick()}>
                    <span className="menu-btn-burger"></span>
                </a>
            <div className="header-component header--nav">
                <div className="menu">
                    <nav className={`burger-menu ${classListMenu}`}>
                        <ul className="menu-list">
                            {naviArr.map((item, index) => (
                                <li key={index} onClick={() => { document.getElementById(`${item.link}`)?.scrollIntoView({ behavior: 'smooth' }) }}><a href={`#${item.link}`}>{item.value}</a></li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
            <a href='tel:4915147289361' className="header-component header--phone">49 151 4728 9361</a>
            

        </header>
    )
}

export default Header