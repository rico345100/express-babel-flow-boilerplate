/* @flow */
function regenerate(req:Object): Promise<void|Error> {
	return new Promise((resolve, reject) => {
		req.session.regenerate((err) => {
			if(err) return reject(err);

			resolve();
		});
	});
}

function save(req:Object): Promise<void|Error> {
	return new Promise((resolve, reject) => {
		req.session.save((err) => {
			if(err) return reject(err);
			resolve();
		})
	});
}

function destroy(req:Object): Promise<void|Error> {
	return new Promise((resolve, reject) => {
		req.session.destroy((err) => {
			if(err) {
				return reject(err);
			}

			resolve();
		});
	});
}

module.exports = {
	regenerate: regenerate,
	save: save,
	destroy: destroy
};