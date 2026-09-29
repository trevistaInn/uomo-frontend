import { useContext, useState } from "react"
import { StylesContext } from "../../contexts/StylesContext"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import BlackButton from "../../reusedComponents/BlackButton"
import styles from "./Navigation.module.css"
import useRegisterUser from "../../apis/registerUser";

export default function Register(){
    const { mutate, data, error, isError } = useRegisterUser(["users"])
    const { closePanel, openPanel } = useContext(StylesContext)
    const [showPassword, setShowPassword] = useState(false);
    const [userCredentials, setUserCredentials] = useState({name: "", email: "", password: "",});
    function handleRegister(){
        mutate(userCredentials)
        setUserCredentials({
            name: "",
            email: "",
            password: ""
        })
    }
    return(
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.head}>
                <p>CREATE AN ACCOUNT</p>
                <button onClick={closePanel} className={styles.close}>&#x1D5B7;</button>
                </div>

                <div className={styles.form}>
                <form>
                    <input type="text"
                        value={userCredentials.name}
                        onChange={(e) => setUserCredentials((prev) => ({
                            ...prev,
                            name: e.target.value
                        })
                        )} 
                        className={styles.input2} 
                        placeholder="name" 
                        required />
                    <input type="email"
                        value={userCredentials.email}
                        onChange={(e) => setUserCredentials((prev) => ({
                            ...prev,
                            email: e.target.value
                        }))} 
                        className={styles.input2} 
                        placeholder="Email address *" 
                        required />
                    <fieldset className={styles.fieldset}>
                        <legend className={styles.legend}>Password *</legend>
                        <div className={styles.passwordWrapper}>
                            <input
                            type={showPassword ? "text" : "password"}
                            className={styles.passwordInput}
                            value={userCredentials.password}
                            onChange={(e) =>
                                setUserCredentials((prev) => ({
                                ...prev,
                                password: e.target.value,
                                }))
                            }
                            placeholder="********"
                            required
                            />
            
                            <button
                            type="button"
                            className={styles.eyeButton}
                            onClick={() => setShowPassword((prev) => !prev)}
                            >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </fieldset>
                </form>

                <p className={styles.para1}>Your personal data will be used to support your experience throught this website, to manage access to your account, and for other purposes described in our privacy policy.</p>

                <p className={isError === true ? "text-red-500" : "text-green-500"}>{isError ? error?.message : data?.message}</p>
                <BlackButton onClick={handleRegister}>REGISTER</BlackButton>

                <p className={styles.para2}>Already have an account? <button onClick={() => openPanel("login")} className="underline cursor-pointer">Login</button></p>

                </div>
            </div>
        </div>
    )
}
