if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8486"));
}

var simpleleaseContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"leaseEnd","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"bid","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"auctionEnd","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"beneficiary","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tenantBid","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"leaseTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_leaseTime","type":"uint256"},{"name":"_place","type":"string"},{"name":"_leaseStart","type":"uint256"},{"name":"_leaseEnd","type":"uint256"}],"name":"SimpleAuction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"leaseStart","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"place","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"price","type":"uint256"}],"name":"refuse","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"tenant","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"bidder","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"BidIncreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"winner","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"AuctionEnded","type":"event"}]);
var flag2 = true;
web3.personal.unlockAccount(web3.eth.accounts[0], "123", 1000*60*60);
var Simplelease;
if (flag2) {
	Simplelease = simpleleaseContract.new(
		{
		    from: web3.eth.accounts[0], 
		    data: '0x6060604052341561000f57600080fd5b610b5d8061001e6000396000f3006060604052600436106100ba576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630cc63ea4146100bf5780631998aeef146100e85780632a24f46c146100f257806338af3eed146101075780633ccfd60b1461015c5780636e8b7ed0146101895780637f1c32a5146101b25780638453a00b146101db57806387822b621461025357806393cca9181461027c578063a60a07b21461030a578063adf0779114610322575b600080fd5b34156100ca57600080fd5b6100d2610377565b6040518082815260200191505060405180910390f35b6100f061037d565b005b34156100fd57600080fd5b610105610470565b005b341561011257600080fd5b61011a610652565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561016757600080fd5b61016f610677565b604051808215151515815260200191505060405180910390f35b341561019457600080fd5b61019c6107eb565b6040518082815260200191505060405180910390f35b34156101bd57600080fd5b6101c56107f1565b6040518082815260200191505060405180910390f35b34156101e657600080fd5b610251600480803590602001909190803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919080359060200190919080359060200190919050506107f7565b005b341561025e57600080fd5b61026661086f565b6040518082815260200191505060405180910390f35b341561028757600080fd5b61028f610875565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102cf5780820151818401526020810190506102b4565b50505050905090810190601f1680156102fc5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6103206004808035906020019091905050610913565b005b341561032d57600080fd5b610335610a66565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60045481565b600454421115151561038e57600080fd5b600060065414151561039f57600080fd5b600860009054906101000a900460ff161515156103bb57600080fd5b33600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550346006819055507fcf84a46a93294358c23e7c87e557feb461890c72f3547fb25b455167dcea9efb3334604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a1565b3373ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156104cb57600080fd5b6000600654141515156104dd57600080fd5b600860009054906101000a900460ff161515156104f957600080fd5b6001600860006101000a81548160ff0219169083151502179055506000600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060006006819055507fdaec4582d5d9595688c8c98545fdd1c696d41c6aeaeb636737e84ed2f5c00eda600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600654604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a16000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6006549081150290604051600060405180830381858888f19350505050151561065057600080fd5b565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000806000600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054141515156106c957600080fd5b600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060008111156107e2576000600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015156107e15780600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600091506107e7565b5b600191505b5090565b60065481565b60015481565b8342016001819055508260029080519060200190610816929190610a8c565b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081420160038190555080420160048190555050505050565b60035481565b60028054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561090b5780601f106108e05761010080835404028352916020019161090b565b820191906000526020600020905b8154815290600101906020018083116108ee57829003601f168201915b505050505081565b60006006541415151561092557600080fd5b3373ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561098057600080fd5b600860009054906101000a900460ff1615151561099c57600080fd5b80600654111515610a635760065460076000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055506000600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060006006819055505b50565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610acd57805160ff1916838001178555610afb565b82800160010185558215610afb579182015b82811115610afa578251825591602001919060010190610adf565b5b509050610b089190610b0c565b5090565b610b2e91905b80821115610b2a576000816000905550600101610b12565b5090565b905600a165627a7a723058203357239885d7a54af306f0a7e1a939afd6567d5006e52747b8708407b527a4940029', 
		    gas: '4700000'
	   	}, function (e, contract){
	    	console.log(e, contract);
	    	if (typeof contract.address !== 'undefined') {
	        	console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
	    	}
	})
}