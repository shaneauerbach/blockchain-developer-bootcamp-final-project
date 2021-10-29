console.log("hello dapp developers!")

const ssAddress = '0x0489D7b3f9043202277e27dc6E6651798a165B80'

const ssABI = [
	{
		"inputs": [],
		"name": "retrieve",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

window.addEventListener('load', function() {
    if (typeof this.window.ethereum !== 'undefined') {
        console.log('You have MetaMask. I\'m not that impressed.')
        let mmDetected = document.getElementById('mm-detected')
        mmDetected.innerHTML = "MetaMask has been detected!"
    }

    else {
        console.log('MetaMask Not Available!')
        this.alert("You need to install MetaMask")
    }
})

const mmEnable = document.getElementById('mm-connect');

mmEnable.onclick = async () => {
    console.log('beep!')
    await ethereum.request({method: 'eth_requestAccounts'})
    const mmCurrentAccount = document.getElementById('mm-current-account');
    mmCurrentAccount.innerHTML = "Here's your current account:" 
        + ethereum.selectedAddress

}

const ssSubmit = document.getElementById('ss-input-button');

ssSubmit.onclick = async () => {
    const ssValue = document.getElementById('ss-input-box').value;
    console.log(ssValue)
    var web3 = new Web3(window.ethereum)
    const simpleStorage = new web3.eth.Contract(ssABI,ssAddress)
    await simpleStorage.methods.store(ssValue).
        send({from: ethereum.selectedAddress})
}