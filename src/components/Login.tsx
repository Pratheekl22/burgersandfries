import {beginAuthWorkflow } from "../utils/auth/authService";



const Login = () => {

    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={beginAuthWorkflow}>Login</button>
        </div>
    );
};

export default Login;