global.db = require('./server/database')

const
	express      = require('express' ),
	routes       = require('./server/routes')(express.Router),
	bodyParser   = require('body-parser' ),
	cookieParser = require('cookie-parser'),
	port         = 8080,
	app          = express()


app.use(express.static('public/static'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}));


app.use(routes)

app.listen(port, (err) => {
	if(err) {
		console.error(err)
	}
	console.log(`App started on port ${port}`)
})