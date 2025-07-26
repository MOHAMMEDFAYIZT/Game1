const clickSound = new Audio("click.mp3");
const winSound = new Audio("win.mp3");

let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#resetbtn");
//let msgcontainer=document.querySelector(".msgcontainer");
let newgamebtn=document.querySelector("#newgamebtn");
let msg=document.querySelector("#msg");
const popup=document.querySelector(".popup");

let turnO=true;
//2d array
const winpatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
];
const resetgame = () =>{
    turnO=true;
    enableboxes();
    //msgcontainer.classList.add("hide");
    boxes.forEach((box) => box.classList.remove("highlight"));
}
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        
        console.log("clicked");
        if(turnO){
            box.innerText="O";
            turnO=false;
        }else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        clickSound.currentTime = 0;
        clickSound.play();
        checkwinner();
    });
     
});
const disableboxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
};
const enableboxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }

};
/*const showWinner=(winner) => {
    msg.innerText=`congratulation! winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes();
};*/
const showWinner=(winner) => {
    msg.innerText=`🎉 winner is ${winner}`;
    popup.classList.add("show");
    disableboxes();
    winSound.play();
    confetti({
  particleCount: 300,
  spread: 80,
  origin: { y: 0.6 }
});

};
const checkwinner=() => {
    let winnerfound = false;
    for(let pattern of winpatterns)
  {
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;
    
    if(pos1val != "" && pos2val != "" && pos3val != ""){
        if(pos1val === pos2val && pos2val === pos3val){
         boxes[pattern[0]].classList.add("highlight");
         boxes[pattern[1]].classList.add("highlight");
         boxes[pattern[2]].classList.add("highlight");
         winnerfound=true;
         showWinner(pos1val);
         return;
        }
    }
  }
let filledboxes = [...boxes].every((box) => box.innerText !=="");

 if(filledboxes && !winnerfound){
    const forcedwinner = Math.random()<0.5? "O": "X" ;
    showWinner(forcedwinner);
    msg.innerText = ` ${forcedwinner} wins in DRAW🎊 `;
    
}
};

newgamebtn.addEventListener("click",() => {
    popup.classList.remove("show");
    resetgame();
});
resetbtn.addEventListener("click",resetgame);