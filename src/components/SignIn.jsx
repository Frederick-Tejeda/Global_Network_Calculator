import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/SignIn.css";

const SignIn = ({ api }) => {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()--+={}\[\]|\:;"'<>,.?\/_₹])(?!.*\s).{8,32}$/

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

    const HandlerSubmit = async (e) => {
        e.preventDefault();
        if(!emailRegex.test(email)){
            alert("Please enter a valid email address.");
            return;
        }
        if(!passwordRegex.test(password)){
            alert("Password must be 8-32 characters long, include uppercase and lowercase letters, a number, and a special character.");
            return;
        }
        console.log("Submitting:", email, password);
        const response = await axios.post(`${api}/user/validate`, { email, password });
        if(response.data.success){
            sessionStorage.setItem('userToken', response.data.token);
            sessionStorage.setItem('userName', JSON.stringify(response.data.name));
            location.href = '/';
        } else {
            alert("Invalid email or password.");
        }
        setEmail("");
        setPassword("");
        document.querySelector("form").reset();
    }

    return (
        <div id="main-content">
		<form>
            <h2>Sign In</h2>
            <section>
                <div>
                    <label id="label-email" htmlFor="email">Email</label><br />
                    <input type="email" id="input-email" onChange={(e) => setEmail(e.target.value)} onFocus={() => EmailFocused()} onBlur={(input) => EmailBlured(input)} name="email" required />
                </div>
                <div>
                    <label id="label-password" htmlFor="password">Password</label><br />
                    <input type={showPassword ? "text" : "password"} id="input-password" onChange={(e) => setPassword(e.target.value)} onFocus={() => PasswordFocused()} onBlur={(input) => PasswordBlured(input)} name="password" required />
                    <input type="text" id="input-show" value={showPassword ? "Hide" : "Show"} onClick={() => {setShowPassword(!showPassword)}} readOnly></input>
                </div>
                <div>
                    <br />
                    <p style={{fontStyle: "italic", color: "red"}}>Forgot your password? <a style={{textDecoration: "underline"}} href="/auth/change-password">Click here</a> to change it.</p>
                </div>
            </section>
            <section>
                <button type="button" onClick={() => location.href='/'}>Cancel</button><input onClick={HandlerSubmit} type="submit" value="Sign In" />
            </section>
        </form>
	</div>
    );
}

export default SignIn;