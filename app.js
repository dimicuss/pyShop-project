const
	tools      = require('./tools/tools.js' ),
	express    = require('express' ),
	bodyParser = require('body-parser' ),
	port       = 8080,
	app        = express()


app.use(express.static('public/static'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}));


app.get('/', (req, res, next) => {
	res.format({
		html: tools.sendFile('public/pages/index.html', res)
	})
})


app.post('/auth', (req, res, next) => {
	console.log(req.body)
	res.redirect('/')
})


app.listen(port, (err) => {
	if(err) {
		console.error(err)
	}
	console.log(`App started on port ${port}`)
})