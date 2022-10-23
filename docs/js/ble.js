const api = {
	baseURL: "http://localhost:8307/api",
	ping: async () => {
		return await $.getJSON(`${api.baseURL}/ping`)
	},
	powerstrip: {
		get: async (num) => {
			let state = await $.getJSON(`${api.baseURL}/powerstrip/${num}`)
			return state.power
		},
		set: async (num, power) => {
			return await $.ajax({
				url: `${api.baseURL}/powerstrip/${num}`,
				type: 'PUT',
				data: JSON.stringify({
					power: power
				})
			});
		}
	},
	display: {
		send: async (num) => {
			return await $.post(`${api.baseURL}/display`, JSON.stringify({
				id: num
			}))
		}
	}
}

const dom = {
	button: {
		setText: (selector, text) => {
			let button = $(selector)
			if (!button) {
				return
			}
	
			let a = button.find("a").first()
			a.text(text)
	
			return button
		},
		showSpinner: (selector) => {
			let button = $(selector)
			if (!button) {
				return
			}
	
			let a = button.find("a").first()
			a.html(`<i class="fas fa-spinner fa-fw fa-spin"></i>`)
	
			return button
		},

	},
	outlet: {
		onLabel: "Turn On",
		offLabel: "Turn Off",

		on: function (num) {
			let outlet = dom.button.setText(`[data-outlet=${num}]`, this.onLabel)
			if (!outlet) {
				return
			}
		
			outlet.removeClass("tip warning").addClass("tip")
		},
		off: function (num) {
			let outlet = dom.button.setText(`[data-outlet=${num}]`, this.offLabel)
			if (!outlet) {
				return
			}
		
			outlet.removeClass("tip warning").addClass("warning")
		},
		getAll: () => {
			return $('[data-outlet]')
		}
	},
	message: {
		getAll: () => {
			return $('[data-message]')
		}
	},
	show: () => {
		$(".action-container").show()
	}
}

const app = {
	isLoading: false,

	toggleOutlet: async (num) => {
		if (app.isLoading) {
			return
		}
	
		app.isLoading = true
		dom.button.showSpinner(`[data-outlet=${num}]`)
	
		try {
			let currentState = await api.powerstrip.get(num)
			let resp = await api.powerstrip.set(num, !currentState)
	
			if (!currentState) {
				dom.outlet.off(num)
			} else {
				dom.outlet.on(num)
			}
		
			console.log(`Toggle power state of outlet ${num}:`)
			console.log(resp)
		} catch (error) {
			console.log(error)
		}
	
		app.isLoading = false
	},
	sendMessage: async (num) => {
		if (app.isLoading) {
			return
		}
		
		app.isLoading = true
	
		dom.button.showSpinner(`[data-message=${num}]`)
	
		try {
			let resp = await api.display.send(num)
	
			dom.button.setText(`[data-message=${num}]`, num)
		
			console.log(`Send message ${num}:`)
			console.log(resp)
		} catch (error) {
			console.log(error)
		}
	
		app.isLoading = false
	},
	load: async () => {
		if (app.isLoading) {
			return
		}

		app.isLoading = true
		let outlets = dom.outlet.getAll()
		try {
			for (const o of outlets) {
				let outlet = $(o)
				let num = outlet.data("outlet")
				let power = await api.powerstrip.get(num)
				
				if (power) {
					dom.outlet.off(num)
				} else {
					dom.outlet.on(num)
				}
			}
		} catch (error) {
			console.log(error)
		}

		app.isLoading = false
	}
}

$(async function() {
	try {
		await api.ping()
	} catch (error) {
		console.log("API not listening")
		return
	}

	dom.show()

	let outlets = dom.outlet.getAll()
	for (const o of outlets) {
		let outlet = $(o)
		let num = outlet.data("outlet")
		let power = await api.powerstrip.get(num)
			
		if (power) {
			dom.outlet.off(num)
		} else {
			dom.outlet.on(num)
		}

		outlet.find("a").first().on("click", () => {
			app.toggleOutlet(num)
		})
	}

	let messages = dom.message.getAll()
	for (const m of messages) {
		let message = $(m)
		let num = message.data("message")
		message.find("a").first().on("click", () => {
			app.sendMessage(num)
		})
	}
	
	setInterval(app.load, 30000)
});