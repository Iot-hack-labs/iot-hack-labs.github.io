const BASE_API_URL = "http://localhost:8307/api"

let inProgress = false

async function getPowerState(num) {
	let state = await $.getJSON(`${BASE_API_URL}/powerstrip/${num}`)
	return state.power
}

async function togglePowerState(num) {
	if (inProgress) {
		return
	}

	inProgress = true

	try {
		let currentState = await getPowerState(num)
		let resp = await $.ajax({
			url: `${BASE_API_URL}/powerstrip/${num}`,
			type: 'PUT',
			data: JSON.stringify({
				power: !currentState
			})
		});

		if (!currentState) {
			setButtonOff(num)
		} else {
			setButtonOn(num)
		}
	
		console.log(`Toggle power state of outlet ${num}:`)
		console.log(resp)
	} catch (error) {
		console.log(error)
	}

	inProgress = false
}

function setButtonOn(num) {
	let outlet = $(`[data-outlet=${num}]`)
	if (!outlet) {
		return
	}

	outlet.removeClass("tip warning").addClass("tip")
	let a = outlet.find("a").first()
	a.text("On")
}

function setButtonOff(num) {
	let outlet = $(`[data-outlet=${num}]`)
	if (!outlet) {
		return
	}

	outlet.removeClass("tip warning").addClass("warning")
	let a = outlet.find("a").first()
	a.text("Off")
}

$(async function() {
	let outlets = $('[data-outlet]')
	for (const o of outlets) {
		let outlet = $(o)
		let num = outlet.data("outlet")
		let power = await getPowerState(num)

		outlet.find("a").first().on("click", () => {
			togglePowerState(num)
		})
		
		if (power) {
			setButtonOff(num)
		} else {
			setButtonOn(num)
		}
	}
	
	// setInterval(() => this.location.reload(), 10000)
});