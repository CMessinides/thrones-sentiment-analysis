import scoresUrl from "../data/mean-scores.json";
import React from "react";
import ReactDOM from "react-dom";

const manifest = {
	test: () => <div>Hello world!</div>
};

fetchJson(scoresUrl)
	.then(data => mountApps(manifest, { data }))
	.catch(error => mountApps(manifest, { error }));

class FetchError extends Error {}
function fetchJson(url) {
	return fetch(url)
		.then(resp => {
			return new Promise(resolve =>
				window.setTimeout(() => resolve(resp), 3000)
			);
		})
		.then(resp => {
			if (!resp.ok) {
				throw FetchError("Response not OK, status " + resp.status);
			}

			return resp.json();
		})
		.catch(e => {
			if (e instanceof FetchError) throw e;
			throw new FetchError("Encountered unexpected error: " + e);
		});
}

function mountApps(manifest, { data, error } = {}) {
	for (let id in manifest) {
		const Component = manifest[id];
		const root = document.getElementById(id);
		removeLoadingIndicator(root);
		ReactDOM.render(<Component data={data} error={error} />, root);
	}
}

function removeLoadingIndicator(rootEl) {
	const loader = rootEl.querySelector("[data-loading-indicator]");
	if (loader) rootEl.removeChild(loader);
}
