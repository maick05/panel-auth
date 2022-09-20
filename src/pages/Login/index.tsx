import { useEffect, useState } from "react";
import style from "./Login.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { LoginService } from "../../services/login.service";
import { Loading } from "../../components/Loading";
import { RecoilRoot, useRecoilValue } from "recoil";
import { isLoading } from "../../states/atoms/atom";
import classNames from 'classnames';
import { useSetLoading } from "../../states/hooks/useSetLoading";
import { useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("email");
    const [password, setPassword] = useState("password");
    const useIsLoading = useRecoilValue(isLoading);
    const setLoading = useSetLoading();


    useEffect(() => {
        setEmail("maick@devseeder.com");
        setPassword("cosmos#1797");
    }, []);

    const makeLogin = async () => {
        setLoading(true);

        const loginService = new LoginService();
        const res = await loginService.login(email, password);

        if (!res.success) {
            alert(res.message);
            return;
        }

        setLoading(false);
        navigate('/users', { replace: true })
    }

    return (
        <RecoilRoot>
            <div className={style.Auth_form_container}>
                <form className={classNames({
                    [style.Auth_form]: true
                })}>

                    <div className={classNames({
                        [style.Auth_form_content]: true,
                        [style.loadingImg]: true
                    })}>
                        {useIsLoading ? <Loading /> :
                            <>
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
                            </>
                        }
                    </div>
                </form>
            </div>
        </RecoilRoot >
    );
}