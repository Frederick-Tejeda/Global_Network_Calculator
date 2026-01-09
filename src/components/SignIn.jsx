import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/SignIn.css";

const SignIn = ({ api }) => {

    useEffect(() => {
        localStorage.setItem('token', '');
	    localStorage.setItem('name', '');
    }, []);

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
        console.log("Submitting:", email, password);
        // const response = await axios.post(`${api}/user/validate`, { email, password });
        // if(response.data.success){
        //     localStorage.setItem('token', response.data.token);
        //     localStorage.setItem('name', JSON.stringify(response.data.name));
        //     location.href = '/';
        // } else {
        //     alert("Invalid email or password.");
        // }
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
            </section>
            <section>
                <button type="button" onClick={() => location.href='/'}>Cancel</button><input onClick={HandlerSubmit} type="submit" value="Sign In" />
            </section>
        </form>
	</div>
    );
}

export default SignIn;