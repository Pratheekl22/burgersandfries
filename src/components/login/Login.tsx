import { beginAuthWorkflow } from "../../auth/services/authService.ts";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const handleLoginPress = () => {
        beginAuthWorkflow()
        navigate('/dashboard');
    }

    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={handleLoginPress}>Login</button>
        </div>
    );
};

export default Login;