import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/SignIn.css";

const ChangePassword = ({ api }) => {

    const [email, setEmail] = useState("");

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

    const HandlerSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting:", email);
        const response = await axios.post(`${api}/user/${email}/pin`);
        if(response.data.success){
            location.href = '/auth/validate-pin?email=' + email;
        } else {
            alert("Something went wrong. Please try again.");
        }
        setEmail("");
        document.querySelector("form").reset();
    }

    return (
        <div id="main-content">
        <form>
            <h2>Change Password</h2>
            <section>
                <div>
                    <p>
                        In order to change your password, please <u>enter your email address</u> so that we send you a PIN and validate it.
                    </p>
                </div>
                <div>
                    <label id="label-email" htmlFor="email">Enter email</label><br />
                    <input type="text" id="input-email" onChange={(e) => setEmail(e.target.value)} onFocus={() => EmailFocused()} onBlur={(input) => EmailBlured(input)} name="email" required />
                </div>
            </section>
            <section>
                <input onClick={HandlerSubmit} type="submit" value="Send PIN" />
            </section>
        </form>
    </div>
    );
}

export default ChangePassword;