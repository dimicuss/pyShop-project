const
	njwt         = require('njwt' ),
	secureRandom = require('secure-random' ),
	salt         = secureRandom(256, { type: 'Buffer' } ),

	middleware = [
		function (req, res, next) {  //Проверить наличие всех полей
			if(!req.body.login || !req.body.password) {
				return res.json({
					message: 'Field "Login" or "Password" not filled',
					status:  'error'
				})
			}
			next()
		},

		function (req, res, next) { //Проверить наличие юзера в бд и проверить пароль
			db.getUser(req.body.login, (err, user) => {
				if(err) {
					return res.json({
						message: err.message,
						status:  'error'
					})
				}

				if(user.password === req.body.password) {
					const
						claims = req.body,
						jwt    = njwt.create(claims, salt)

					res.cookie('token', jwt.compact())
					next()
				}

				else {
					return res.json({
						message: 'Invalid Password',
						status:  'error'
					})
				}
			})
		}
	]



module.exports = {
	middleware: function (fn) {
		return middleware.concat([ fn ])
	},


	checkAuthLogin: function (req, res, next) {
		let token = req.cookies ? req.cookies.token : null

		if(!token) {
			return next()
		}
		njwt.verify(token, salt, (err, jwt) => {
			if(err) {
				console.error(err)
				return next()
			}
			jwt.setSigningKey(salt)
			res.redirect('/notes')
		})
	},


	check: function (req, res, next) {
		let token = req.cookies ? req.cookies.token : null

		if(!token) {
			return res.redirect('/unauthorized')
		}
		njwt.verify(token, salt, (err, jwt) => {
			if(err) {
				console.error(err)
				return res.redirect('/unauthorized')
			}
			jwt.setSigningKey(salt)
			req.login = jwt.body.login
			next()
		})
	},


	drop: function (req, res) {
		let token = req.cookies.token

		njwt.verify(token, salt, (err, jwt) => {
			if(err) {
				console.error(err)
				return res.redirect('/unauthorized')
			}
			res.cookie('token', '')

			res.redirect('/login')
		})
	}
}