var flag = true;

function clear(parameters) {
    $("#Simple_Auction_content").text("Initialization: You can launch an auction.");
    $("#auctionEnd_content").text("AuctionEnd:");
    $("#beneficiary_content").text("No contract has been established yet.");
    $("#leaseTime_content").text("");
    $("#leaseStart_content").text("");
    $("#place_content").text("");
    $("#leaseEnd_content").text("");
    $("#tenant_content").text("");
    $("#tenantBid_content").text("");
    $("#balance_content").text("Balance:");
    $("#balanceadd_content").text("Balance Add:");

    document.getElementById("username").value="";
    document.getElementById("Loginpassword").value="";
    document.getElementById("Registerpassword").value="";
    document.getElementById("leaseTime").value="";
    document.getElementById("place").value="";
    document.getElementById("leaseStart").value="";
    document.getElementById("leaseEnd").value="";
    document.getElementById("refuse").value="";
    document.getElementById("bid").value="";
}

function login() {
    document.getElementById("address_content").style.display="none";
    document.getElementById("back").style.display="none";
    document.getElementById("init").style.display="block";
    document.getElementById("lease").style.display="none";
    document.getElementById("tenant").style.display="none";
    document.getElementById("routine").style.display="none";
    
} 

function lease() {
    document.getElementById("back").style.display="block";
    document.getElementById("address_content").style.display="block";
    document.getElementById("init").style.display="none";
    document.getElementById("lease").style.display="block";
    document.getElementById("tenant").style.display="none";
    document.getElementById("routine").style.display="block";
    if (!flag)
        $("#Simple_Auction_content").text("You've launched an auction.");
}

function tenant() {
    document.getElementById("address_content").style.display="block";
    document.getElementById("back").style.display="block";
    document.getElementById("init").style.display="none";
    document.getElementById("lease").style.display="none";
    document.getElementById("tenant").style.display="block";
    document.getElementById("routine").style.display="block";
}


if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8486"));
}

var account; // user
var simplelease = simpleleaseContract.at(Simplelease.address);

$("#Backbutton").click(function(){
    login();
    clear();
})

$("#Loginbutton").click(function() {
    var username = $("#username").val();
    var password = $("#Loginpassword").val();
    console.log(username);
    console.log(password);
    try {
        var tem = web3.personal.unlockAccount(username, password, 1000*60*60);
        account = username;
        $("#Login_content").text("Login: success");
        clear();
        $("#address_content").text("Your address:" + account);
        if($("input[type='radio']:checked").val() == "lease") {
            lease();
        } else {
            tenant();
        }
    } catch(err) {
        $("#Login_content").text("Login: fail. Wrong username or password.");
        console.log(err);
    };
})

$("#Registerbutton").click(function() {
    var password = $("#Registerpassword").val();
    console.log(password);
    try {
        account = web3.personal.newAccount(password);
        $("#Register_content").text("Register: success. " + account);
        console.log(account); 
        clear();
        $("#address_content").text("Your address:" + account);
        if($("input[type='radio']:checked").val() == "lease") {
            lease();
        } else {
            tenant();
        }
    } catch(err) {
        $("#Register_content").text("Register: fail.");
        console.log(err);
    };
})

$("#SimpleAuctionbutton").click(function() {
    simplelease = simpleleaseContract.at(Simplelease.address);
    if(parseFloat($("#leaseTime").val()).toString() != "NaN" && parseFloat($("#leaseStart").val()).toString() != "NaN" && parseFloat($("#leaseEnd").val()).toString() != "NaN" && $("#place").val().length != 0 && flag) {
        simplelease.SimpleAuction.sendTransaction($("#leaseTime").val(), $("#place").val(), $("#leaseStart").val(), $("#leaseEnd").val(), {from:account, gas:200000});
        $("#Simple_Auction_content").text("Initialization: success.");
        console.log("SimpleAuction success");
        flag = false;
    } else if(!flag) {
        $("#Simple_Auction_content").text("Initialization: fail. You've launched an auction.");
    } else {
        $("#Simple_Auction_content").text("Initialization: fail. Incorrect format.");
    }
});

