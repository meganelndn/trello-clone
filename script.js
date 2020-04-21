"use strict";
document.addEventListener("DOMContentLoaded", init);

/* ---------- global variables -------- */
const endpoint = "https://frontendspring20-34e5.restdb.io/rest/trello";
const apiKey = "5e957564436377171a0c232c";
const template = document.querySelector("template");
const todoContainer = document.querySelector("#todo .cards");


function init() {
    setUpForm();
    getCards();
}

function setUpForm() {
    const form = document.querySelector("form");
    window.form = form;
    const elements = form.elements;
    window.elements = elements;

    form.setAttribute("novalidate", true);

    document.querySelector("#deadline").setAttribute("min", todayDate());


    elements.title.addEventListener("keyup", (e) => {
        if (e.keyCode === 9 || e.keyCode === 16) {

        } else {
            if (form.checkValidity()) {
                document.querySelector(".add-new").disabled = false;
            } else {
                document.querySelector(".add-new").disabled = true;
            }

            if (elements.title.value != "") {
                document.querySelector(".title-err").style.display = "none";
                elements.title.classList.add("valid");
                elements.title.classList.remove("invalid");
            } else {
                document.querySelector(".title-err").style.display = "block";
                elements.title.classList.remove("valid");
                elements.title.classList.add("invalid");
            }
        }
    })

    elements.description.addEventListener("keyup", (e) => {
        if (e.keyCode === 9 || e.keyCode === 16) {

        } else {
            if (form.checkValidity()) {
                document.querySelector(".add-new").disabled = false;
            } else {
                document.querySelector(".add-new").disabled = true;
            }

            if (elements.description.checkValidity()) {
                document.querySelector(".description-err").style.display = "none";
                elements.description.classList.add("valid");
                elements.description.classList.remove("invalid");
            } else {
                if (elements.description.validity.tooShort) {
                    document.querySelector(".description-err").textContent = "Please describe the task with more than 1 character.";
                } else {
                    document.querySelector(".description-err").textContent = "Please describe the task.";
                }

                document.querySelector(".description-err").style.display = "block";
                elements.description.classList.remove("valid");
                elements.description.classList.add("invalid");
            }
        }
    })

    elements.creator.addEventListener("change", () => {
        if (form.checkValidity()) {
            document.querySelector(".add-new").disabled = false;
        } else {
            document.querySelector(".add-new").disabled = true;
        }

        if (elements.creator.value != "") {
            document.querySelector(".creator-err").style.display = "none";
            elements.creator.classList.add("valid");
            elements.creator.classList.remove("invalid");
        } else {
            document.querySelector(".creator-err").style.display = "block";
            elements.creator.classList.remove("valid");
            elements.creator.classList.add("invalid");
        }
    })

    elements.deadline.addEventListener("keyup", (e) => {
        if (e.keyCode === 9 || e.keyCode === 16) {

        } else {
            if (form.checkValidity()) {
                document.querySelector(".add-new").disabled = false;
            } else {
                document.querySelector(".add-new").disabled = true;
            }

            if (elements.deadline.value != "") {
                document.querySelector(".deadline-err").style.display = "none";
                elements.deadline.classList.add("valid");
                elements.deadline.classList.remove("invalid");
            } else {
                document.querySelector(".deadline-err").textContent = "Please input the task deadline."
                document.querySelector(".deadline-err").style.display = "block";
                elements.deadline.classList.remove("valid");
                elements.deadline.classList.add("invalid");
            }
        }
    })

    elements.deadline.addEventListener("change", () => {
        if (form.checkValidity()) {
            document.querySelector(".add-new").disabled = false;
        } else {
            document.querySelector(".add-new").disabled = true;
        }

        if (elements.deadline.value != "") {
            document.querySelector(".deadline-err").style.display = "none";
            elements.deadline.classList.add("valid");
            elements.deadline.classList.remove("invalid");
        } else {
            document.querySelector(".deadline-err").style.display = "block";
            elements.deadline.classList.remove("valid");
            elements.deadline.classList.add("invalid");
        }
    })

    /* elements.color.addEventListener("change", () => {
        if (elements.color.value === "custom") {
            console.log("working")
            document.querySelector("#custom-color").style.display = "block";
        }
    }) */

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formValidity = form.checkValidity();
        if (formValidity) {
            const data = {
                title: elements.title.value,
                description: elements.description.value,
                creator: elements.creator.value,
                deadline: elements.deadline.value,
                deadline: elements.deadline.value,
                color: elements.color.value,
                dest: "todo"
            };

            clearForm();
            postCard(data);
        } else {
            console.log("Not valid form");
            if (!elements.title.checkValidity()) {
                elements.title.classList.remove("valid");
            }

            if (!elements.description.checkValidity()) {
                elements.description.classList.remove("valid");
            }

            if (!elements.creator.checkValidity()) {
                elements.creator.classList.remove("valid");
            }

            if (!elements.deadline.checkValidity()) {
                elements.deadline.classList.remove("valid");
            }
        }
    })
}

