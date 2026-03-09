"use strict"

// Task 1
let newsArticle = document.getElementById("news");
console.log(newsArticle);

let news_paragraph = document.getElementsByClassName("news_paragraph");
console.log(news_paragraph)

let news_paragragph_1 = document.getElementsByClassName("news_paragraph")[0];
console.log(news_paragragph_1);

let all_paragraphs = document.getElementsByTagName("p");
for (let i = 0; i < all_paragraphs.length; i++) {
    console.log(all_paragraphs[i].innerHTML);
}

// Log all child nodes of the body element
console.log(document.body.childNodes);

// Log the first and last child nodes of the body element
console.log(document.body.firstChild);
console.log(document.body.lastChild);

// Log the next sibling of the first header element
console.log(document.getElementsByTagName("header")[0].nextElementSibling);

// Log first element with class news_content
let firstNewsP = document.querySelector(".news_content p");
console.log(firstNewsP);

let newsContent = document.getElementsByClassName("news_content")[0];

let colSymbol = document.querySelector(".col_symbol");

// Task 2

// Select last paragraph within the news article
let lastNewsP = document.querySelector(".news_content p:last-child");
console.log(lastNewsP.innerText);
console.log(lastNewsP.innerHTML);
// remove the content of the lastNewsP element
lastNewsP.innerHTML = "";
// create the strong element
let strong = document.createElement("strong");
// fill the strong element with text
strong.innerHTML = "Updated";
// create the remaining text node for the lastNewsP element
let text = document.createTextNode(" text for the news article");
// append the strong element to the (now empty) lastNewsP element
lastNewsP.appendChild(strong);
// append the text node to the lastNewsP element
lastNewsP.appendChild(text);
lastNewsP.remove();

let newsHeader = document.querySelector(".news_header");
newsHeader.classList.add("arial");
console.log(newsHeader.classList);

// Task 3

function collapseNews() {
    if (colSymbol.textContent === "-") {
        colSymbol.textContent = "+";
    } else {
        colSymbol.textContent = "-";
    }

    newsContent.classList.toggle("hidden");
}

colSymbol.addEventListener("click", collapseNews);
