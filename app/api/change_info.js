import url from '../config/handle';

const changeInfo = (token, name, phone, address) => (
    fetch(url.changeInfoUrl,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token, name, phone, address })
    })
    .then(res => res.text())
);

module.exports = changeInfo;
