import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ValidatePin.css";
const email = new URLSearchParams(window.location.search).get("email") || "";

const ValidatePin = ({ api }) => {
    const [pin, setPin] = useState("");

    const PinFocused = () => {
        const label = document?.getElementById("label-pin");
        if(!label) return;
        label.style.top = "25px";
        label.style.fontSize = "10px";
        label.style.fontWeight = "bold";
    }

    const PinBlured = (input) => {
        const label = document?.getElementById("label-pin");
        if(!label) return;
        if(input.target.value === ""){
            label.style.top = "50%";
            label.style.fontSize = "clamp(var(--min-text), var(--text), var(--max-text))";
            label.style.fontWeight = "normal";
        }
    }
    
    const HandlerSubmit = async (e) => {
        e.preventDefault();
        console.log("Validating PIN for:", email, pin);
        const response = await axios.get(`${api}/user/${email}/pin/${pin}`);
        if(response.data.success){
            sessionStorage.setItem('userToken', response.data.token);
            sessionStorage.setItem('userName', response.data.name);
            location.href = '/auth/new-password?email=' + email;
        } else {
            alert("Something went wrong. Please try again.");
        }
        setPin("");
        document.querySelector("form").reset();
    }

    return (
        <div id="main-content">
            <form>
                <h2>PIN Validation</h2>
                <section>
                    <div>
                        <label id="label-pin" htmlFor="pin">Enter PIN sent to {email}</label><br />
                        <input type="text" id="input-pin" onChange={(e) => setPin(e.target.value)} onFocus={() => PinFocused()} onBlur={(input) => PinBlured(input)} name="pin" required />
                    </div>
                </section>
                <section>
                    <input onClick={HandlerSubmit} type="submit" value="Validate PIN" />
                </section>
            </form>
        </div>
    );
}

export default ValidatePin;