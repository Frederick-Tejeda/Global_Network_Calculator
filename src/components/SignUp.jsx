import { useState, useEffect, use } from 'react';
import axios from 'axios';
import "../styles/SignUp.css";

const SignUp = ({ api }) => {

    useEffect(() => {
        localStorage.setItem('token', '');
	    localStorage.setItem('name', '');
    }, []);

    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const NameFocused = () => {
        const label = document?.getElementById("label-name");
        if(!label) return;
        label.style.top = "25px";
        label.style.fontSize = "10px";
        label.style.fontWeight = "bold";
    }

    const NameBlured = (input) => {
        const label = document?.getElementById("label-name");
        if(!label) return;
        if(input.target.value === ""){
            label.style.top = "50%";
            label.style.fontSize = "var(--text)";
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
            label.style.fontSize = "var(--text)";
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
            label.style.fontSize = "var(--text)";
            label.style.fontWeight = "normal";
        }
    }

    const HandlerSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting:", name, email, password);
        // const response = await axios.post(`${api}/user/create-user`, { name, email, password });
        // if(response.data.success){
        //     location.href = '/signin';
        // } else {
        //     alert("Something went wrong. Please try again.");
        // }
        setName("");
        setEmail("");
        setPassword("");
        document.querySelector("form").reset();
    }

    return (
        <div id="main-content">
        <form>
            <h2>Sign Up</h2>
            <section>
                <div>
                    <label id="label-name" htmlFor="name">Name</label><br />
                    <input type="text" id="input-name" onChange={(e) => setName(e.target.value)} onFocus={() => NameFocused()} onBlur={(input) => NameBlured(input)} name="name" required />
                </div>
                <div>
                    <label id="label-email" htmlFor="email">Email</label><br />
                    <input type="email" id="input-email" onChange={(e) => setEmail(e.target.value)} onFocus={() => EmailFocused()} onBlur={(input) => EmailBlured(input)} name="email" required />
                </div>
                <div>
                    <label id="label-password" htmlFor="password">Password</label><br />
                    <input type={showPassword ? "text" : "password"} id="input-password" onChange={(e) => setPassword(e.target.value)} onFocus={() => PasswordFocused()} onBlur={(input) => PasswordBlured(input)} name="password" required />
                    <input type="text" id="input-show" value={showPassword ? "Hide" : "Show"} onClick={() => {setShowPassword(!showPassword)}} readOnly></input>
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