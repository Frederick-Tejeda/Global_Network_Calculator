import { useState, useEffect, use } from 'react';
import axios from 'axios';
import "../styles/SignUp.css";
const api = import.meta.env.PUBLIC_AUTH_ROUTE;

const SignUp = () => {

    const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()--+={}\[\]|\:;"'<>,.?\/_₹])(?!.*\s).{8,32}$/
;

    const FirstNameFocused = () => {
        const label = document?.getElementById("label-firstName");
        if(!label) return;
        label.style.top = "25px";
        label.style.fontSize = "10px";
        label.style.fontWeight = "bold";
    }

    const FirstNameBlured = (input) => {
        const label = document?.getElementById("label-firstName");
        if(!label) return;
        if(input.target.value === ""){
            label.style.top = "50%";
            label.style.fontSize = "clamp(var(--min-text), var(--text), var(--max-text))";
            label.style.fontWeight = "normal";
        }
    }

    const LastNameFocused = () => {
        const label = document?.getElementById("label-lastName");
        if(!label) return;
        label.style.top = "25px";
        label.style.fontSize = "10px";
        label.style.fontWeight = "bold";
    }

    const LastNameBlured = (input) => {
        const label = document?.getElementById("label-lastName");
        if(!label) return;
        if(input.target.value === ""){
            label.style.top = "50%";
            label.style.fontSize = "clamp(var(--min-text), var(--text), var(--max-text))";
            label.style.fontWeight = "normal";
        }
    }

    const EmailFocused = () => {
        const label = document?.getElementById("label-email");
        if(!label) return;
        label.style.top = "25px";
        label.style.fontSize = "10px";
        label.style.fontWeight = "bold";
    }

    const EmailBlured = (input) => {
        const label = document?.getElementById("label-email");
        if(!label) return;
        if(input.target.value === ""){
            label.style.top = "50%";
            label.style.fontSize = "clamp(var(--min-text), var(--text), var(--max-text))";
            label.style.fontWeight = "normal";
        }
    }

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
        if(firstName.trim() === ""){
            alert("First name cannot be empty.");
            return;
        }
        if(lastName.trim() === ""){
            alert("Last name cannot be empty.");
            return;
        }
        if(!emailRegex.test(email)){
            alert("Please enter a valid email address.");
            return;
        }
        if(!passwordRegex.test(password)){
            alert("Password must be 8-32 characters long, include uppercase and lowercase letters, a number, and a special character.");
            return;
        }
        if(password !== repeatedPassword){
            alert("Passwords do not match.");
            return;
        }
        console.log("Submitting:", firstName, lastName, email, password);
        const response = await axios.post(`${api}/api/v1/Auth/register`, { email, password, firstName, lastName });
        if(response.status === 200){
            location.href = '/signin';
        } else {
            alert("Something went wrong. Please try again.");
        }
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setRepeatedPassword("");
        document.querySelector("form").reset();
    }

    return (
        <div id="main-content">
            <form>
                <h2>Sign Up</h2>
                <section>
                    <div>
                        <label id="label-firstName" htmlFor="firstName">First Name</label><br />
                        <input type="text" id="input-firstName" onChange={(e) => setFirstName(e.target.value)} onFocus={() => FirstNameFocused()} onBlur={(input) => FirstNameBlured(input)} name="firstName" required />
                    </div>
                    <div>
                        <label id="label-lastName" htmlFor="lastName">Last Name</label><br />
                        <input type="text" id="input-lastName" onChange={(e) => setLastName(e.target.value)} onFocus={() => LastNameFocused()} onBlur={(input) => LastNameBlured(input)} name="lastName" required />
                    </div>
                    <div>
                        <label id="label-email" htmlFor="email">Email</label><br />
                        <input type="email" id="input-email" onChange={(e) => setEmail(e.target.value)} onFocus={() => EmailFocused()} onBlur={(input) => EmailBlured(input)} name="email" required />
                    </div>
                    <div>
                        <label id="label-password" htmlFor="password">Password</label><br />
                        <input type="text" id="input-password" onChange={(e) => setPassword(e.target.value)} onFocus={() => PasswordFocused()} onBlur={(input) => PasswordBlured(input)} name="password" required />
                    </div>
                    <div>
                        <label id="label-repeated-password" htmlFor="repeatedPassword">Repeat Password</label><br />
                        <input type={showRepeatedPassword ? "text" : "password"} id="input-repeated-password" onChange={(e) => setRepeatedPassword(e.target.value)} onFocus={() => RepeatedPasswordFocused()} onBlur={(input) => RepeatedPasswordBlured(input)} name="repeatedPassword" required />
                        <input type="text" id="input-show" value={showRepeatedPassword ? "Hide" : "Show"} onClick={() => {setShowRepeatedPassword(!showRepeatedPassword)}} readOnly></input>
                    </div>
                </section>
                <section>
                    <button type="button" onClick={() => location.href='/'}>Cancel</button><input onClick={HandlerSubmit} type="submit" value="Sign Up" />
                </section>
            </form>
        </div>
    );
}

export default SignUp;