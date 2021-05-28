let current = "";
let formula = "";
document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.querySelectorAll('.button');
    buttons.forEach(button =>{
        button.addEventListener("click", function(e){
            current += e.target.textContent;
            display();
        })
    })

    let deleteButton = document.getElementById("delete");
    deleteButton.addEventListener('click', function(){
        if(current.length != 0)
            current = current.substring(0, current.length-1);
        display();
    })

    let clearButton = document.getElementById("clear");
    clearButton.addEventListener('click', function(){
        current = "";
        display();
    })

});


function display(){
    document.querySelector("#formula").innerText = formula;
    document.querySelector("#currentNum").innerText = current;
}
function xd(e){
    alert(e.target.nodeValue);
}

function postFix(equation){
    let operators = new Array(1000);
    let numbers = arrayOfNums(equation);
    operators.push("$");
    let output = "";
    for(let i = 0; i < numbers.length; i++)
    {
        let curr = numbers[i];
        if(isNaN(curr)){
            let top = operators.peek();
            while(precedence(top) >= precedence(curr)){
                output += operators.pop();
            }
        }
    }
}

function precedence(operator){
    if(operator.equals("*") || operator.equals("/"))
        return 2;
    else if(operator.equals("+") || operator.equals("-"))
        return 1;
    return 0;
}

function arrayOfNums(equation){
    equation.replace("x", " x ");
    equation.replace("/", " / ");
    equation.replace("+", " / ");
    equation.replace("-", " - ");
    equation.replace("(", " ( ");
    equation.replace(")", " ) ");
    return equation.split(" ");
}


