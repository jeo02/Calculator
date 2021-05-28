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