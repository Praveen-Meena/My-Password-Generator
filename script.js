const inputSlider = document.querySelector("[data-lengthSlider]"); 
const lengthDisplay = document.querySelector("[data-lengthNumber]"); 

const passwordDisplay = document.querySelector("[data-passwordDisplay]"); 
const copyBtn = document.querySelector("[data-copy]"); 
const copyMsg = document.querySelector("[data-copyMsg]"); 
const uppercaseCheck = document.querySelector("#uppercase"); 
const lowercaseCheck= document.querySelector("#lowercase"); 
const symbolsCheck = document.querySelector("#symbols"); 
const numbersCheck = document.querySelector("#numbers"); 
const indicator = document.querySelector("[data-indicator]"); 
const generateBtn = document.querySelector(".generateButton"); 
const allcheckBox= document.querySelectorAll("input[type=checkbox]"); 

const symbols = '~`!@#$%^&*()-_+={}[]\|:;"<>,.?/'; 

let password = ""; 
let passwordLength = 10; 
let checkCount = 0; 
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

function getRndInteger(min, max){
    return Math.floor(Math.random() * (max-min)) + min;  
}

function generateRandomNumber(){
    return getRndInteger(0, 9); 
}

function generateRandomUppercase(){
    return String.fromCharCode(getRndInteger(65, 91)); 
}

function generateRandomLowercase(){
    return String.fromCharCode(getRndInteger(97, 123)); 
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


    //Condition to show password Strength with different color
    if( hasUpper && hasLower && (hasNum || hasSym) && passwordLength>=8){
        setIndicator("#0f0"); 
    }
    else if((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength>=6){
        setIndicator("#ff0"); 
    }
    else{
        setIndicator("#f00"); 
    }
}

async function copyContent(){                                              //promises also present 
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copy";
    }
    catch(e){
        copyMsg.innerText = "Fail";
    }

    // To make copy wala text visible 
    copyMsg.classList.add("active"); 
    
    setTimeout( ()=>{
        copyMsg.classList.remove("active"); 
    } , 2000 ); 

}

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckboxChange(){
    checkCount=0; 
    allcheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++; 
    }); 

   //special condition
   if(passwordLength < checkCount ) {
        passwordLength = checkCount;
        handleSlider();
   }

}
allcheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckboxChange); 
})

inputSlider.addEventListener('input', (e) =>{
    passwordLength = e.target.value; 
    slidehandler(); 
})

copyBtn.addEventListener('click', () =>{
    if(passwordDisplay.value)
        copyContent(); 
})

generateBtn.addEventListener('click' , () =>{
    //none of the checkbox click
    if(checkCount==0)
        return; 

    //special case
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        slidehandler(); 
    }

    // let's start new journey to find the new password
    console.log("lets start the journey");
    
    //remove old password
    password = "";

                    //let's all the stuff mebtion in the checkbox

    //Way-1
    // if(uppercaseCheck.checked)
    //     password+=generateRandomUppercase(); 
    // if(lowercaseCheck.checked)
    //     password+=generateRandomLowercase(); 
    // if(uppercaseCheck.checked)
    //     password+=generateRandomNumber(); 
    // if(uppercaseCheck.checked)
    //     password+=generateRandomSymbol(); 
    

    //Way-2

    let funArr = [];                            //Array of function
    if(uppercaseCheck.checked)
        funArr.push(generateRandomUppercase); 
    
    if(lowercaseCheck.checked)
        funArr.push(generateRandomLowercase); 
    
    if(numbersCheck.checked)
        funArr.push(generateRandomNumber); 
    
    if(symbolsCheck.checked)
        funArr.push(generateRandomSymbol); 

    //cumpulsary Addition
    for (let i = 0; i < funArr.length; i++) {
        password += funArr[i]();
    }
    console.log("Compulsary Addition Done");
    

    //Remaining Addition
    for (let i = 0; i < passwordLength-funArr.length; i++) {
        let randindex = getRndInteger(0,funArr.length); 
        console.log("randIndex" + randindex);
        password += funArr[randindex](); 
    }
    console.log("Remaining Addition Done");

    //shuffle Password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling Done");

    //Display Generated Password
    passwordDisplay.value = password; 
    console.log("Storing password in Display Done");

    //calculate strength
    calcStrength();

}); 


