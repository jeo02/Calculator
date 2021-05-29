let current = "";
let formulaArr = [];
let lastEnteredOperator = false;
document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.querySelectorAll('.button');
    buttons.forEach(button =>{
        button.addEventListener("click", function(e){
            current += e.target.textContent;
            display();
            lastEnteredOperator = false;
        })
    })

    let operators = document.querySelectorAll('.operator');
    operators.forEach(operator =>{
        operator.addEventListener("click", function(e){
            if(lastEnteredOperator == true){
                formulaArr.pop();
                formulaArr.push(e.target.textContent)
                display();
            }
            else{
                formulaArr.push(current);
                formulaArr.push(e.target.textContent);
                current = "";
                display();
                lastEnteredOperator = true;
            }
            
        })
    })

    let open = document.querySelector('#open');
    open.addEventListener("click", function(e){
        if(lastEnteredOperator == true){
            formulaArr.push(e.target.textContent);
            current = "";
            display();
        }
    })

    let close = document.querySelector('#close');
    close.addEventListener("click", function(e){
        if(lastEnteredOperator == false){
            formulaArr.push(current);
            formulaArr.push(e.target.textContent);
            current = "";
            display();
        }
    })
    

    let deleteButton = document.getElementById("delete");
    deleteButton.addEventListener('click', function(){
        if(current.length != 0)
            current = current.substring(0, current.length-1);
        else if(formulaArr.length != 0){
            formulaArr.pop();
        }
        display();
    })

    let clearButton = document.getElementById("clear");
    clearButton.addEventListener('click', function(){
        current = "";
        formulaArr = [];
        display();
    })

    let equalsButton = document.getElementById("equals");
    equalsButton.addEventListener('click', function(){
        formulaArr.push(current);
        current = calculator();
        display();
        current = "";
        formulaArr = [];
    })

});


function display(){
    document.querySelector("#formula").innerText = formulaArr.join('');
    document.querySelector("#currentNum").innerText = current;
}
function xd(e){
    alert(e.target.nodeValue);
}

function postFix(){
    //adding dollar sign to avoid edge case
    let operators = ["$"];
    let output = [];

    //going through each element of the formula
    for(let i = 0; i < formulaArr.length; i++)
    {
        let curr = formulaArr[i];

        if(isOperator(curr)){
            let top = operators[operators.length-1];

            //if the current top is multiplication/division pop it out until theres lower priority
            while(precedence(top) >= precedence(curr)){
                output.push(operators.pop());
                top = operators[operators.length-1];
            }
            operators.push(curr);
        }
        else if(curr === "(")
            operators.push(curr);
        else if(curr === ")"){
            let top = operators.pop();
            //pop elements in operators until open bracket it found
            while(top !== "("){
                output.push(top);
                if(operators[operators.length-1] === "$")//no open bracket found error in equation
                    return "ERROR";
                top = operators.pop();
            }
        }
        else if(isNumeric(curr))
            output.push(curr);
        
        //if at the end then add all the remaining operators into the output
        if(i == formulaArr.length-1){
            let top = operators.pop();
            while(top !== "$"){
                output.push(top);
                top = operators.pop();
            }
        }
        
    }
    return output;
}

function calculator(){
    let operands = [];
    let equation = postFix();
    
    if(equation === "ERROR")
        return equation;
    
    for(let i = 0; i < equation.length; i++){
        let curr = equation[i];
        console.log(operands);
        //if current element is a number push to operands
        if(isNumeric(curr))
            operands.push(curr);
        else if(isOperator(curr)){
            let operand2 = operands.pop();
            let operand1 = operands.pop();
            operands.push(solve(operand1, operand2, curr));
        }
    }
    let output = operands.pop();
    
    //most likely error is misplaced operator ex. x9 or 9x
    if(output === "NaN")
        return "ERROR";
    
    return output;
}

function precedence(operator){
    if(operator === "x" || operator === "/")
        return 2;
    else if(operator === "+" || operator === "-")
        return 1;
    return 0;
}

function isOperator(operator){
    return operator === "/" || operator === "+" || operator === "-" || operator === "x";
}

function solve(a, b, operator){
    switch(operator){
        case "+":
            return a+b;
        case "-":
            return a-b;
        case "x":
            return a*b;
        case "/":
            return a/b;
    }
    return 0;
}

function isNumeric(n){
    if (typeof n != "string")
        return false;
    return !isNaN(n) && !isNaN(parseFloat(n));
}



