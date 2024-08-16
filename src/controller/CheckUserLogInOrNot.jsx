


const CheckUserLogInOrNot = () =>{
    const userId = localStorage.getItem('userId');
    if (userId)
       return userId;
    else 
    window.location.href = window.location.origin + '/';
}

export default CheckUserLogInOrNot;