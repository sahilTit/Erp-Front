import axios from "axios";
import Cookies from "js-cookie";


const handleLogout = async () => {
    try {
        axios.defaults.withCredentials = true;
        const result = await axios.get('/logout')
        if (result) {
            window.sessionStorage.clear('user');
            localStorage.removeItem('userId');
            localStorage.removeItem('userDetails');
            window.localStorage.clear();
            sessionStorage.clear();
            Cookies.remove('userInfo', { path: 'https://spacewoodofficesolutions.co.in:4000/' });
            Cookies.remove('connect.sid', { path: 'https://spacewoodofficesolutions.co.in:4000/' });
            window.location.href = window.location.origin + '/';
            window.location.reload();
            // window.close();
        }
    }
    catch (error) {
        console.log(error);
    }
}

export default handleLogout;