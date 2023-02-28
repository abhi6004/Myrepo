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
let checkbox = 0; 

handleSlider();

//set passwordLength
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
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

function generateUpperCase() {
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

    if (uppercaseCheck.chacked) hasUpper = true;
    if (lowercaseCheck.chacked) hasUpper = true;
    if (numbersCheck.chacked) hasUpper = true;
    if (symbolsCheck.chacked) hasUpper = true;

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

//copy password
async function copyContent() {
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }

    //to make copy wala span visiable
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");  
    },2000);
} 

function shufflePassword(array) {
    //fisher yates method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

checkCount = 0;
function handleCheckBoxChange() {
    // checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked) {
            checkCount++;
        }
    });

    //spacial condition
    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change',handleCheckBoxChange);
})


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider(); 
})

copyBtn.addEventListener('click',() => {
    if(passwordDisplay.value) {
        copyContent();
    }
})

generateBtn.addEventListener('click',()=> {
    //none of thd checkbox are selected
    if(checkCount == 0) 
        return;

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    console.log("Starting the Journey");

    //remove old password
    password = "";

    //let`s put the stuff mentiond by checkboxes
    // if(uppercaseCheck.chacked) {
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.chacked) {
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.chacked) {
    //     password += generateRandomNumbers();
    // }

    // if(symbolsCheck.chacked) {
    //     password += generateSymbol();
    // }

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);


    //compulsory addition
    for(let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("COmpulsory adddition done");


    //remining addition
    for(let i = 0; i < passwordLength-funcArr.length;i++) {
        let randIndex = getRndInteger(0, funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");

    //shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");

    //show in UI
    passwordDisplay.value = password;
    console.log("UI adddition done");
    //calculate strangth


})