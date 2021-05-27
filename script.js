function grid(){
    for(let i = 1; i <= 4; i++){
        for(let j = 1; j <= 4; j++){
            let content = document.createElement('button');
            content.setAttribute("class", "button");
            document.querySelector("#grid").appendChild(content);
            content.style.gridColumnStart = j;
            content.style.gridRowStart = i;
        }
    }
}