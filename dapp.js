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
        + ethereum.selectedAddress + '.'
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
		"The most recent entry accepted for it was was: " + firstWhatLastEntryCreated['content'];

    let lastWhatCreated = await whatIs.methods.whats(whatCount).call();
    document.getElementById('wi-lastwhatcreated').innerHTML =
		 "The most recent What created was: " + lastWhatCreated.name;

	let lastWhatFirstEntryCreated = await whatIs.methods.acceptedEntries(whatCount,1).call();
	document.getElementById('wi-lastwhatfirstentrycreated').innerHTML = 
		"The first entry created for it was: " + lastWhatFirstEntryCreated['content'];

	let lastWhatEntryCount = await whatIs.methods.acceptedEntriesCount(whatCount).call();
	let lastWhatLastEntryCreated = await whatIs.methods.acceptedEntries(whatCount,lastWhatEntryCount).call();
	document.getElementById('wi-lastwhatlastentrycreated').innerHTML = 
		"The most recent entry accepted for it was was: " + lastWhatLastEntryCreated['content'];
}

const wiWhatSummaryButton = document.getElementById('wi-whatsummarybutton');

wiWhatSummaryButton.onclick = async () => {
    console.log('you requested a summary of a specific what\'s state...');

    const wiWhatSummaryBox = document.getElementById('wi-whatsummarybox').value;

    document.getElementById('wi-whatname').innerHTML =
		 "Name: " + wiWhatSummaryBox;

    let id = await whatIs.methods.ids(wiWhatSummaryBox).call();
    if (id == 0){
        document.getElementById('wi-whatid').innerHTML =
		 "What ID: This What does not yet exist."

        } else {
        document.getElementById('wi-whatid').innerHTML =
            "ID: " + id;
        let what_first_entry = await whatIs.methods.acceptedEntries(id,1).call();
        document.getElementById('wi-whatcreator').innerHTML =
		 "Creator: " + what_first_entry['proposer'];
        document.getElementById('wi-whatcreatedtimestamp').innerHTML =
		 "Created timestamp: " + what_first_entry['proposedTimestamp'];
        document.getElementById('wi-whatfirstentry').innerHTML =
		 "First entry: " + what_first_entry['content'];
        let entriesProposedCount = await whatIs.methods.proposedEntriesCount(id).call();
        document.getElementById('wi-whatentriesproposedcount').innerHTML =
		 "Entries proposed: " + entriesProposedCount;
        let entriesAcceptedCount = await whatIs.methods.acceptedEntriesCount(id).call();
        document.getElementById('wi-whatentriesacceptedcount').innerHTML =
         "Entries accepted: " + entriesAcceptedCount;
        let what = await whatIs.methods.whats(id).call();
        let whatStateNum = what['state']
        if (whatStateNum == 0){whatState = 'Open'} else {whatState = 'Voting'}
        document.getElementById('wi-whatstate').innerHTML =
         "State: " + whatState;
        }
}

const wiCreateWhat = document.getElementById('wi-createWhat-button');

wiCreateWhat.onclick = async () => {
    const wiWhatName = document.getElementById('wi-createWhat-name-box').value;
    const wiWhatEntry = document.getElementById('wi-createWhat-entry-box').value;
    let checkID = await whatIs.methods.ids(wiWhatName).call();

    if (checkID == 0){
        document.getElementById('wi-createwhatresult').innerHTML =
        "What creation submitted. Transaction hash will show here ~20 seconds after you sign in MetaMask.";
        let tx = await whatIs.methods.createWhat(wiWhatName,wiWhatEntry).
        send({from: ethereum.selectedAddress});
        console.log("You created a What. Transaction ID will populate in a few secs.")
        document.getElementById('wi-createwhatresult').innerHTML =
        "Transaction hash: " + tx.transactionHash + ". You can check this out at https://rinkeby.etherscan.io/";
    } else {
        document.getElementById('wi-createwhatresult').innerHTML =
        "That What already exists!";
    }
    
}

const wiProposeEntry = document.getElementById('wi-proposeentry-button');

wiProposeEntry.onclick = async () => {
    const wiEntryWhatName = document.getElementById('wi-proposeentry-name-box').value;
    const wiEntry = document.getElementById('wi-proposeentry-entry-box').value;
    let checkID = await whatIs.methods.ids(wiEntryWhatName).call();
    let checkWhat = await whatIs.methods.whats(checkID).call();
    let checkState = checkWhat.state;

    if (checkID > 0 && checkState == 0){
        document.getElementById('wi-proposeentryresult').innerHTML =
        "Entry proposal submitted. Transaction hash will show here ~20 seconds after you sign in MetaMask.";
        let tx = await whatIs.methods.proposeEntry(wiEntryWhatName,wiEntry).
        send({from: ethereum.selectedAddress});
        console.log("You proposed an Entry. Transaction ID will populate in a few secs.")
        document.getElementById('wi-proposeentryresult').innerHTML =
        "Transaction hash: " + tx.transactionHash + ". You can check this out at https://rinkeby.etherscan.io/";
    } else if (checkID == 0) {
        document.getElementById('wi-proposeentryresult').innerHTML =
        "That What doesn't exist!";
    } else if (checkState != 0) {
        document.getElementById('wi-proposeentryresult').innerHTML =
        "That What is not in an Open state!";
    }
    
}

const wiVote = document.getElementById('wi-vote');

