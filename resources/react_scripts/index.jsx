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



class Form extends React.Component {
	constructor() {
		super()
	}

	render() {
		return (
			<form action="/auth" method="post">
				<fieldset>
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
										 name="pass"/>

					<div className="form-group clearfix">
						<div className="col-md-12">
							<div className="col-md-6 col-no-padding">
								<button type="reset" className="btn btn-default">Cancel</button>
							</div>
							<div className="col-md-6 col-no-padding">
								<button type="submit" className="btn btn-primary">Submit</button>
							</div>
						</div>
					</div>

				</fieldset>
			</form>
		)
	}
}



window.onload = () => {
	ReactDOM.render(
		<div className="form-container clearfix">
			<div className="col-lg-3 col-centered well bs-component">
				<Form />
			</div>
		</div>,
		document.querySelector( '#react-container' )
	);
}
