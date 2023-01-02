// Updates time displayed to reflect user selection
function selectionChange(e) {
    e.preventDefault();

    // Toggle active state for option selectors
    for (let el of document.querySelectorAll(".user .card-body p")) {
        el.classList.remove("active");
    }
    e.target.classList.add("active");

    // Update visible time elements on cards
    const mode = e.target.getAttribute("id");
    const times = document.querySelectorAll(".card .card-body p");
    for (let el of times) {
        if (el.classList.contains(mode)) {
            el.classList.remove("hide");
        } else {
            el.classList.add("hide");
        }
    }

}

// Fetch data to update times
fetch("./assets/data.json")
.then((data) => data.json())
.then((data) => {
    for (let item of data) {
        const id =item.title.toLowerCase().replace(" ","-");
        // console.log(item);
        for (let timeframe in item.timeframes) {
            current = item.timeframes[timeframe]["current"];
            previous = item.timeframes[timeframe]["previous"]; 
            const valueNodes = document.querySelectorAll(`.${id} .${timeframe}`);
            for (let el of valueNodes) {
                if (el.classList.contains("current")) {
                    el.innerText = current + (current == 1 ? "hr" : "hrs");
                } else if (el.classList.contains("previous")) {
                    el.innerText = ((timeframe == "daily") ? "Yesterday - " : (timeframe == "weekly") ? "Last Week - " : "Last Month - ") + previous + (previous == 1 ? "hr" : "hrs");
                } else {
                    console.log(el);
                }
            }
        }
    }
})

// Add event listeners to selection buttons
for (let el of document.querySelectorAll(".user .card-body p")) {
    el.addEventListener("click", selectionChange);
}

// document.getElementById("daily").click();

