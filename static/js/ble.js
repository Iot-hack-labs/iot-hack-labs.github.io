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
	showSpinner(`[data-outlet=${num}]`)

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
	let outlet = setButtonText(`[data-outlet=${num}]`, onLabel)
	if (!outlet) {
		return
	}

	outlet.removeClass("tip warning").addClass("tip")
}

function setButtonOff(num) {
	let outlet = setButtonText(`[data-outlet=${num}]`, offLabel)
	if (!outlet) {
		return
	}

	outlet.removeClass("tip warning").addClass("warning")
}

function showSpinner(selector) {
	let outlet = $(selector)
	if (!outlet) {
		return
	}

	let a = outlet.find("a").first()
	a.html(`<i class="fas fa-spinner fa-fw fa-spin"></i>`)
}

function setButtonText(selector, text) {
	let button = $(selector)
	if (!button) {
		return
	}

	let a = button.find("a").first()
	a.text(text)

	return button
}

async function sendMessage(num) {
	if (isLoading) {
		return
	}
	
	isLoading = true

	showSpinner(`[data-message=${num}]`)

	try {
		let resp = await $.ajax({
			url: `${BASE_API_URL}/display`,
			type: 'POST',
			data: JSON.stringify({
				id: num
			})
		});

		setButtonText(`[data-message=${num}]`, num)
	
		console.log(`Send message ${num}:`)
		console.log(resp)
	} catch (error) {
		console.log(error)
	}

	isLoading = false
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

	$(".action-container").show()

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

	let messages = $('[data-message]')
	for (const m of messages) {
		let message = $(m)
		let num = message.data("message")
		message.find("a").first().on("click", () => {
			sendMessage(num)
		})
	}
	
	setInterval(loadState, 30000)
});