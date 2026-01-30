var transition_div = document.getElementsByClassName("transition")[0];

var search_params = new URLSearchParams(window.location.search);
switch (search_params.get("transition_direction")) {
	case "normal":
		transition_div.classList.add("transition_in");
		break;
	case "reverse":
		transition_div.classList.add("transition_reverse_in");
		break;
}

function transition(url) {
	transition_div.classList.add("transition_out");
	setTimeout(function() {
		location.href = url;
	}, 500);
}

function transition_reverse(url) {
	transition_div.classList.add("transition_reverse_out");
	setTimeout(function() {
		location.href = url;
	}, 500);
}

function transition_unknown_direction(from, to, url) {
	if (from <= to) {
		transition(url + "?transition_direction=normal");
	} else {
		transition_reverse(url + "?transition_direction=reverse");
	}
}