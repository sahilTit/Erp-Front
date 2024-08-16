// RateAnxPrint


import axios from 'axios';
import { toast } from 'react-toastify';
import img from '../assets/favicon.png'


const RateAnxPrint = async (repType, repName, repPath, param) => { 
    console.log(repType, repName, repPath, param);  
    try {
        if (repType === 'H') {
            const resp = await axios.post('/api/jasper/getJpPrint', { repType, repPath, param }, { responseType: 'html' });
            const newWindow = window.open();
            newWindow.document.open();
            newWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                <link rel="icon" href="${img}" type="image/x-icon">
                <title>${param.MP_REPORTNAME}</title>
                    <style>                   
                    body {                      
                        align-items: center;
                        justify-content: center;
                    }
                    .content-container{
                        font-size: 20px !important;
                        line-height: 0.2 !important;
                        width: 100vw; 
                        box-sizing: border-box;
                        overflow-x: auto;
                        overflow-y: auto;
                    }
                    </style>
                </head>
                <body>
                    <div class="content-container">
                        ${resp.data}
                    </div>
                </body>
                </html>
            `);
            newWindow.document.close();
        }
        else {
            const resp = await axios.post('/api/jasper/getJpPrint', { repType, repPath, param }, {
                responseType: 'blob', // Set the responseType to 'blob'                
            });
            // Creating new object of PDF file
            const fileURL = window.URL.createObjectURL(resp.data); // Use resp.data as the blob
            // Setting various property values
            let alink = document.createElement('a');
            alink.href = fileURL;
            let logoImg = document.createElement('img');
            logoImg.src = '../assets/favicon.png'; // Replace with the actual path to your logo image
            logoImg.alt = param.MP_REPORTNAME;

            document.title = repName;

            if (repType === 'E') {
                alink.download = repName + '.xlsx';
            } else if (repType === 'P') {
                alink.download = repName + '.pdf';
            }
            alink.click();
        }
        return true;
    } catch (error) {
        toast.error('Error:', error);
    }
};

export default RateAnxPrint