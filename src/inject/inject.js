chrome.extension.sendMessage({}, function (response) {
	var readyStateCheckInterval = setInterval(function () {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			// ----------------------------------------------------------
			console.log("Bienvenido a AFIP para Chrome");
			// ----------------------------------------------------------

			var s = document.createElement('script');
			// TODO: add "script.js" to web_accessible_resources in manifest.json
			s.src = chrome.extension.getURL('src/script.js');
			s.onload = function () {
				this.remove();
			};
			(document.head || document.documentElement).appendChild(s);
		}
	}, 10);
});