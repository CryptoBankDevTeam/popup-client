
function TestURLQuery() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    
    console.log(window.location.href);
    // console.log(params);
    let addressName = params.amount;
    let senderEmail = params.email;
    let vendorCodeID = params.vendorID;
    document.getElementById('TotalAmount').innerHTML = addressName;
    document.getElementById('SenderEmail').innerHTML = senderEmail;
    document.getElementById('VendorID').innerHTML = vendorCodeID;
    // console.log(addressName);
    // console.log(param.trial);
}