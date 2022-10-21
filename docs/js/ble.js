const BASE_API_URL = "http://localhost:8307/api"

let isLoading = false
const onLabel = "Turn On"
const offLabel = "Turn Off"

async function getPowerState(num) {
	let state = await $.getJSON(`${BASE_API_URL}/powerstrip/${num}`)
	return state.power
}

async function togglePowerState(num) {
	if (isLoading) {
		return
	}

	isLoading = true
	showSpinner(num)

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

	isLoading = false
}

function setButtonOn(num) {
	let outlet = $(`[data-outlet=${num}]`)
	if (!outlet) {
		return
	}

	outlet.removeClass("tip warning").addClass("tip")
	let a = outlet.find("a").first()
	a.text(onLabel)
}

function setButtonOff(num) {
	let outlet = $(`[data-outlet=${num}]`)
	if (!outlet) {
		return
	}

	outlet.removeClass("tip warning").addClass("warning")
	let a = outlet.find("a").first()
	a.text(offLabel)
}

function showSpinner(num) {
	let outlet = $(`[data-outlet=${num}]`)
	if (!outlet) {
		return
	}

	let a = outlet.find("a").first()
	a.html(`<i class="fas fa-spinner fa-fw fa-spin"></i>`)
}

async function loadState() {
	let outlets = $('[data-outlet]')
	for (const o of outlets) {
		let outlet = $(o)
		let num = outlet.data("outlet")
		let power = await getPowerState(num)
		
		if (power) {
			setButtonOff(num)
		} else {
			setButtonOn(num)
		}
	}
}

$(async function() {
	try {
		await $.getJSON(`${BASE_API_URL}/ping`)
	} catch (error) {
		console.log("API not listening")
		return
	}

	$(".outlet-container").show()

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
	
	setInterval(loadState, 30000)
});