const btn = document.getElementsByClassName( 'btn2' ) 
[0];
const popup = document.getElementsByClassName( 'popup' )[0];
const btn4 = document.getElementsByClassName("btn3")[0]

btn.addEventListener('click', ()=>{
    popup.classList.add("popup-active")
})

btn4.addEventListener('click', ()=>{
    popup.classList.remove("popup-active");
})