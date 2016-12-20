let fs = require('fs')

module.exports = {
	sendFile: (filename, res) => {
		return () => {
			fs.readFile(filename, (err, data) => {
				if(err) {
					return res.status(500).end()
				}

				res.send(data)
			})
		}
	}
}