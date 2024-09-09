let counter = document.querySelector("#counter")
let increasebtn = document.querySelector("#incrementBtn")
let decreasebtn = document.querySelector("#decrementBtn")
let  input = document.querySelector("#input");
 let audio = document.querySelector("audio")
function increament(){
    const inputval = Number(input.value)
    const count = Number(counter.innerText);
    counter.innerText = count + inputval;
    audio.play()
   
}
function decreament(){
    const inputval = Number(input.value)
    const count = Number(counter.innerText);
    counter.innerText = count - inputval;
    audio.play()
}
function Reset(){
    counter.innerText =  0
    const inputval = Number(input.value)
    input.value = 1;
    audio.play()
}       
