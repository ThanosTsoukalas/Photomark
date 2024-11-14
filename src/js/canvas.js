// Editor main script, iteration 1
// Created by Thanos Tsoukalas
// Last update date: November 2024

// TECHNICAL VARIABLES
let canvasWidth  = prompt("Enter Canvas Width: ");
let canvasHeight = prompt("Enter canvas height: ");
let canvasVirtualScaling  = 1;
const resolution  = canvasWidth.toString() + canvasHeight.toString();
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

// UI AND OBJECT VARIABLES 
const mainBody = document.getElementById('main-body');
const debuggerModeTrigger = document.getElementById('debuggerModeTrigger');
const debuggerModeTriggerGrayText = document.getElementById('debugGrayText');

// PROGRAMMING RELATED VARIABLES

// Debugger Mode lets users view computed and calculated values 
// in a special window, or the console
let debuggerMode = false;
let debugClickIndex = 0; // Meaning it hasn't been enabled. When this is equal to 1, it means that it has been enabled, and therefore, if clicked again, it is going to disable the debug mode

debuggerModeTrigger.addEventListener('click', function(){
    if (debugClickIndex == 0){
        debuggerMode = true;
        debuggerModeTriggerGrayText.innerHTML = 'On';
        debugClickIndex = 1;
    }else if(debugClickIndex == 1){
        debuggerMode = false;
        debuggerModeTriggerGrayText.innerHTML = 'Off';
        debugClickIndex = 0;
    }
})

// Create the canvas based on User Input, and adjust it so it fits the screen
function createCanvas(x, y){
    let initScaling = prompt("Do you want intialization scaling? (y/n): ");
    if (initScaling == "y" || initScaling == "Y"){
        let scaleAmountPercent = prompt("Enter scale amount (%): ")
        x = x + (x * scaleAmountPercent/100); //decimal number 
        y = y + (y * scaleAmountPercent/100);
    }

    const canvas  = document.createElement('div');
    mainBody.appendChild(canvas);

    let totalCanvasAllocation = ((x * y) / (windowWidth*windowHeight))*100;

    canvas.style.backgroundColor = 'white';
    canvas.style.width = x.toString() + "px";
    canvas.style.height = y.toString() + "px";

    if (debuggerMode == true){
        console.log("(Computed) Total Canvas Allocation (%): " + totalCanvasAllocation + "\n" + "x: " + x + "px" + "\n" + "y: " + y);
    }

    if (totalCanvasAllocation >= 40){
        
        setTimeout(() => {
            canvas.style.width = (x/(totalCanvasAllocation/10)).toString() + "px";
            canvas.style.height = (y/(totalCanvasAllocation/10)).toString() + "px";
        }, 500);
    }


}

createCanvas(canvasWidth, canvasHeight);