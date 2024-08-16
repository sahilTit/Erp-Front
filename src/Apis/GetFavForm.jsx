import axios from 'axios';
import { toast } from 'react-toastify';

const GetFavForm = async ( userId, setNewFav ) => {
    try {
        setNewFav(true);
        const response = await axios.post('/api/dashboard/favouritesFormList', { userId });
        if (response)
            return response.data;
        
    } catch (error) {
        toast.error(error);
    }
}

export default GetFavForm;