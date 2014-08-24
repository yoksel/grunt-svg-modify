var doc = document;

function showSizes() {
    var svgs = doc.querySelectorAll("svg");
    for (var i = 0; i < svgs.length; i++) {
        var svg = svgs[i];
        var width = svg.getAttribute("width");
        var height = svg.getAttribute("height");
        var sizes = "<span class=\"sizes\">" + width + "&times;" + height + "</span>";
        svg.parentNode.innerHTML += sizes;
    }
}

showSizes();