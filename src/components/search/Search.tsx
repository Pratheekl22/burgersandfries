// @ts-ignore
import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { getAccessTokenValue } from "../../auth/services/tokenService.ts";
import { REDIRECT_URL_KEY } from "../../auth/constants/constants.ts";
import TextField from '@mui/material/TextField';
import './Search.css'
import SendIcon from '@mui/icons-material/Send';
import { IconButton, InputAdornment } from "@mui/material";
import {guardianNameRegex} from "../../search/constant/constants.ts";
import {getToken} from "../../auth/utils/tokenUtils.ts";
import {getPlayer} from "../../search/services/search.ts";

const Search = () => {
    const navigate = useNavigate()

    const [searchValue, setSearchValue] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [helperText, setHelperText] = useState('');

    const handleGetPress = () => {
        if (guardianNameRegex.test(searchValue)) {
            console.log(searchValue);
            const accessTokenValue = getAccessTokenValue();
            if (accessTokenValue === null) {
                const location = useLocation();
                sessionStorage.setItem(REDIRECT_URL_KEY, `${location.pathname}${location.search}`);
                navigate("/login");
            } else {
                console.log(getToken()?.bungieMembershipId)
                getPlayer(searchValue)
                //do API call stuff with access token value
            }
            setIsValid(true);
            setHelperText('');
        } else {
            setIsValid(false);
            setHelperText('All Bungie Names include a name followed by a hash and numeric ID');
        }
    }

    const handleEnterPress = (event: any) => {
        if (event.key === "Enter") {
            handleGetPress()
        }
    }

    return (
        <div className="search-container">
            <TextField
                className="search-bar"
                fullWidth
                id="GuardianSearch"
                label="Bungie Name"
                variant="outlined"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleEnterPress}
                error={!isValid}
                helperText={helperText}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleGetPress} edge="end">
                                <SendIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

export default Search;