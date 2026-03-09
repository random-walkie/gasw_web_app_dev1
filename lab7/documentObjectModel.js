"use strict"
//Finish your task1,2 here


let newsContent = document.getElementsByClassName("news_content")[0];

let colSymbol = document.querySelector(".col_symbol");

//Finish your task3 here


let newsHeader = document.getElementsByTagName("header")[0];


function collapseNews() {

    newsContent.classList.toggle("hidden");
}

colSymbol.addEventListener("click", collapseNews);
