import React from "react";

function ErrorIcon({ children, ...props }) {
	return (
		<svg
			viewBox="0 0 20 20"
			width="20"
			height="20"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Error</title>
			<path
				d="M2.929 17.071c3.905 3.905 10.237 3.905 14.142 0 3.905-3.905 3.905-10.237 0-14.142-3.905-3.905-10.237-3.905-14.142 0-3.905 3.905-3.905 10.237 0 14.142zM9 5h2v6H9V5zm0 8h2v2H9v-2z"
				fill="currentColor"
				fillRule="evenodd"
				aria-hidden="true"
			/>
		</svg>
	);
}

export default function ErrorMessage() {
	return (
		<div className="p-5 text-orange-100 bg-orange-600 o-container sm:flex items-start">
			<div className="rounded-full inline-block border-8 border-orange-400 sm:mr-5">
				<ErrorIcon className="block" width="24" height="24" />
			</div>
			<p className="flex-grow">
				<strong className="text-white block text-lg">
					The night is dark and full of errors.
				</strong>{" "}
				<span className="italic">
					There was a problem loading this visualization. Check your internet
					connection and try reloading this page.
				</span>
			</p>
		</div>
	);
}
