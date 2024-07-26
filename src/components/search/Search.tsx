import {useLocation, useNavigate} from "react-router-dom";
import {getAccessTokenValue} from "../../auth/services/tokenService.ts";
import {REDIRECT_URL_KEY} from "../../auth/constants/constants.ts";
import {getToken} from "../../auth/utils/tokenUtils.ts";

const Search = () => {
    const navigate = useNavigate()
    const handleGetPress = () => {
        const accessTokenValue = getAccessTokenValue();
        console.log(accessTokenValue);
        console.log(getToken()?.accessToken.name)
        console.log(getToken()?.accessToken.value)
        if(accessTokenValue === null) {
            const location = useLocation();
            sessionStorage.setItem(REDIRECT_URL_KEY, `${location.pathname}${location.search}`);
            navigate("/login");
        } else {
            //do API call stuff with access token value
        }
    }

    return (
        <div>
            <h1>Get profile</h1>
            <button onClick={handleGetPress}>Get</button>
        </div>
    );
};

export default Search;