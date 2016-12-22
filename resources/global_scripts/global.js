(function () {

	function parseDiff(diff, dimensions) {
		let
			dimension = dimensions[ 0 ],
			dimTime   = Math.floor( diff / dimension );

		if (dimensions.length == 1) {
			return [ dimTime ]
		}
		return [ dimTime ].concat(
			parseDiff( diff - dimTime * dimension, dimensions.slice( 1 )));
	}

	let obj = {}
	obj.parseDate = function (timestamp) {
		const date = new Date();
		let h, min, s, y, mon, d, string;
		date.setTime( timestamp );

		d = date.getDate();
		mon = date.getMonth();
		y = date.getFullYear();
		h = date.getHours();
		min = date.getMinutes();
		s = date.getSeconds();

		string =
			(d < 10 ? '0' + d : d) + '.' +
			(mon < 10 ? '0' + mon : mon) + '.' +
			y + '  ' +
			(h < 10 ? '0' + h : h) + ':' +
			(min < 10 ? '0' + min : min) + ':' +
			(s < 10 ? '0' + s : s);

		return string;
	}

	obj.renderDiff = function (diff) {
		const
			date = new Date(),
			maxDaysInMonth = (new Date( date.getFullYear(), date.getMonth() + 1, 0 )).getDate(),
			dimensions = [
				365 * 24 * 60 * 60 * 1000,
				maxDaysInMonth * 24 * 60 * 60 * 1000,
				7 * 24 * 60 * 60 * 1000,
				24 * 60 * 60 * 1000,
				60 * 60 * 1000
			],
			pDiff = parseDiff( diff, dimensions ),
			string =
				pDiff[ 4 ] + ' hours, ' +
				pDiff[ 3 ] + ' days, ' +
				pDiff[ 2 ] + ' weeks, ' +
				pDiff[ 1 ] + ' months, ' +
				pDiff[ 0 ] + ' years';

		return string;
	};

	obj.toGMT = function (timestamp) {
		let date = new Date();
		date.setTime( timestamp );
		return date.getTime() - (date.getTimezoneOffset() * 60 * 1000);
	};

	window.TimeHelpers = obj
})()