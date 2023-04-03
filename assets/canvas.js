
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
let panX = 0, panY = 0;
console.log(height);
const scaleBorderFactor = 1.7; /* scale factor for the bounds */
let mouse = {
    x: 0,
    y: 0
}

let closestIndex = -1;

window.addEventListener('mousemove', function (e) {
    if (e.clientX >= 0 && e.clientX <= window.innerWidth && e.clientY >= 0 && e.clientY <= window.innerHeight) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
  });

canvas.addEventListener('click', function(e) {
    for (let i = 0; i < imgArray.length; i++) {
        const image = imgArray[i];
        const x = image.x - panX;
        const y = image.y - panY;
        const w = image.img.width * image.zoom;
        const h = image.img.height * image.zoom;
        if (e.clientX >= x && e.clientX <= x + w && e.clientY >= y && e.clientY <= y + h) {
            console.log(image.img.currentSrc);
            window.location.href = 'the-ode-to.html';
        }
    }
});

function lerp(start, end, percent) {
    return start * (1 - percent) + percent * end;
}

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

const widthGap = (canvas.width * scaleBorderFactor - canvas.width) / 2;
const heightGap = (canvas.height * scaleBorderFactor - canvas.height) / 2;

class Imagez {
    constructor(x, y, zoom, imgSrc) {
        this.zoom = zoom;
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = imgSrc;
        this.targetZoom = zoom;
        this.targetX = x;
        this.targetY = y;
        this.originalZoom = zoom;
        this.originalX = x;
        this.originalY = y;
        
    }

    draw = () => {
        ctx.drawImage(this.img, this.x, this.y, this.img.width * this.zoom, this.img.height * this.zoom);
        this.update();
    };

    update = () => {

        let xCenter = this.originalX + this.img.width*this.originalZoom / 2;
        let yCenter = this.originalY + this.img.height*this.originalZoom / 2;
        let distance = getDistance(xCenter-panX, yCenter-panY, mouse.x, mouse.y);

        if (distance < this.img.width / 2 || distance < this.img.height / 2) {
            let newZoom = 1 + (this.img.width / 2 - distance*3) / (this.img.width / 2) * this.originalZoom;
            let newWidth = this.img.width * newZoom;
            let newHeight = this.img.height * newZoom;
            this.targetZoom = newZoom;
            this.targetX = xCenter - newWidth / 2;
            this.targetY = yCenter - newHeight / 2;
            if (closestIndex === -1 || distance < getDistance(
                imgArray[closestIndex].x + imgArray[closestIndex].img.width / 2, 
                imgArray[closestIndex].y + imgArray[closestIndex].img.height / 2, 
                mouse.x, 
                mouse.y)) {
                closestIndex = imgArray.indexOf(this);
            }
        } else {
            this.targetZoom = this.originalZoom;
            this.targetX = this.originalX;
            this.targetY = this.originalY;
        }

        this.zoom += (this.targetZoom - this.zoom) * 0.05;
        this.x += (this.targetX - this.x) * 0.05;
        this.y += (this.targetY - this.y) * 0.05;
    }
}


function panUpdate() {
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    newPercentX = (mouse.x / width);
    newPercentY = (mouse.y / height);

    percentX = lerp(percentX, newPercentX, 0.05);
    percentY = lerp(percentY, newPercentY, 0.05);

    panX = (widthGap) * percentX + (-widthGap) * (1 - percentX);
    panY = (heightGap) * percentY + (-heightGap) * (1 - percentY);

    ctx.translate(-panX, -panY);

    if (closestIndex !== -1) {
        const closestImage = imgArray[closestIndex];
        imgArray.splice(closestIndex, 1);
        imgArray.push(closestImage);
        closestIndex = -1;
    }

    imgArray.forEach(image => {
        image.draw();
    });

    ctx.restore();

    requestAnimationFrame(panUpdate);
    
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    imgArray.forEach(image => {
        image.draw();
    });
};


let budgie1 = {
    x: canvas.width * 0.1 - widthGap,
    y: canvas.height * 0.2 - heightGap,
    zoom: 0.3,
    imgSrc: 'assets/IMG/MariaDeLaCroix_Stillife_Budgie1_S.jpg',
    title: 'Budgie 1',
    path: 'budgie1'
  };
  
  let domino1 = {
    x: canvas.width * 0.42 - widthGap,
    y: canvas.height * 0.17 - heightGap,
    zoom: 0.3,
    imgSrc: 'assets/IMG/MariaDeLaCroix_Stillife_Domino1_S.jpg',
    title: 'Domino 1',
    path: 'domino1'
  };
  
  let budige2 = {
    x: canvas.width * 0.33 - widthGap,
    y: canvas.height * 0.5 - heightGap,
    zoom: 0.3,
    imgSrc: 'assets/IMG/MariaDeLaCroix_Stillife_Budige2_S.jpg',
    title: 'Budgie 2',
    path: 'budgie2'
  };
  
  let cervera1 = {
    x: canvas.width * 0.27 - widthGap,
    y: canvas.height * 0.8 - heightGap,
    zoom: 0.3,
    imgSrc: 'assets/IMG/MariaDeLaCroix_Stillife_Cervera1_S.jpg',
    title: 'Cervera 1',
    path: 'cervera1'
  };
  
  let crayon1 = {
    x: canvas.width * 0.60 - widthGap,
    y: canvas.height * 0.5 - heightGap,
    zoom: 0.3,
    imgSrc: 'assets/IMG/MariaDeLaCroix_Stillife_Crayon1_S.jpg',
    title: 'Crayon 1',
    path: 'crayon1'
  };
  
  let crayon2 = {
    x: canvas.width * 0.60 - widthGap,
    y: canvas.height * 0.9 - heightGap,
    zoom: 0.3,
    imgSrc: 'assets/IMG/MariaDeLaCroix_Stillife_Crayon2_S.jpg',
    title: 'Crayon 2',
    path: 'crayon2'
  };
  
  let theOdeTo3 = {
    x: canvas.width * 0.45 - widthGap,
    y: canvas.height * 0.98 - heightGap,
    zoom: 0.3,
    imgSrc: 'assets/IMG/MariaDeLaCroix_Stillife_TheOdeTo3_S.jpg',
    title: 'The Ode to 3',
    path: 'theOdeTo3'
  };
  
  let stillife1 = {
    x: canvas.width * 0.80 - widthGap,
    y: canvas.height * 0.24 - heightGap,
    zoom: 0.3,
    imgSrc: 'assets/IMG/MariaDeLaCroix_Stillife1_S.jpg',
    title: 'Still Life 1',
    path: 'stillife1'
  };
let images = [budgie1,domino1,budige2,cervera1,crayon1,crayon2,theOdeTo3,stillife1];
let imgArray = [];
for (let i = 0; i < images.length; i++) {
    let budgie = images[i];
    let budgieImage = new Imagez(budgie.x, budgie.y, budgie.zoom, budgie.imgSrc);
    imgArray.push(budgieImage);
 }

panUpdate();

var newPercentX = 0, newPercentY = 0;
var percentX = 0, percentY = 0;
