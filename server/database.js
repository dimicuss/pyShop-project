const
	admin  = require( 'firebase-admin' ),
	config = require( '../config.json' ),

	app = admin.initializeApp({
		credential:  admin.credential.cert(config.credential),
		databaseURL: config.databaseURL
	}),

	db = app.database()

module.exports = {
	getUser: (login, cb) => {
		db.ref(`/users/${login}`).once('value')
			.then( snapshot => {
				let user = snapshot.val()

				if(!user) {
					let err = new Error('There is no such user')
					cb(err)
				}
				else {
					cb(null, snapshot.val())
				}
			})
			.catch( err => {
				cb(err)
			})
	},

	getNotes: function (login, cb) {
		db.ref('notes')
			.orderByChild('user')
			.equalTo(login)
			.once('value')
			.then( snapshot => {
				const notes = snapshot.exportVal()
				if(!notes) {
					let err = new Error(`There is no such note for user "${login}"`)
					return cb(err)
				}
				cb(null, notes)
			})
			.catch( err => {				cb(null, err)
			})
	},


	addNote: function (data, cb) {
		db.ref('/notes').push().set({
				created_at:  (new Date).getTime(),
				user:        data.login,
				name:        data.name,
				description: data.description
			})
			.then(  () => cb())
			.catch(err => cb(err))

	},

	deleteNote: function (key, cb) {
		db.ref(`/notes/${key}`).remove()
			.then(  () => cb())
			.catch(err => cb(err))
	}
}
