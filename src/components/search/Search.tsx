import { beginAuthWorkflow } from "../../auth/services/authService.ts";

const Search = () => {

    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={beginAuthWorkflow}>Login</button>
        </div>
    );
};

export default Search;