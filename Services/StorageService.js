var Storage = require('FuseJS/Storage');

var STORAGE_FILE = 'fuse-boilerplate-1.json';
var json = {};

Storage
	.read(STORAGE_FILE)
	.then(function(content) {
		json = JSON.parse(content);
	});

function save() {
	Storage.write(STORAGE_FILE, JSON.stringify(json));
}

module.exports = {
	get: function(key, defaultValue) {
		return json[key] || defaultValue;
	},

	set: function(key, value) {
		json[key] = value;
		save();
	}
};