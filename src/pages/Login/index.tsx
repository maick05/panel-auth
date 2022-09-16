import { useEffect, useState } from "react";
import style from "./Login.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { LoginService } from "../../services/login.service";

export function Login() {
    const [email, setEmail] = useState("email");
    const [password, setPassword] = useState("password");

    useEffect(() => {
        setEmail("maick@devseeder.com");
        setPassword("cosmos#1797");
    }, []);

    const makeLogin = async () => {
        const loginService = new LoginService();
        const res = await loginService.login(email, password);

        if (!res.success) alert(res.message);

    }

    return (
        <div className={style.Auth_form_container}>
            <form className={style.Auth_form}>
                <div className={style.Auth_form_content}>
                    <h3 className={style.Auth_form_title}>
                        Login</h3>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="button" className="btn btn-primary" onClick={makeLogin}>
                            Sign In
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}