

const CurrencyFormatter = (amount) => {
    // console.log('amount is:- ', amount,' ', typeof amount);
    const formattedAmount = new Intl.NumberFormat('en-IN', {
      style: 'decimal',
    }).format(amount);
  
    return formattedAmount ;
};

export default CurrencyFormatter;

