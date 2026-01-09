import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/SignIn.css";
const email = new URLSearchParams(window.location.search).get("email") || "";

if(sessionStorage.getItem('userToken') === null || sessionStorage.getItem('userToken') === '' || sessionStorage.getItem('userName') === null || sessionStorage.getItem('userName') === ''){
    location.href = '/auth/sign-in';
}

const ChangePassword = ({ api }) => {

    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()--+={}\[\]|\:;"'<>,.?\/_₹])(?!.*\s).{8,32}$/

    const PasswordFocused = () => {
        const label = document?.getElementById("label-password");
        if(!label) return;
        label.style.top = "25px";
        label.style.fontSize = "10px";
        label.style.fontWeight = "bold";
    }

    const PasswordBlured = (input) => {
        const label = document?.getElementById("label-password");
        if(!label) return;
        if(input.target.value === ""){
            label.style.top = "50%";
            label.style.fontSize = "clamp(var(--min-text), var(--text), var(--max-text))";
            label.style.fontWeight = "normal";
        }
    }

    const RepeatedPasswordFocused = () => {
        const label = document?.getElementById("label-repeated-password");
        if(!label) return;
        label.style.top = "25px";
        label.style.fontSize = "10px";
        label.style.fontWeight = "bold";
    }

    const RepeatedPasswordBlured = (input) => {
        const label = document?.getElementById("label-repeated-password");
        if(!label) return;
        if(input.target.value === ""){
            label.style.top = "50%";
            label.style.fontSize = "clamp(var(--min-text), var(--text), var(--max-text))";
            label.style.fontWeight = "normal";
        }
    }

    const HandlerSubmit = async (e) => {
        e.preventDefault();
        if(!passwordRegex.test(password)){
            alert("Password must be 8-32 characters long, include uppercase and lowercase letters, a number, and a special character.");
            return;
        }
        if(password !== repeatedPassword){
            alert("Passwords do not match.");
            return;
        }
        console.log("Submitting:", password, repeatedPassword);
        const token = sessionStorage.getItem('userToken');
        const response = await axios.put(`${api}/user/${email}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }, { password });
        if(response.data.success){
            location.href = '/auth/sign-in';
        } else {
            alert("Something went wrong. Please try again.");
        }
        setPassword("");
        setRepeatedPassword("");
        document.querySelector("form").reset();
    }

    return (
        <div id="main-content">
        <form>
            <h2>New Password</h2>
            <section>
                <div>
                    <label id="label-password" htmlFor="password">Enter new password</label><br />
                    <input type="password" id="input-password" onChange={(e) => setPassword(e.target.value)} onFocus={() => PasswordFocused()} onBlur={(input) => PasswordBlured(input)} name="password" required />
                </div>
                <div>
                    <label id="label-repeated-password" htmlFor="repeatedPassword">Repeat new password</label><br />
                    <input type="password" id="input-repeated-password" onChange={(e) => setRepeatedPassword(e.target.value)} onFocus={() => RepeatedPasswordFocused()} onBlur={(input) => RepeatedPasswordBlured(input)} name="repeatedPassword" required />
                </div>
            </section>
            <section>
                <input onClick={HandlerSubmit} type="submit" value="Update Password" />
            </section>
        </form>
    </div>
    );
}

export default ChangePassword;