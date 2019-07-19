import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
    return (
        <header id="main-header">
            <div className="header-content">
                <Link to="/">Kramer's Blog</Link>
                <Link to="/login"> Entrar </Link>
            </div>

        </header>
    );
}

export default Header;