const { get } = require("https");

// alert('Hello!');
var submit = document.getElementById("submit");
var url = "https://aelf-public-node.aelf.io/api/blockChain/transactionResult?transactionId=";

var paymentAddress = 'JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE';
var pre_address = 'ELF_';
var post_address = '_AELF';
var final_address = pre_address + paymentAddress + post_address;

document.getElementById('addr').value = final_address;


function LaunchExtension() {
    const aelf = new window.NightElf.AElf({
        httpProvider: [
            'https://aelf-public-node.aelf.io',
        ],
        appName: 'CryptoBank Africa',
        // If you don't set pure=true, you will get old data structure which is not match aelf-sdk.js return.
        // v1.1.3  
        // 'http://127.0.0.1:8101',
        pure: true
    });

    // console.log(aelf);
    // aelf.chain.getChainStatus((error, result) => {
    //    console.log('>>>>>>>>>>>>> getChainStatus >>>>>>>>>>>>>');
    //    console.log(error, result);
    // });
    // console.log(aelf.getVersion()); // v1.1.3
    
    aelf.login({
        chainId: 'AELF',
        payload: {
            method: 'LOGIN',
            // no more need contracts
            // v1.1.3
            /* contracts: [{
                chainId: 'AELF',
                contractAddress: '4rkKQpsRFt1nU6weAHuJ6CfQDqo6dxruU3K3wNUFr6ZwZYc',
                contractName: 'token',
                description: 'token contract',
                github: ''
            }, {
                chainId: 'AELF TEST',
                contractAddress: '2Xg2HKh8vusnFMQsHCXW1q3vys5JxG5ZnjiGwNDLrrpb9Mb',
                contractName: 'TEST contractName',
                description: 'contract description',
                github: ''
            }] */
        }
    }, (error, result) => {
        console.log('login>>>>>>>>>>>>>>>>>>', result);
        // console.log(result.detail);
        var gap = '...';
        const obj = JSON.parse(result.detail);
        console.log(obj.address);

        var NightELFAddress = obj.address;
        var re1 = NightELFAddress.substring(0,6);
        var re2 = NightELFAddress.substring(43,49);
        var NightELFDisplayName = re1 + gap + re2;
        document.getElementById('aelfEX').value = NightELFDisplayName;
    });

}

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


