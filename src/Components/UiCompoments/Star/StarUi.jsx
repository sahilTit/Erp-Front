import React, { useEffect, useState } from "react";
import './style.css'
import { toast } from "react-toastify";
import axios from "axios";
import { Space, Tooltip } from "antd";
import GetFavForm from "../../../Apis/GetFavForm";

const Star = ({ adrmRightId }) => {

    const [favPage, setFavPage] = useState(false);

    const userId = JSON.parse(localStorage.getItem('userId'));
    const checkFavPage = async () => {
        // const adrmRightId='6101';

        try {
            const result = await axios.post('/api/general/checkFav', { adrmRightId, userId });
            // console.log(result.data);
            if (result.data) {
                setFavPage(true);
            } else {
                setFavPage(false);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        checkFavPage();
    }, [])

    const markAsFav = async () => {
        setFavPage(!favPage);
        const res = await axios.post('/api/general/addFav', { adrmRightId, userId });
        const reslt = await GetFavForm(userId);
        // console.log(reslt);
        if (res.data === 'inserted')
            toast.success("Added To Favourites.");
        else
            toast.error("Removed From Favourites.");

        checkFavPage();
    }
    return (
        <Space wrap>
            <Tooltip title="Click to Mark as Favorites." color='#646b75' >
                <div className='star-rating' style={{ backgroundColor: favPage ? 'orange' : '#b3b5b4' }} onClick={markAsFav}></div>
            </Tooltip>
        </Space>
    )
}

export default Star;


