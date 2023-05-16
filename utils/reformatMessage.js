function reformatMsg(message) {
	let usermsg = message.content;
	usermsg = usermsg.slice(1);
	usermsg = usermsg.split(' ');
	return usermsg;
}

module.exports = { reformatMsg };