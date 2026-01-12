import { useState, useEffect, useRef } from "react";
import "../styles/Header.css";
import { set } from "astro:schema";

const Header = ({ title }) => {
    const token = sessionStorage.getItem('token');
    const email = sessionStorage.getItem('email');
    const role = sessionStorage.getItem('role');

    return (token && email && role) ? (
            <>
                <header>
                    <div id="header-title">
                        <p>{ title }</p>
                    </div>
                    <div id="header-buttons">
                        <button>
                            <a href="/wishlist">
                                Wishlist
                            </a>
                        </button>
                        <button id="profile-button">
                            <a href="/profile">
                               <img src="../profile-icon.png" alt="profile-icon" />
                            </a>
                        </button>
                    </div>
                </header>
            </>
        ) : (
            <>
                <header>
                <div id="header-title">
                    <p>{ title }</p>
                </div>
                <div id="header-buttons">
                    <button>
                        <a href="/auth/sign-in">
                            Sign In
                        </a>
                    </button>
                    <button>
                        <a href="/auth/sign-up">
                            Sign Up
                        </a>
                    </button>
                </div>
            </header>
        </>
        );
}

export default Header;