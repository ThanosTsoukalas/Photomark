// Editor main script, iteration 1
// Created by Thanos Tsoukalas
// Last update date: November 2024

// Window class for ... making windows
class Window{
    constructor (windowID, widthX, heightY, title, appendTarget){
        this.windowID = windowID;
        this.widthX = widthX;
        this.heightY = heightY;
        this.title = title;
        this.appendTarget = appendTarget;
    }

    create(){
        const closeIconHTML = '<ion-icon name="close" onclick="closeApp(' + "'" + this.windowID.toString() + "'" + ')"></ion-icon>';
        // Create the window and append it to the selected target
        const newWin = document.createElement('div');
        this.appendTarget.appendChild(newWin);
        newWin.style.display = 'flex';

        newWin.setAttribute('id', this.windowID.toString());
        newWin.classList.add('window'); // it synchronizes with the css this way

        const newWinHeader = document.createElement('div');
        newWin.appendChild(newWinHeader);
        newWinHeader.classList.add('windowheader');
        newWinHeader.setAttribute('id', this.windowID.toString() + 'header');

        newWinHeader.innerHTML = this.title.toString() + closeIconHTML;


        if (this.widthX == 'def'){ // "def" stands for default
            newWin.style.width = 'auto';
        }else {
            newWin.style.width = this.widthX.toString() + 'rem';
        }

        if (this.heightY == 'def'){ // "def" stands for default
            newWin.style.height = 'auto';
        }else {
            newWin.style.height = this.heightY.toString() + 'rem';
        }        
        

    }
}

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
const debugWindow = new Window('debug-window', 20, 10, 'Photomark Debugger', mainBody );

debuggerModeTrigger.addEventListener('click', function(){
    if (debugClickIndex == 0){
        debuggerMode = true;
        debuggerModeTriggerGrayText.innerHTML = 'On';
        debugWindow.create();
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

    mainBody.style.display = 'flex';
    mainBody.style.alignItems = 'center';
    mainBody.style.justifyContent = 'center';
    mainBody.style.width = '60%';

    let totalCanvasAllocation = ((x * y) / (windowWidth*windowHeight))*100;

    canvas.style.backgroundColor = 'white';
    canvas.style.width = x.toString() + "px";
    canvas.style.height = y.toString() + "px";

    const debugInterval = setInterval(() => {
        if (debuggerMode == true){
            console.log("(Computed) Total Canvas Allocation (%): " + totalCanvasAllocation + "\n" + "x: " + x + "px" + "\n" + "y: " + y + "px");
            clearInterval(debugInterval);
        }
    }, 100);

    for (let divider = 1; totalCanvasAllocation >= 35; divider++){
        canvas.style.width = (x/divider).toString() + "px";
        canvas.style.height = (y/divider).toString() + "px";
        totalCanvasAllocation = (((x/divider) * (y/divider)) / (windowWidth*windowHeight))*100;
        console.log(totalCanvasAllocation);
    }    


}

createCanvas(canvasWidth, canvasHeight);