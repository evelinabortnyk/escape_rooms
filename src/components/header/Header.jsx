import { useState, useRef, useEffect, use } from 'react'

import './header.css'
import Logo from './img/logo.svg'

function Header() {
    const ref= useRef();
    
    const [menuActive, setMenuActive] = useState(false)
    const [classListBtn, setClassListBtn] = useState("menu-btn")
    const [classListMenu, setClassListMenu] = useState("burger-menu")

    useEffect(() => {
        function handleClick(e){
            if (ref.current && !ref.current.contains(e.target)) {
                setMenuActive(false)
                setClassListBtn('menu-btn')
                setClassListMenu('burger-menu')
            }
        };
        document.addEventListener('click', handleClick);
    }, [])

    

    const naviArr = [
        { 'value': 'Quests', 'link': '', },
        { 'value': 'FOR BEGINNERS', 'link': '', },
        { 'value': 'REVIEWS', 'link': '', },
        { 'value': 'PROMOTIONS', 'link': '', },
        { 'value': 'contacts', 'link': '', },
    ]

    const text = '< Front end developer />'


    function menuClick(value) {
        setMenuActive(!value)

        if (!value === true) {
            setClassListBtn('menu-btn-active')
            setClassListMenu('burger-menu-active')
        } else {
            setClassListBtn('menu-btn')
            setClassListMenu('burger-menu')
        }
    }
    return (
        <header ref={ref}>
            <div className="header-component header--logo">
                <img src={Logo} alt="" />
            </div>
            <button className={`menu-btn ${classListBtn}`} value={menuActive} onClick={() => menuClick(menuActive)}>
                    <span className="menu-btn-burger"></span>
                </button >
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