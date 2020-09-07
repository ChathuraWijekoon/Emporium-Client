export const formatCurrency = (amount, baseCurrency='LKR') => {
    return amount?.toLocaleString('en-US', {
        style: 'currency',
        currency: baseCurrency,
    });
};

export const convertCurrency = async (amount, baseCurrency) => {
    const toCurrecy = (baseCurrency === 'LKR') ? 'USD' : 'LKR';
    const response = await fetch(`https://api.exchangerate.host/convert?from=${baseCurrency}&to=${toCurrecy}&amount=${amount}`);
    const { result } = await response.json();

    return result;
};
