// alert('Hello!');
var submit = document.getElementById("submit");
var url = "https://aelf-public-node.aelf.io/api/blockChain/transactionResult?transactionId=";

var paymentAddress = 'JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE';
var pre_address = 'ELF_';
var post_address = '_AELF';
var final_address = pre_address + paymentAddress + post_address;

document.getElementById('addr').value = final_address;

submit.onclick = function(e) {
    e.preventDefault();
    var hashData = document.getElementById('hash').value;
    var urlsx = url + hashData;
    // console.log(urlsx);


    var paymentSuccessImage = '<img src="./img/sent.svg" alt="sent">';
    var PaymentSuccessTitle = '<h4>Payment Confirmed</h4>';
    var PaymentSuccessBtn = '<a href="#" id="close">Close Window</a>';
    var submitBtn = 'Close Window';

    var paymentFailedImage = '<img src="./img/failed.svg" alt="sent"><br />';
    var PaymentFailedTitle = '<h4>Payment Verification Failed</h4><br />';

    
    // Get Json data!
    // 95995ba731aa0b522186047e83494ad5d1d5059ec3c4fc497af779dab31970dd
    // JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE
    let xhr = new XMLHttpRequest();
    xhr.open("GET", urlsx);

    xhr.send();

    xhr.onload = () => {
        console.log(xhr.responseText);

        const obj = JSON.parse(xhr.responseText);
        console.log(obj.TransactionId);
        console.log(obj.Status);

        console.log(obj.Transaction.From);
        // console.log(obj.Transaction.To);
        let paidTo = pre_address + obj.Transaction.To + post_address;
        if (paidTo == final_address && obj.Status == 'MINED') {
            console.log('Payment Verified');

            $("#demo").append(paymentSuccessImage + PaymentSuccessTitle + PaymentSuccessBtn);
            document.getElementById('payment-hash').style.display = 'none';
            document.getElementById('payment-address').style.display = 'none';
            document.getElementById('close').value = submitBtn;
            document.getElementById('close').style.backgroundColor = 'Red';
            document.getElementById('close').style.marginTop = '50px';
        } else {
            console.log('Payment verification failed');

            $("#demo").append(paymentFailedImage + PaymentFailedTitle + PaymentSuccessBtn);
            document.getElementById('payment-hash').style.display = 'none';
            document.getElementById('payment-address').style.display = 'none';
            document.getElementById('close').value = submitBtn;
            document.getElementById('close').style.backgroundColor = 'Red';
            document.getElementById('close').style.marginTop = '50px';
        }
    };
    
}


