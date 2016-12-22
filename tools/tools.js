const
	fs       = require('fs'),
	basePath = 'public/pages/index.html';

module.exports = {
	withPage: (name, fn) => {
		fs.readFile(basePath, (err, data) => {
			if(err) {
				return fn.call(null, err)
			}

			data = data.toString()
				.replace('%react_script%', name + '.js')

			fn.call(null, null, data)
		})
	}
}