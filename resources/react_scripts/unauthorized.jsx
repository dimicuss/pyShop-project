( ($) => {

	class Banner extends React.Component {
		constructor() {
			super()
			setTimeout(() => window.location = '/', 3000)
		}
		render() {
			return (
				<h1>401 Unauthorized</h1>)
		}
	}


	$(() => {
		ReactDOM.render(
			<div className="col-lg-12 col-centered well bs-component">
				<Banner/>
			</div>,
			document.querySelector( '#react-container' )
		)
	})
})(jQuery)
