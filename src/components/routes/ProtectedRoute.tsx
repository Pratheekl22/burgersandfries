import { useLocation } from 'react-router-dom';
import React, {ReactNode} from "react";
import {REDIRECT_URL_KEY} from "../../auth/constants/constants.ts";
import {beginAuthWorkflow} from "../../auth/services/authService.ts";
import {getToken, hasValidRefreshToken} from "../../auth/utils/tokenUtils.ts";

interface ProtectedRouteProps {
    children: ReactNode; // Explicitly specify the type as ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const location = useLocation();
    const userToken = getToken();

    if (userToken === null || !hasValidRefreshToken(userToken)) {
        // Store the intended route in localStorage
        localStorage.setItem(REDIRECT_URL_KEY, `${location.pathname}${location.search}`);
        beginAuthWorkflow()
    }

    // Render the protected component if valid tokens exist
    return children;
};

export default ProtectedRoute;