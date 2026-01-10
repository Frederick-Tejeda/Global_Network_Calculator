import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Header.css";

const Header = ({ title, api }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if(!name || !token) return;
        const isValid = async () => {
            try {
                const response = await axios.post(`${api}/validate-token`, { name, token });
                setIsAuthenticated(response.data.isValid);
            } catch (error) {
                console.error("Error validating token:", error);
            }
        };
        isValid();
    }, []);

    return (isAuthenticated == true) ? (
            <>
                <header>
                    <div id="header-title">
                        <p>{ title }</p>
                    </div>
                    <div id="header-buttons">
                        <button>
                            <a href="/dashboard">
                                Dashboard
                            </a>
                        </button>
                        <button>
                            <a href="/signout">
                                Sign Out
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