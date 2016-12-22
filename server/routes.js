const
	tools = require('../tools/tools.js' ),
	auth  = require('./auth')


module.exports = function(routers) {
	let router = routers()

	router.get('/', (req, res) => {
		res.redirect('/login')
	})


	router.get('/login', auth.checkAuthLogin, (req, res) => {
		tools.withPage('login', (err, data) => {
			if(err) {
				res.status(500).end()
				return console.error(err)
			}
			res.set('Content-Type', 'text/html')
			res.send(data)
		})
	})


	router.get('/notes', auth.check, (req, res) => {
		tools.withPage('notes', (err, data) => {
			if(err) {
				res.status(500).end()
				return console.error(err)
			}
			res.set('Content-Type', 'text/html')
			res.send(data)
		})
	})


	router.get('/addNote', auth.check, (req, res) => {
		tools.withPage('addNote', (err, data) => {
			if(err) {
				res.status(500).end()
				return console.error(err)
			}
			res.set('Content-Type', 'text/html')
			res.send(data)
		})
	})


	router.post('/addNote', auth.check, (req, res) => {
		if(!req.body.name || !req.body.description) {
			return res.json({
				message: 'Field "Name" or "Description" not filled',
				status:  'error'
			})
		}

		const data = {
			name:        req.body.name,
			description: req.body.description,
			login:       req.login
		}

		db.addNote(data, err => {
			if(err) {
				res.json({
					message: err.message,
					status:  'error'
				})
			}
			res.json({
				message: 'Note successfully added',
				status:  'Ok'
			})
		})
	})


	router.post('/auth', auth.middleware((req, res) => {
		res.json({
			message: 'Auth Successful. You will be redirected.',
			status:  'Ok'
		})
	}))


	router.get('/unauthorized', (req, res) => {
		tools.withPage('unauthorized', (err, data) => {
			if(err) {
				res.status(500).end()
				return console.error(err)
			}
			res.set('Content-Type', 'text/html')
			res.send(data)
		})
	})


	router.get('/rows', auth.check, (req, res) => {
		db.getNotes(req.login, (err, rows) => {
			if(err) {
				res.status(500).end()
			}

			res.json(rows)
		})
	})


	router.get('/logout', auth.check, auth.drop)

	return router
}