$("#Balancebutton").click(function() {
    var balance = web3.fromWei(web3.eth.getBalance(account));
    console.log(balance + "wei");
    $("#balance_content").text("Balance: " + balance.toString() + " wei");
})

$("#BalanceAddbutton").click(function() {
    var balance = web3.toWei(10, 'ether');
    web3.personal.unlockAccount(web3.eth.accounts[0], "123", 100);
    web3.eth.sendTransaction({from:web3.eth.accounts[0], to:account, value:balance});
    console.log(web3.fromWei(balance) + "wei");
    $("#balanceadd_content").text("Balance Add: " + web3.fromWei(balance).toString() + " wei");
})

$("#ContractInformationbutton").click(function() {
    if (!flag) {
        $("#beneficiary_content").text("Beneficiary: " + simplelease.beneficiary().toString());
        $("#leaseTime_content").text("LeaseTime: " + simplelease.leaseTime().toString());
        $("#leaseStart_content").text("LeaseStart: " + simplelease.leaseStart().toString());
        $("#place_content").text("Place: " + simplelease.place().toString());
        $("#leaseEnd_content").text("LeaseEnd: " + simplelease.leaseEnd().toString());
        $("#tenant_content").text("Tenant: " + simplelease.tenant().toString());
        $("#tenantBid_content").text("TenantBid: " + simplelease.tenantBid().toString());
    } else {
        $("#beneficiary_content").text("No contract has been established yet.");
        $("#leaseTime_content").text("");
        $("#leaseStart_content").text("");
        $("#place_content").text("");
        $("#leaseEnd_content").text("");
        $("#tenant_content").text("");
        $("#tenantBid_content").text("");
    }
})

$("#Refusebutton").click(function() {
    console.log(simplelease.tenantBid().toString());
    if(simplelease.tenantBid().toString() != "0") {
        if(parseFloat($("#refuse").val()).toString() != "NaN") {
            simplelease.refuse.sendTransaction($("#refuse").val(), {from:account, gas:200000});
            $("#refuse_content").text("Refuse: success.");
        } else {
            $("#refuse_content").text("Refuse: fail. Incorrect format.");
        }
    } else {
        $("#refuse_content").text("Refuse: fail. No bid has been made yet.");
    }
})

$("#AuctionEndbutton").click(function() {
    if (!flag) {
        simplelease.auctionEnd.sendTransaction({from:account, gas:200000});
        flag = true;
        $("#Simple_Auction_content").text("Initialization: You can launch an auction.");
        $("#auctionEnd_content").text("AuctionEnd: success. You can start a new auction.");
        $("#beneficiary_content").text("No contract has been established yet.");
        $("#leaseTime_content").text("");
        $("#leaseStart_content").text("");
        $("#place_content").text("");
        $("#leaseEnd_content").text("");
        $("#tenant_content").text("");
        $("#tenantBid_content").text("");
    } else {
        $("#auctionEnd_content").text("AuctionEnd: fail. No contract has been established yet.");
    }
    
});

$("#Withdrawbutton").click(function() {
    simplelease.withdraw.call({from:account, gas:200000},function(error, result){
        console.log(result);
        if(result) {
            simplelease.withdraw.sendTransaction({from:account, gas:200000});
            $("#withdraw_content").text("Withdraw: success.");
        } else {
            $("#withdraw_content").text("Withdraw: fail.");
        }
    });
})

$("#Bidbutton").click(function() {
    console.log($("#bid").val());
    if(simplelease.tenantBid().toString() == "0") {
        if(parseFloat($("#bid").val()).toString() != "NaN") {
            simplelease.bid.sendTransaction({from:account, gas:200000, value:$("#bid").val()})
            $("#bid_content").text("Bid: success.");
        } else {
            $("#bid_content").text("Bid: fail. Incorrect format.");
        }
    } else {
        $("#bid_content").text("Bid: fail. Someone has already made an offer.");
    }
})