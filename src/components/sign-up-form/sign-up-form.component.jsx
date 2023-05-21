import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import { FormInput } from "../form-input/form-input.component"
import "./sign-up-form.styles.scss"
import { Button } from "../button/button.component"

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

export const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );

            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Email already in use");
            } else {
                console.log("user creation error", error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label={"Display Name"}
                    required onChange={handleChange}
                    type="text"
                    name="displayName"
                    value={displayName} />

                <FormInput
                    label={"Email"}
                    required onChange={handleChange}
                    type="email"
                    name="email"
                    value={email} />

                <FormInput
                    label={"Password"}
                    required onChange={handleChange}
                    type="password"
                    name="password"
                    value={password} />


                <FormInput
                    label={"Confirm Password"}
                    required onChange={handleChange}
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword} />

                <Button type="submit">Sign up</Button>
            </form>
        </div>
    )
}