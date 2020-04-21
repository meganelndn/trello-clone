"use strict";
document.addEventListener("DOMContentLoaded", init);

/* ----------------------- global variables ------------------------ */
const endpoint = "https://frontendspring20-34e5.restdb.io/rest/trello";
const apiKey = "5e957564436377171a0c232c";

function init() {
    setUpForm();
    getCards();
}

function setUpForm() {
    /* ------------ form & elements ----------- */
    const form = document.querySelector("form");
    window.form = form;
    const elements = form.elements;
    window.elements = elements;

    /* ---------- validation variables -------- */
    const titleErr = document.querySelector(".title-err");
    const descriptionErr = document.querySelector(".description-err");
    const creatorErr = document.querySelector(".creator-err");
    const deadlineErr = document.querySelector(".deadline-err");

    // delete default validation
    form.setAttribute("novalidate", true);
    // custom title validation
    elements.title.addEventListener("keyup", (e) => {
        if (e.keyCode === 9 || e.keyCode === 16) {

        } else {
            if (form.checkValidity()) {
                document.querySelector(".add-new").disabled = false;
            } else {
                document.querySelector(".add-new").disabled = true;
            }

            if (elements.title.value != "") {
                titleErr.style.display = "none";

                elements.title.classList.add("valid");
                elements.title.classList.remove("invalid");
            } else {
                titleErr.style.display = "block";

                elements.title.classList.remove("valid");
                elements.title.classList.add("invalid");
            }
        }
    })

    // custom description validation
    elements.description.addEventListener("keyup", (e) => {
        if (e.keyCode === 9 || e.keyCode === 16) {

        } else {
            if (form.checkValidity()) {
                document.querySelector(".add-new").disabled = false;
            } else {
                document.querySelector(".add-new").disabled = true;
            }

            if (elements.description.checkValidity()) {
                descriptionErr.style.display = "none";

                elements.description.classList.add("valid");
                elements.description.classList.remove("invalid");
            } else {
                if (elements.description.validity.tooShort) {
                    descriptionErr.textContent = "Please describe the task with more than 1 character.";
                } else {
                    descriptionErr.textContent = "Please describe the task.";
                }

                descriptionErr.style.display = "block";

                elements.description.classList.remove("valid");
                elements.description.classList.add("invalid");
            }
        }
    })

    // custom creator validation
    elements.creator.addEventListener("change", () => {
        if (form.checkValidity()) {
            document.querySelector(".add-new").disabled = false;
        } else {
            document.querySelector(".add-new").disabled = true;
        }

        if (elements.creator.value != "") {
            creatorErr.style.display = "none";

            elements.creator.classList.add("valid");
            elements.creator.classList.remove("invalid");
        } else {
            creatorErr.style.display = "block";

            elements.creator.classList.remove("valid");
            elements.creator.classList.add("invalid");
        }
    })

    // custom deadline date validation
    elements.deadline.addEventListener("keyup", (e) => {
        if (e.keyCode === 9 || e.keyCode === 16) {

        } else {
            if (form.checkValidity()) {
                document.querySelector(".add-new").disabled = false;
            } else {
                document.querySelector(".add-new").disabled = true;
            }

            if (elements.deadline.value != "") {
                deadlineErr.style.display = "none";

                elements.deadline.classList.add("valid");
                elements.deadline.classList.remove("invalid");
            } else {
                deadlineErr.textContent = "Please input the task deadline."
                deadlineErr.style.display = "block";

                elements.deadline.classList.remove("valid");
                elements.deadline.classList.add("invalid");
            }
        }
    })

    // custom deadline time validation
    elements.deadline.addEventListener("change", () => {
        if (form.checkValidity()) {
            document.querySelector(".add-new").disabled = false;
        } else {
            document.querySelector(".add-new").disabled = true;
        }

        if (elements.deadline.value != "") {
            deadlineErr.style.display = "none";

            elements.deadline.classList.add("valid");
            elements.deadline.classList.remove("invalid");
        } else {
            deadlineErr.style.display = "block";

            elements.deadline.classList.remove("valid");
            elements.deadline.classList.add("invalid");
        }
    })

    // when form is submitted...
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let validForm = true;

        const formElements = form.querySelectorAll("input");
        formElements.forEach(el => {
            el.classList.remove("invalid");
        })

        if (form.checkValidity() && validForm) {
            if (form.dataset.state == "post") {
                // send to database
                postCard({
                    title: elements.title.value,
                    description: elements.description.value,
                    creator: elements.creator.value,
                    deadline: elements.deadline.value,
                    color: elements.color.value,
                    dest: "todo"
                })
            } else {
                putCard({
                        title: elements.title.value,
                        description: elements.description.value,
                        creator: elements.creator.value,
                        deadline: elements.deadline.value,
                        color: elements.color.value,
                        dest: "todo"
                    },
                    form.dataset.id);
            }
            clearForm();
        }
    })
}