/* -------- clear form when submitted ------ */
function clearForm() {
    elements.title.value = "";
    elements.description.value = "";
    elements.creator.value = "";
    elements.deadline.value = "";
    elements.deadline.value = "";
    elements.color.value = "#000000";

    elements.title.classList.remove("valid");
    elements.description.classList.remove("valid");
    elements.creator.classList.remove("valid");
    elements.deadline.classList.remove("valid");
    elements.deadline.classList.remove("valid");
    elements.color.classList.remove("valid");

    document.querySelector(".add-new").disabled = true;
}

/* ---------- "GET" -------- */
function getCards() {
    fetch(endpoint, {
            method: "get",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apiKey": apiKey,
                "cache-control": "no-cache"
            }
        })
        .then(e => e.json())
        .then(e => showData(e));
}

/* ---------- "POST" -------- */
function postCard(data) {
    showCard(data);

    const postData = JSON.stringify(data);
    fetch(endpoint, {
            method: "post",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apiKey": apiKey,
                "cache-control": "no-cache"
            },
            body: postData
        })
        .then(e => e.json())
        .then(e => console.log(e));
}

/* ---------- "PUT" -------- */
function updateCard(id, data) {

    const postData = JSON.stringify(data);
    fetch(endpoint + "/" + id, {
            method: "put",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apiKey": apiKey,
                "cache-control": "no-cache"
            },
            body: postData
        })
        .then(e => e.json())
        .then(e => console.log(e));
}

function showData(data) {
    console.log(data);

    todoContainer.innerHTML = "";

    data.forEach(e => showCard(e));
}

/* ---------- template clone -------- */
function showCard(e) {
    let dest = e.dest;

    let clone = template.cloneNode(true).content;

    clone.querySelector(".card").dataset.id = e._id;
    clone.querySelector(".title").textContent = e.title;
    clone.querySelector(".description").textContent = e.description;
    clone.querySelector(".creator").textContent += e.creator;
    clone.querySelector(".deadline").textContent = " " + e.deadline;
    clone.querySelector(".deadline").textContent = " " + formatDate(e);
    clone.querySelector(".color").textContent = " " + e.color;

    clone.querySelector(`[data-action="edit"]`).addEventListener("click", e => getSingleCard(e._id, setUpFormForEdit));

    clone.querySelector(`[data-action="delete"]`).addEventListener("click", e => deleteCard(e._id));

    document.querySelector(".cards").appendChild(clone);
}

/* ---------- "DELETE" -------- */
function deleteCard(id) {

    document.querySelector(`article[data-id="${id}"]`).remove();

    fetch(endpoint + "/" + id, {
            method: "delete",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apiKey": apiKey,
                "cache-control": "no-cache"
            }
        })
        .then(e => e.json())
        .then(e => console.log(e));
}

function getSingleCard(id, callback) {
    fetch(endpoint + "/" + id, {
            method: "get",
            headers: {
                "accept": "application/json",
                "x-apikey": apiKey,
                "cache-control": "no-cache",
            }
        })
        .then(res => res.json())
        .then(data => callback(data));
}

function setUpFormForEdit(data) {
    const form = document.querySelector("form");

    form.dataset.state = "edit";
    form.dataset.id = data._id;

    //populate form with existing data again
    elements.title.value = data.title;
    elements.description.value = data.description;
    elements.creator.value = data.creator;
    elements.deadline.value = data.deadline;
    elements.color.value = data.color;

    /* form.elements.deadline.value = formatDate(e); */
}

/* ---------- drag n' drop -------- */
/* https://codepen.io/jdigi/pen/cqxCJ */
function dragStart(ev) {
    ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
    ev.dataTransfer.setDragImage(ev.target, 50, 50);
    return true;
}

// these functions prevents default behavior of browser
function dragEnter(ev) {
    ev.preventDefault();
    return true;
}

function dragOver(ev) {
    ev.preventDefault();
}

// function defined for when drop element on target
function dragDrop(ev) {
    var data = ev.dataTransfer.getData("Text");
    ev.target.appendChild(document.getElementById(data));
    ev.stopPropagation();
    return false;
}

function todayDate() {
    const currentDateTime = new Date();

    let month = (currentDateTime.getMonth() + 1);
    let day = currentDateTime.getDate();

    if (day.toString().length === 1) {
        day = "0" + day;
    }

    if (month.toString().length === 1) {
        month = "0" + month;
    }

    return currentDateTime.getFullYear() + "-" + month + "-" + day;
}

function formatDate(e) {
    let fullDate = e.deadline;
    let day = fullDate.substring(8, 10);
    let month = fullDate.substring(5, 7);

    return day + "/" + month;
}