wiVote.onclick = async () => {
    const wiVoteWhatName = document.getElementById('wi-whatsummarybox').value;
    let checkID = await whatIs.methods.ids(wiVoteWhatName).call();
    let proposedEntryCount = await whatIs.methods.proposedEntriesCount(checkID).call();
    let checkWhat = await whatIs.methods.whats(checkID).call();
    let checkState = checkWhat.state;
    let checkOwnership = await whatIs.methods.ownership(checkID, ethereum.selectedAddress).call();
    let checkVoted = await whatIs.methods.voted(checkID, proposedEntryCount, ethereum.selectedAddress).call();

    if (checkID > 0 && checkState == 1 && checkOwnership > 0 && checkVoted == false){
        document.getElementById('wi-voteresult').innerHTML =
        "Vote submitted. Transaction hash will show here ~20 seconds after you sign in MetaMask.";
        let tx = await whatIs.methods.vote(wiVoteWhatName).
        send({from: ethereum.selectedAddress});
        console.log("You voted. Transaction ID will populate in a few secs.")
        document.getElementById('wi-voteresult').innerHTML =
        "Transaction hash: " + tx.transactionHash + ". You can check this out at https://rinkeby.etherscan.io/";
    } else if (checkID == 0) {
        document.getElementById('wi-voteresult').innerHTML =
        "That What doesn't exist!";
    } else if (checkState != 1) {
        document.getElementById('wi-voteresult').innerHTML =
        "That What is not in an Voting state!";
    } else if (checkOwnership == 0) {
        document.getElementById('wi-voteresult').innerHTML =
        "You're not entitled to vote because you haven't contributed to this What!";
    } else if (checkVoted != false) {
        document.getElementById('wi-voteresult').innerHTML =
        "You're not entitled to vote because you've already voted on this entry!";
    }
    
}

const wiGetAcceptedEntry = document.getElementById('wi-getacceptedentrybutton');

wiGetAcceptedEntry.onclick = async () => {
    const wiGetEntryWhat = document.getElementById('wi-whatsummarybox').value;
    let id = await whatIs.methods.ids(wiGetEntryWhat).call();
    const wiGetAcceptedEntryNumber = document.getElementById('wi-getacceptedentrybox').value;
    let entry = await whatIs.methods.acceptedEntries(id, wiGetAcceptedEntryNumber).call();
    if (entry.state == 2) {state = 'Proposed'} 
    else if (entry.state == 3) {state = "Accepted"}
    else if (entry.state == 3) {state = "Rejected"}
    document.getElementById('wi-getacceptedentry-content').innerHTML =
        "Content: " + entry.content;
    document.getElementById('wi-getacceptedentry-state').innerHTML =
        "State: " + state;
    document.getElementById('wi-getacceptedentry-proposer').innerHTML =
        "Proposer: " + entry.proposer;
    document.getElementById('wi-getacceptedentry-timestamp').innerHTML =
        "Timestamp: " + entry.proposedTimestamp;
   
    
}

const wiGetProposedEntry = document.getElementById('wi-getproposedentrybutton');

wiGetProposedEntry.onclick = async () => {
    const wiGetEntryWhat = document.getElementById('wi-whatsummarybox').value;
    let id = await whatIs.methods.ids(wiGetEntryWhat).call();
    const wiGetProposedEntryNumber = document.getElementById('wi-getproposedentrybox').value;
    let entry = await whatIs.methods.proposedEntries(id, wiGetProposedEntryNumber).call();
    if (entry.state == 2) {state = 'Proposed'} 
    else if (entry.state == 3) {state = "Accepted"}
    else if (entry.state == 3) {state = "Rejected"}
    document.getElementById('wi-getproposedentry-content').innerHTML =
        "Content: " + entry.content;
    document.getElementById('wi-getproposedentry-state').innerHTML =
        "State: " + state;
    document.getElementById('wi-getproposedentry-proposer').innerHTML =
        "Proposer: " + entry.proposer;
    document.getElementById('wi-getproposedentry-timestamp').innerHTML =
        "Timestamp: " + entry.proposedTimestamp;
   
}

const wiReject = document.getElementById('wi-reject');

wiReject.onclick = async () => {
    const wiRejectWhatName = document.getElementById('wi-whatsummarybox').value;
    let checkID = await whatIs.methods.ids(wiRejectWhatName).call();
    let checkWhat = await whatIs.methods.whats(checkID).call();
    let checkState = checkWhat.state;

    if (checkID > 0 && checkState == 1 ){
        document.getElementById('wi-rejectresult').innerHTML =
        "Rejection submitted. Transaction hash will show here ~20 seconds after you sign in MetaMask.";
        let tx = await whatIs.methods.rejectEntry(wiVoteWhatName).
        send({from: ethereum.selectedAddress});
        console.log("You submitted a rejection. Transaction ID will populate in a few secs.")
        document.getElementById('wi-rejectresult').innerHTML =
        "Transaction hash: " + tx.transactionHash + ". You can check this out at https://rinkeby.etherscan.io/";
    } else if (checkID == 0) {
        document.getElementById('wi-rejectresult').innerHTML =
        "That What doesn't exist!";
    } else if (checkState != 1) {
        document.getElementById('wi-rejectresult').innerHTML =
        "That What is not in an Voting state!";
    } 
    
}



// const whatCount = document.getElementById('whatCount');
// const whatCountValue = whatIs.methods.whatCount().call();
// whatCount.innerHTML = "Here's the whatCount:" + whatCountValue

// const wiCreateWhat = document.getElementById('wi-createWhat-button');

