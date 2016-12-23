(($) => {
	const { renderDiff, parseDate, toGMT } = window.TimeHelpers


	class ErrorMessage extends React.Component {
		render() {
			return (
				<div className="col-lg-8 col-no-padding">
					<div className="bs-component">
						<div className="alert alert-dismissible alert-danger">
							<p>{this.props.message}</p>
						</div>
					</div>
				</div>)
		}
	}


	class FilterBar extends React.Component {
		render() {
			return (
				<div className="col-lg-8 col-no-padding">
					<nav className="search-bar clearfix">
						<div className="search-bar__elm">
							<label htmlFor="column">Sort in</label>
							<input id="column" className="search-bar__input" type="text" placeholder="Column"/>
						</div>
						<div className="search-bar__elm">
							<label htmlFor="criterion">by</label>
							<input id="criterion" className="search-bar__input" type="text" placeholder="Criterion"/>
						</div>
						<div className="search-bar__elm _right">
							<input className="btn btn-default btn-xs btn-fix" type="button"
										 onClick={this.props.onSearch}
										 value="Search"/>
							<input className="btn btn-default btn-xs btn-fix" type="button"
										 onClick={this.props.onDropSearch}
										 value="Drop search"/>
						</div>
					</nav>
				</div>)
		}
	}



	class TableRows extends React.Component {
		constructor() {
			super()
			this.prevColor = null
			this.colors    = [
				'info', 'danger', 'warning', 'success'
			]
		}

		getRandomColor() {
			let color =
				this.colors[getRandomInt(0, this.colors.length)]

			if(color === this.prevColor) {
				return this.getRandomColor()
			}

			this.prevColor = color
			return color
		}

		renderRows() {
			const rows = this.props.rows
			return rows.map( (row, index) =>
				<tr key={index} className={this.getRandomColor()}>
					<td>{row.date}</td>
					<td>{row.passed}</td>
					<td>{row.name}</td>
					<td>{row.description}</td>
				</tr>)
		}

		render() {
			return(
				<tbody>{this.renderRows()}</tbody>)
		}
	}



	class Table extends React.Component {
		constructor() {
			super()
			this.state = {
				rowStates: [[]],
				error: null
			}
			this.columns =
				['name', 'passed', 'date', 'description']

			this.getRows()
		}

		getRows() {
			$.ajax({
				url:    '/rows',
				method: 'get',
				success: data => {
					this.pushRowState(
						this.prepareRows(toArray(data)) )
				},
				error: console.error.bind(console)
			})
		}

		prepareRows(rows) {
			return rows.map( (row) => {
				const
					date = parseDate(row.created_at),
					obj  = {}

				let diff =
					toGMT((new Date()).getTime()) -
					toGMT(row.created_at),
					passed = renderDiff(diff)

				obj.date   = date
				obj.passed = passed
				obj.name   = row.name
				obj.description = row.description
				return obj
			})
		}

		pushRowState(state) {
			const rowStates = this.state.rowStates
			this.setState({
				rowStates: rowStates.concat([ state ])
			})
		}

		getFirstRowsState() {
			const rowStates = this.state.rowStates.slice()
			return rowStates[1]
		}

		getLastRowsState() {
			const rowStates = this.state.rowStates
			return rowStates[rowStates.length - 1]
		}

		filterRows(column, criterion) {
			const
				baseRows = this.getFirstRowsState(),
				filtered = baseRows.filter( row => {
					console.log(row.name.indexOf(criterion))
					return row[column].indexOf(criterion) > -1
				})

			if(!filtered.length || criterion == '') {
				return this.setState({
					error: {
						message: 'No results for your query'
					}
				})
			}
			this.pushRowState(filtered)
		}

		onSearch() {
			const
				column    = $('#column').val().toLowerCase(),
				criterion = $('#criterion').val(),
				condition = this.columns.find( col => col === column )

			if(!condition) {
				return this.setState({
					error: {
						message: 'There is no such column'
					}
				})
			}
			this.filterRows(column, criterion)
		}

		onDropSearch() {
			this.setState({
				rowStates: [[], this.getFirstRowsState()],
				error: null
			})
		}

		setError() {
			if(this.state.error) {
				return <ErrorMessage message={this.state.error.message} />
			}
		}

		checkError() {
			if(this.state.error) {
				setTimeout( () => this.setState({
					error: null
				}), 2000 )
			}
		};

		render() {
			return (
				<div className="container">
					{this.checkError()}
					<h1>Notes</h1>
					{this.setError()}
					<FilterBar
						onSearch={this.onSearch.bind(this)}
						onDropSearch={this.onDropSearch.bind(this)} />
					<table className="table table-striped table-hover">
						<thead>
						<tr>
							<th>Date</th>
							<th>Passed</th>
							<th>Name</th>
							<th>Description</th>
						</tr>
						</thead>
						<TableRows rows={this.getLastRowsState()}/>
					</table>
					<a className="btn btn-primary" href="/addNote">Add</a>
					<a className="btn btn-primary _right" href="/logout">Logout</a>
				</div>)
		}
	}



	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function toArray(obj) {
		const arr = []
		for(let key in obj) {
			if(obj.hasOwnProperty(key)) {
				arr.push(obj[key])
			}
		}
		return arr
	}



	$(() => {
		ReactDOM.render(
			<Table />,
			document.querySelector( '#react-container' ))
	})
})(jQuery)