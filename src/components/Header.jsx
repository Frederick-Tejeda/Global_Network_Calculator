import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Header.css";

const Header = ({ title, api }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const name = localStorage.getItem('userName');
        const token = localStorage.getItem('userToken');
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
                <div className="header-title">
                    <p>{ title }</p>
                </div>
                <div className="header-buttons">
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
                <div className="header-title">
                    <p>{ title }</p>
                </div>
                <div className="header-buttons">
                    <button>
                        <a href="/signin">
                            Sign In
                        </a>
                    </button>
                    <button>
                        <a href="/signup">
                            Sign Up
                        </a>
                    </button>
                </div>
            </header>
        </>
        );
}

export default Header;