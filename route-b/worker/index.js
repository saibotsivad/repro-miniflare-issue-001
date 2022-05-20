addEventListener("fetch", (event) => {
	const variable_b = MY_KEY_B
	event.respondWith(new Response('Hello from B! ' + JSON.stringify({ variable_b })))
})
