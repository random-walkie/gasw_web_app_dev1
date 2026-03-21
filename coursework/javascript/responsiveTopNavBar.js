function responsiveTopNavBar() {
    const x = document.getElementById("myTopnav");
    const icon = x.querySelector(".icon");
    const isExpanded = x.className !== "topnav";

    if (!isExpanded) {
        x.className += " responsive";
        icon.setAttribute("aria-expanded", "true");
    } else {
        x.className = "topnav";
        icon.setAttribute("aria-expanded", "false");
    }
}