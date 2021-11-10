console.log("why you snooping in console...")

const wiAddress = '0x309fFe17ca4c72dfB3405F917A0aCd593E8B0211'
const wiABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"what_id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"proposed_entry_id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"accepted_entry_id","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"string","name":"content","type":"string"},{"indexed":false,"internalType":"address","name":"proposer","type":"address"},{"indexed":false,"internalType":"uint256","name":"votesRequired","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"votesReceived","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"acceptedTimestamp","type":"uint256"}],"name":"LogEntryAccepted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"what_id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"proposed_entry_id","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"string","name":"entry","type":"string"},{"indexed":false,"internalType":"address","name":"proposer","type":"address"},{"indexed":false,"internalType":"uint256","name":"proposedTimestamp","type":"uint256"}],"name":"LogEntryProposed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"what_id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"proposed_entry_id","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"string","name":"content","type":"string"},{"indexed":false,"internalType":"address","name":"proposer","type":"address"},{"indexed":false,"internalType":"uint256","name":"votesRequired","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"votesReceived","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rejectedTimestamp","type":"uint256"}],"name":"LogEntryRejected","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"what_id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"proposed_entry_id","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"address","name":"voter","type":"address"},{"indexed":false,"internalType":"uint256","name":"votedTimestamp","type":"uint256"},{"indexed":false,"internalType":"bool","name":"pivotal","type":"bool"}],"name":"LogVoted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"string","name":"entry","type":"string"},{"indexed":false,"internalType":"address","name":"creator","type":"address"},{"indexed":false,"internalType":"uint256","name":"createdTimestamp","type":"uint256"}],"name":"LogWhatCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"acceptedEntries","outputs":[{"internalType":"string","name":"what","type":"string"},{"internalType":"string","name":"content","type":"string"},{"internalType":"enum WhatIs.State","name":"state","type":"uint8"},{"internalType":"address","name":"proposer","type":"address"},{"internalType":"uint256","name":"proposedTimestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"acceptedEntriesCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_entry","type":"string"}],"name":"createWhat","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getWhatCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"getWhatID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"ids","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxEntryBytes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"ownership","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_entry","type":"string"}],"name":"proposeEntry","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"proposedEntries","outputs":[{"internalType":"string","name":"what","type":"string"},{"internalType":"string","name":"content","type":"string"},{"internalType":"enum WhatIs.State","name":"state","type":"uint8"},{"internalType":"address","name":"proposer","type":"address"},{"internalType":"uint256","name":"proposedTimestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"proposedEntriesCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"rejectEntry","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"vote","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"voteDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"voted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"votes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"whatCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"whats","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"enum WhatIs.State","name":"state","type":"uint8"}],"stateMutability":"view","type":"function"}]
var web3 = new Web3(window.ethereum)
const whatIs = new web3.eth.Contract(wiABI,wiAddress)

window.addEventListener('load', function() {
    if (typeof this.window.ethereum !== 'undefined') {
        console.log('you have MetaMask. i ain\'t that impressed.')
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
    console.log('you clicked on connect to metamask. whatever...')
    await ethereum.request({method: 'eth_requestAccounts'})
    const mmCurrentAccount = document.getElementById('mm-current-account');
    mmCurrentAccount.innerHTML = "You're connected to MetaMask with this account: " 
        + ethereum.selectedAddress
}

const wiSummary = document.getElementById('wi-summary');

wiSummary.onclick = async () => {
    console.log('you requested a summary of the contract state...')

    let whatCount = await whatIs.methods.whatCount().call();
    document.getElementById('wi-whatcount').innerHTML =
		 "The current whatCount is: " + whatCount;

	let firstWhatCreated = await whatIs.methods.whats(1).call();
	document.getElementById('wi-firstwhatcreated').innerHTML =
		 "The first What created was: " + firstWhatCreated.name;

	let firstWhatFirstEntryCreated = await whatIs.methods.acceptedEntries(1,1).call();
	document.getElementById('wi-firstwhatfirstentrycreated').innerHTML = 
		"The first entry created for it was: " + firstWhatFirstEntryCreated['content'];

	let firstWhatEntryCount = await whatIs.methods.acceptedEntriesCount(1).call();
	let firstWhatLastEntryCreated = await whatIs.methods.acceptedEntries(1,firstWhatEntryCount).call();
	document.getElementById('wi-firstwhatlastentrycreated').innerHTML = 
		"The most recent entry created for it was was: " + firstWhatLastEntryCreated['content'];

    let lastWhatCreated = await whatIs.methods.whats(whatCount).call();
    document.getElementById('wi-lastwhatcreated').innerHTML =
		 "The most recent What created was: " + lastWhatCreated.name;

	let lastWhatFirstEntryCreated = await whatIs.methods.acceptedEntries(whatCount,1).call();
	document.getElementById('wi-lastwhatfirstentrycreated').innerHTML = 
		"The first entry created for it was: " + lastWhatFirstEntryCreated['content'];

	let lastWhatEntryCount = await whatIs.methods.acceptedEntriesCount(whatCount).call();
	let lastWhatLastEntryCreated = await whatIs.methods.acceptedEntries(whatCount,lastWhatEntryCount).call();
	document.getElementById('wi-lastwhatlastentrycreated').innerHTML = 
		"The most recent entry created for it was was: " + lastWhatLastEntryCreated['content'];





}


// const whatCount = document.getElementById('whatCount');
// const whatCountValue = whatIs.methods.whatCount().call();
// whatCount.innerHTML = "Here's the whatCount:" + whatCountValue

// const wiCreateWhat = document.getElementById('wi-createWhat-button');

// wiCreateWhat.onclick = async () => {
//     const wiWhatName = document.getElementById('wi-createWhat-name-box').value;
//     console.log(wiWhatName)
//     const wiWhatEntry = document.getElementById('wi-createWhat-entry-box').value;
//     console.log(wiWhatEntry)
//     var web3 = new Web3(window.ethereum)
//     const whatIs = new web3.eth.Contract(wiABI,wiAddress)
//     await whatIs.methods.createWhat(wiWhatName,wiWhatEntry).
//         send({from: ethereum.selectedAddress})
// }