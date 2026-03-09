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

//Finish your task3 here


let newsHeader = document.getElementsByTagName("header")[0];


function collapseNews() {

    newsContent.classList.toggle("hidden");
}

colSymbol.addEventListener("click", collapseNews);
