var request = new XMLHttpRequest;
request.open("GET", "../navbar.html");
request.onload = function() {
    document.getElementById("navbar").innerHTML = this.responseText;
};
request.send();