let messages = [
    {
        id: 1,
        senderId: 3,
        receiverId: 2,
        text: 'hi all1'
    },
    {
        id: 2,
        senderId: 1,
        receiverId: 2,
        text: 'hi all2'
    },
    {
        id: 3,
        senderId: 3,
        receiverId: 1,
        text: 'hi all3'
    },
    {
        id: 4,
        senderId: 2,
        receiverId: 1,
        text: 'hi all4'
    }
]

function findMessage(id){
	const err = null;
	if (typeof id === 'undefined'){
		err = new Error('id is undefined');
	}

	let index;
	const message = messages.find((el, ind) => {
		if (el.id === id){
			index = ind;
			return true;
		} else {
			return false;
		}
	});
	return {message: message || "massage hasn't been found", index, err};
}

function findWhoTalked(id) {
    const err = null;
	if (typeof id === 'undefined'){
		err = new Error('id is undefined');
	}

	let talkedwith = [];
	messages.forEach((el, ind) => {
        if (!talkedwith.includes(el.senderId) && !talkedwith.includes(el.receiverId)) {
            if (el.senderId === id){
                talkedwith.push(el.receiverId);
            } else if (el.receiverId === id){
                talkedwith.push(el.senderId);
            }
        }
	});
    console.log(talkedwith)
	return {talkedwith, err};
}

module.exports = {
	findAll: (callback) => {
		callback(null, messages);
	},

	findOne: (id, callback) => {
		const {err, message} = findMessage(id);
		callback(err, message);
	},

	add: (message, callback) => {
		if (typeof message.id !== 'undefined'){
			messages.push(message);
			callback(null);
		} else {
			callback(new Error('message doesnt have id'));
		}
	},

	findOneAndDelete: (id, callback) => {
		let {err, message, index} = findMessage(id);
		if (typeof index !== 'undefined'){
			messages.splice(index, 1);
		} else {
			err = new Error('no message with such index');
		}
		callback(err);
	},

	findOneAndUpdate: (id, message, callback) => {
		const {err, index} = findMessage(id);
		messages[index] = Object.assign(messages[index], message);
		callback(err);
	},

    whoTalked: (id, callback) => {
		const {err, talkedwith} = findWhoTalked(id);
		callback(err, talkedwith);
	}
};
