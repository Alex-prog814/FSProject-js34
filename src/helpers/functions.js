import axios from 'axios';
import { API } from './consts';

export const addDataToLocalStorage = (userEmail, tokens) => {
    localStorage.setItem('account', JSON.stringify(userEmail));
    localStorage.setItem('tokens', JSON.stringify(tokens));
};

export const updateToken = () => {
    console.log('WORK');
    const updateFunc = setInterval(async () => {
        const tokens = JSON.parse(localStorage.getItem('tokens'));
        if(!tokens) return clearInterval(updateFunc);
        const Authorization = `Bearer ${tokens.access}`;
        const res = await axios.post(`${API}/account/token/refresh/`, { refresh: tokens.refresh }, { headers: { Authorization } });
        localStorage.setItem('tokens', JSON.stringify({ refresh: tokens.refresh, access: res.data.access }));
    }, 1000 * 60 * 4);
};

export const logout = () => {
    localStorage.removeItem('account');
    localStorage.removeItem('tokens');
};

export const isUserLogin = () => {
    const user = localStorage.getItem('account');
    if(!user) return false;
    return true;
};

export const getAuthConfig = () => {
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    if(!tokens) return false;
    const Authorization = `Bearer ${tokens.access}`;
    const config = {
        headers: {
            Authorization
        }
    };
    return config;
};