/* -------- clear form once submitted ------ */
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
                "accept": "application/json",
                "x-apiKey": apiKey,
                "cache-control": "no-cache"
            }
        })
        .then(res => res.json())
        .then(data => data.forEach(showCard));
}

/* ---------- "POST" -------- */
function postCard(payload) {
    const postData = JSON.stringify(payload);

    fetch(endpoint, {
            method: "post",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apiKey": apiKey,
                "cache-control": "no-cache"
            },
            body: postData,
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            showCard(data)
        });
}

/* ---------- "PUT" -------- */
function putCard(payload, id) {
    const postData = JSON.stringify(payload);

    fetch(endpoint + "/" + id, {
            method: "put",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apiKey": apiKey,
                "cache-control": "no-cache"
            },
            body: postData
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        });
}

const template = document.querySelector("template");
const todoContainer = document.querySelector("#todo .cards");

function showData(data) {
    console.log(data);

    todoContainer.innerHTML = "";

    data.forEach(data => showCard(data));
}

/* ---------- template clone -------- */
function showCard(card) {

    let clone = template.cloneNode(true).content;

    clone.querySelector(".card").dataset.id = card._id;
    clone.querySelector(".title").textContent = card.title;
    clone.querySelector(".description").textContent = card.description;
    clone.querySelector(".creator").textContent += card.creator;
    clone.querySelector(".deadline").textContent = card.deadline;
    clone.querySelector(".deadline").textContent = formatDate(card);
    /* clone.querySelector(".color").textContent = hexToRGB(color); */

    clone.querySelector(`[data-action="edit"]`).addEventListener("click", e => getSingleCard(card._id, setUpFormForEdit));
    clone.querySelector(`[data-action="delete"]`).addEventListener("click", e => deleteCard(card._id));

    document.querySelector(".cards").appendChild(clone);
}

/* ---------- "DELETE" -------- */
function deleteCard(id) {

    document.querySelector(`article[data-id="${id}"]`).remove();

    fetch(endpoint + "/" + id, {
            method: "delete",
            headers: {
                "accept": "application/json",
                "x-apiKey": apiKey,
                "cache-control": "no-cache"
            }
        })
        .then(res => res.json())
        .then(data => {});
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
    form.elements.title.value = data.title;
    form.elements.description.value = data.description;
    form.elements.creator.value = data.creator;
    form.elements.deadline.value = data.deadline;
    form.elements.color.value = data.color;
}

function formatDate(data) {
    let fullDate = data.deadline;
    let day = fullDate.substring(8, 10);
    let month = fullDate.substring(5, 7);

    return day + "/" + month;
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

/* -------- color label output ------ */
/* function hexToRGB(color) {
    let r = 0,
        g = 0,
        b = 0;

    // 3 digits
    if (color.length == 4) {
        r = "0x" + h[1] + h[1];
        g = "0x" + h[2] + h[2];
        b = "0x" + h[3] + h[3];

        // 6 digits
    } else if (color.length == 7) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
    }

    return "rgb(" + +r + "," + +g + "," + +b + ")";
} */