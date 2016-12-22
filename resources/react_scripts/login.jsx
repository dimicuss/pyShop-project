(($) => {
	class FormSuccess extends React.Component {
		constructor() {
			super()
			setTimeout(() => location.reload(), 1000)
		}

		render() {
			return (
				<div className="col-lg-12">
					<div className="bs-component">
						<div className="alert alert-dismissible alert-success">
							<p>{this.props.message}</p>
						</div>
					</div>
				</div>
			)
		}
	}


	class FormError extends React.Component {
		render() {
			return (
				<div className="col-lg-12">
					<div className="bs-component">
						<div className="alert alert-dismissible alert-danger">
							<p>{this.props.message}</p>
						</div>
					</div>
				</div>
			)
		}
	}


	class FormInput extends React.Component {
		render() {
			return (
				<div className="form-group clearfix">
					<label htmlFor={this.props.id} className="col-md-10 control-label">{this.props.label}</label>

					<div className="col-lg-12">

						<input id={this.props.id}
									 className="form-control"
									 type={this.props.type}
									 placeholder={this.props.placeholder}
									 name={this.props.name}/>

					</div>
				</div>
			)
		}
	}


	class FormButtons extends React.Component {
		render() {
			return (
				<div className="form-group clearfix">
					<div className="col-md-12">
						<div className="col-md-6 col-sm-6 col-xs-6 col-no-padding">
							<button type="reset" className="btn btn-default">Cancel</button>
						</div>
						<div className="col-md-6 col-sm-6 col-xs-6 col-no-padding">
							<button onClick={this.props.submitClick} type="button" className="btn btn-primary">Submit</button>
						</div>
					</div>
				</div>
			)
		}
	}



	class Form extends React.Component {
		constructor() {
			super()
			this.state = {
				alertState: null
			}
			this.submitClick = this.submitClick.bind(this)
		}


		setAlert() {
			const
				alertState = this.state.alertState

			if(!alertState) {
				return
			}

			const
				message = alertState.message,
				status  = alertState.status

			if(status === 'error') {
				return (
					<FormError message={message}/>)
			}
			return(
				<FormSuccess message={message}/>)

		}


		submitClick() {
			const form = $('form').serialize()

			$.ajax({
				url:     this.props.url,
				type:    'post',
				data:    form,
				success: respond => {
					this.setState({
						alertState: respond
					})
				},
				error: (...rest) => {
					console.error(rest)
				}
			})
		}


		render() {
			return (
				<form action="/auth" method="post">
					<fieldset>
						<div className="form-group">
							{this.setAlert()}
						</div>
						<legend>Auth</legend>

						<FormInput type="text"
											 id="inputLogin"
											 placeholder="Login"
											 label="Login"
											 name="login"/>

						<FormInput type="password"
											 id="inputPassword"
											 placeholder="Password"
											 label="Password"
											 name="password"/>

						<FormButtons state={this.state} submitClick={this.submitClick}/>
					</fieldset>
				</form>
			)
		}
	}



	$(() => {
		ReactDOM.render(
			<div className="form-container clearfix">
				<div className="col-lg-3 col-md-5 col-sm-7 col-xs-11 col-centered well bs-component">
					<Form url="/auth"/>
				</div>
			</div>,
			document.querySelector( '#react-container' )
		);
	})
})(jQuery)