"use strict";

/* `````` SELECTORS `````` */
// BUTTONS
const btnAll = document.querySelectorAll(".btn");
const btnReset = document.querySelector(".btn-reset");

// INPUTS
const inputBill = document.querySelector(".bill-input");
const inputPeople = document.querySelector(".people-input");
const inputCustom = document.querySelector(".custom-input");

// OUTPUTS
const outputTip = document.querySelector(".tip-value");
const outputTotal = document.querySelector(".total-value");

/* `````` FUNCTIONS `````` */

const getTip = function (bill, people, tip) {
    let result = (bill / people) * (tip / 100);
    result = result.toFixed(2);
    return result;
};

const getTotal = function (bill, people, tip) {
    let result = bill / people + (bill / people) * (tip / 100);
    result = result.toFixed(2);
    return result;
};

const updateOutput = function (tip, total) {
    outputTip.innerHTML = tip;
    outputTotal.innerHTML = total;
    btnReset.classList.add("active");
};

const reset = function () {
    // Remove active class from buttons
    btnAll.forEach((btn) => btn.classList.remove("active"));
    // Remove self active class
    btnReset.classList.remove("active");

    // Reset input
    inputBill.value = "";
    inputPeople.value = "";
    inputCustom.value = "";

    // Reset output
    outputTip.innerHTML = "0.00";
    outputTotal.innerHTML = "0.00";
};

/* `````` EVENT LISTENERS `````` */

btnAll.forEach((btn) => {
    btn.addEventListener("click", function () {
        // Remove active class from previous buttons
        btnAll.forEach((btn) => btn.classList.remove("active"));

        const tip = getTip(
            Number.parseFloat(inputBill.value),
            Number.parseFloat(inputPeople.value),
            Number.parseInt(btn.textContent)
        );

        const total = getTotal(
            Number.parseFloat(inputBill.value),
            Number.parseFloat(inputPeople.value),
            Number.parseInt(btn.textContent)
        );

        if (tip !== "NaN" && total !== "NaN" && tip > 0 && total > 0) {
            updateOutput(tip, total);
            // Add/Remove Classes
            btn.classList.add("active");

            if (inputBill.classList.contains("error")) {
                inputBill.classList.remove("error");
            }
            if (inputPeople.classList.contains("error")) {
                inputPeople.classList.remove("error");
            }
        } else {
            inputBill.classList.add("error");
            inputPeople.classList.add("error");
        }
    });
});

// CUSTOM INPUT
inputCustom.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        const tip = getTip(
            Number.parseFloat(inputBill.value),
            Number.parseFloat(inputPeople.value),
            Number.parseInt(inputCustom.value)
        );

        const total = getTotal(
            Number.parseFloat(inputBill.value),
            Number.parseFloat(inputPeople.value),
            Number.parseInt(inputCustom.value)
        );

        if (tip !== "NaN" && total !== "NaN" && tip > 0 && total > 0) {
            updateOutput(tip, total);
            inputCustom.blur();

            // Remove classes
            if (inputCustom.classList.contains("error")) {
                inputCustom.classList.remove("error");
            }
            if (inputBill.classList.contains("error")) {
                inputBill.classList.remove("error");
            }
            if (inputPeople.classList.contains("error")) {
                inputPeople.classList.remove("error");
            }
        } else {
            inputBill.classList.add("error");
            inputPeople.classList.add("error");
            inputCustom.classList.add("error");
        }
    }
});

// RESET BUTTON
btnReset.addEventListener("click", reset);

/* OLDER BROWSERS SUPPORT */

// for (let i = 0; i < btnAll.length; i++) {
//     btnAll[i].addEventListener("click", function () {
//         for (let i = 0; i < btnAll.length; i++) {
// Remove active class from previous buttons
//             btnAll[i].classList.remove("active");
//         }
// Add active class
//         btnAll[i].classList.add("active");

//         console.log(btnAll[i].textContent);
//         console.log(Number.parseFloat(inputBill.value));
//         console.log(Number.parseFloat(inputPeople.value));
//     });
// }
