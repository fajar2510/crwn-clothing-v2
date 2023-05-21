import { useState } from "react"
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils"
import { FormInput } from "../form-input/form-input.component"
import "./sign-in-form.styles.scss"
import { Button } from "../button/button.component"

const defaultFormFields = {
    email: '',
    password: '',
}

export const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup()
        await createUserDocumentFromAuth(user)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
            console.log(response)
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case "auth/user-not-found":
                    alert("User not found");
                    break;
                case "auth/wrong-password":
                    alert("Wrong password");
                    break;
                default:
                    console.log(error);
            };
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>



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

                <div className="button-container-sign-in">
                    <Button type="submit">Sign in</Button>

                    <Button type='button'
                        buttonType='google'
                        onClick={signInWithGoogle}>

                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    )
}