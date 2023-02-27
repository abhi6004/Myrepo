const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkbox = 1; 

handleSlider();

//set passwordLength
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator() {
    indicator.style.backgroundColor = color;
    //shadow
}

//get random intiger
function getRndInteger(min,max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomNumber() {
    return getRndInteger(0,9);
}

function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97,123));
}

function generateLowerCase() {
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol() {
    const rendumNum = getRndInteger(0,symbols.length);
    return symbols.charAt(rendumNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if(uppercaseCheck.chacked) hasUpper = true;
    if(lowercaseCheck.chacked) hasUpper = true;
    if(numbersCheck.chacked) hasUpper = true;
    if(symbolsCheck.chacked) hasUpper = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator('#0f0');
    } else if (
        (hasLower || hasLower) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
    ) {
        setIndicator('#ff0');
    } else {
        setIndicator('#f00');
    }
}

function copyContent() {
    try{
        await.navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "copied";
    }
   
}