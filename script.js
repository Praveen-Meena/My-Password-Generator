const inputSlider = document.querySelector("[data-lengthSlider]"); 
const lengthDisplay = document.querySelector("[data-lengthNumber]"); 

const passwordDisplay = document.querySelector("[data-passwordDisplay]"); 
const copyBtn = document.querySelector("data-copy"); 
const copyMsg = document.querySelector("data-copyMsg"); 
const uppercaseCheck = document.querySelector("uppercase"); 
const lowercaseCheck= document.querySelector("lowercase"); 
const symbolsCheck = document.querySelector("symbols"); 
const numbersCheck = document.querySelector("numbers"); 
const indicator = document.querySelector("[data-indicator]"); 
const generateBtn = document.querySelector(".generateButton"); 
const allcheckBox= document.querySelector("input[type=checkbox]"); 

const symbols = '~`!@#$%^&*()-_+={}[]\|:;"<>,.?/'; 

let password = ""; 
let passwordLength = 10; 
let checkCount = 1; 
// set strength color to white initially

slidehandler(); 

// set password length and slider position
function slidehandler() {
    inputSlider.value = passwordLength; 
    lengthDisplay.innerText = passwordLength; 
    // or bhi kuch karna hai ?
}

function setIndicator(color){ 
    indicator.style.backgroundColor = color; 
    // indicator.style.box-shadow = 0 0 50px color; 
}

function getRndInteger(){
    return Math.floor(Math.random() * (max-min)) + min;  
}

function generateRandomNumber(){
    return getRndInteger(0, 9); 
}

function generateRandomUppercase(){
    return String.fromCharCode.getRndInteger(65, 91); 
}

function generateRandomLowercase(){
    return String.fromCharCode.getRndInteger(97, 123); 
}

function generateRandomSymbol(){
    const rndsym = getRndInteger(0 , symbols.length); 
    return symbols.charAt(rndsym);
}

function calcStrength(){
    let hasUpper = false; 
    let hasLower = false; 
    let hasSym = false; 
    let hasNum = false; 

    if(uppercaseCheck.checked) hasUpper = true; 
    if(lowercaseCheck.checked) hasLower = true; 
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true; 


    if( hasUpper && hasLower && (hasNum || hasSym) && passwordLength>=8){
        setIndicator("#0f0"); 
    }
    else if((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength>=8){
        setIndicator("#ff0"); 
    }
    else{
        setIndicator("#f00"); 
    }
}

async function copyContent(){                                              //promises also present 
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";  
    }
    catch(e){
        copyMsg.innerText = "failed"; 
    }

    // To make copy wala text visible 
    copyMsg.classList.add("active"); 
    
    setTimeout( ()=>{
        copyMsg.classList.remove("active"); 
    } , 2000 ); 

}

inputSlider.addEventListener('input', (e) =>{
    passwordLength = e.target.value; 
    slidehandler(); 
});

copyBtn.addEventListener('onclick', () =>{
    if(passwordDisplay.value)
        copyContent(); 
});


function handleCheckboxChange(){
    allcheckBox.forEach( (boxCheck) => {
        if(boxCheck.checked)
            checkCount++; 
    }); 
}
allcheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckboxChange); 
});


