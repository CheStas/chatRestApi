let users = [
    {
        id: 1,
        name: 'Pol',
        lastName: 'Polk',
        email: 'g@g.com',
        photo: 'http:ava.com/ava.png'
    },
    {
        id: 2,
        name: 'Pol2',
        lastName: 'Polk',
        email: 'g@g.com',
        photo: 'http:ava.com/ava.png'
    },
    {
        id: 3,
        name: 'Pol3',
        lastName: 'Polk',
        email: 'g@g.com',
        photo: 'http:ava.com/ava.png'
    },
    {
        id: 4,
        name: 'Pol4',
        lastName: 'Polk',
        email: 'g@g.com',
        photo: 'http:ava.com/ava.png'
    }
]

function findUser(id){
	const err = null;
	if (typeof id === 'undefined'){
		err = new Error('id is undefined');
	}

	let index;
	const user = users.find((el, ind) => {
		if (el.id === id){
			index = ind;
			return true;
		} else {
			return false;
		}
	});
	return {user: user || "user hasn't been found", index, err};
}

module.exports = {
	findAll: (callback) => {
		callback(null, users);
	},

	findOne: (id, callback) => {
		const {err, user} = findUser(id);
		callback(err, user);
	},

	add: (user, callback) => {
		if (typeof user.id !== 'undefined'){
			users.push(user);
			callback(null);
		} else {
			callback(new Error('user doesnt have id'));
		}
	},

	findOneAndDelete: (id, callback) => {
		let {err, user, index} = findUser(id);
		if (typeof index !== 'undefined'){
			users.splice(index, 1);
		} else {
			err = new Error('no users with such index');
		}
		callback(err);
	},

	findOneAndUpdate: (id, user, callback) => {
		const {err, index} = findUser(id);
		users[index] = Object.assign(users[index], user);
		callback(err);
	}
};
