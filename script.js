/*
  This script was refactored a number of times.
  First it was made in the semblance of the video provided by Ima Learning Place.
  However, i found the original a bit confusing so I decide to emulate the behaviour 
  of my phone's calculator on my own terms. Although more intuitive (at least for me), 
  a lot of time was lost in the process, and as the deadline approaches the code is,
  for now, left with quite a few bugs.
*/ 

let evaluation = "";
let result = 0;
let end = false;
let openedParentheses = false;
let allowComma = true;
let latestIsOperand = false;
let mainDisplay = document.querySelector("#mainDisplay");
let secondaryDisplay = document.querySelector("#secDisplay");
let parenthesesCount = 0;
let answer = "";


//Adds numbers in the display
function inputNumber(inputItem) {
  if(evaluation.length <= 15){
    evaluation += inputItem.toString();
    updateDisplay(); 
  }
  
}


//Adds operands in the display
function addOperand(operand){
  if(evaluation.length <= 15){
    const lastInput = lastDigit();
    
    if(evaluation == '')
      return;

    if(!lastInput){
      if(evaluation.charAt(evaluation.length-1) == '.'){
        evaluation += '0' + operand;
        updateDisplay();
        return;
     }
      else
     evaluation += operand;
    }
    else{
      evaluation = evaluation.slice(0,-1) + operand;
    }
    allowComma = true;
    updateDisplay();
  }
}

//Clears the display
function clearAll(){
  evaluation = '';
  mainDisplay.innerHTML = '';
  secondaryDisplay.innerHTML = '';
  parenthesesCount = 0;
  result = '';
}

//Deletes the last digit in the display
function removeDigit(){
  console.log('del')
  if(evaluation != '')
  evaluation = evaluation.slice(0,-1);
  if(evaluation.charAt(evaluation.length-1 == '('))
  parenthesesCount -= 1;
  if(evaluation.charAt(evaluation.length-1 == ')'))
  parenthesesCount += 1;
  updateDisplay();
}

//Informs the last digit in the operation
function lastDigit(){
  let _lastDigit = evaluation.charAt(evaluation.length-1);
  let possibilities = '+-x÷';
  
  if(possibilities.includes(_lastDigit))
    return true;
  else
    return false;
}

//Verifies if the last digit in the evaluation string is a number
function lastDigitisNumber(){
  let _lastDigit = evaluation.charAt(evaluation.length-1);
  let possibilities = '0123456789';
  
  if(possibilities.includes(_lastDigit))
    return true;
  else
    return false;
}

//Verifies if the last digit in the evaluation string is an operand
function lastDigitIsOperand(){
  let _lastDigit = evaluation.charAt(evaluation.length-1);
  let possibilities = '-+*÷%';
  
  if(possibilities.includes(_lastDigit))
    return true;
  else
    return false;
}

//Handles the comma usage
function addComma(){
  if(evaluation.length <= 15){
    const lastInput = lastDigit();

    if(evaluation == '' && allowComma){
      evaluation += '0.'
      allowComma = false;
    }
    else if(lastInput && allowComma){
      evaluation += '0.' 
      allowComma = false
   }  
    else if(evaluation.charAt(evaluation.length-1) == '.')
    return;
    else{
      if(allowComma){
        evaluation += '.' 
   allowComma = false 
      }
    }
   updateDisplay();
  }
}

//Handles the parentheses
function addParentheses(){
  if(evaluation.length <= 15){
    let _lastDigit = evaluation.charAt(evaluation.length-1);
  
    if(evaluation == ''|| _lastDigit == '('){
      evaluation += '(';
      openedParentheses = true;
      parenthesesCount += 1;
      _lastDigit = evaluation.charAt(evaluation.length-1)
    }

    if(lastDigitisNumber() && !openedParentheses){
      evaluation += 'x(';
      openedParentheses = true;
      parenthesesCount +=1;
      _lastDigit = evaluation.charAt(evaluation.length-1)
    }

    if(lastDigitisNumber() && openedParentheses){
      evaluation += ')';
      openedParentheses = false;
      parenthesesCount -=1;
      _lastDigit = evaluation.charAt(evaluation.length-1)
   }

    if(lastDigitIsOperand()){
      evaluation += '(';
      openedParentheses = true;
      parenthesesCount +=1;
      _lastDigit = evaluation.charAt(evaluation.length-1)
   }

    console.log(parenthesesCount);
    updateDisplay();
  }
}

//Adds the value stored in the answear variable
function addPrevAnswer(){
  if(evaluation.length <= 15){
    if(answer != "")
    evaluation += '(' + answer + ')';
   updateDisplay();
  }
}

//This function is called when the equal sign is pressed
function solve(){
  evaluation = '';
  mainDisplay.innerHTML = result;
  answer = result;
  result = '';
  secondaryDisplay.innerHTML ='';
}

//Evaluates the expression on the fly
function Evaluate(){

  if(evaluation != ""){
		let expression = evaluation.replace('x','*').replace('÷','/').replace('%', '*0.01');

		try{
			result = eval(expression);
		}catch{}

		updateSecondaryDisplay(result)
	}
	else{
	return;
	}

}

//Updates the content of the main display
function updateDisplay()
{
  mainDisplay.innerHTML = evaluation;
  Evaluate();
}

//Updates the content of the secondary display
function updateSecondaryDisplay(value){
secondaryDisplay.innerHTML = result;
}