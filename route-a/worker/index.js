addEventListener("fetch", (event) => {
	let variable_a
	try {
		variable_a = MY_KEY_A
	} catch (error) {
		console.error(error)
	}
	event.respondWith(new Response('Hello from A! ' + JSON.stringify({ variable_a })))
})
