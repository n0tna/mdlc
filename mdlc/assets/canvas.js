
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
let panX = 0, panY = 0;
console.log(height);
const scaleBorderFactor = 1.6; /* scale factor for the bounds */
let mouse = {
    x: width / 2, // set to half of the width of the screen
    y: height / 2 // set to half of the height of the screen
}

let closestIndex = -1;
window.addEventListener('mousemove', function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
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

    //     if (this.x + (this.img.width / 2) >= window.innerWidth
    //     || this.x - (this.img.width / 2) <= 0) {
    //         this.x -= (this.targetX - this.x) * 0.05;
    //   }
  
    //   if (this.y + (this.img.width / 2) >= window.innerHeight
    //     || this.y - (this.img.width / 2) <= 0) {
    //         this.y -= (this.targetY - this.y) * 0.05;
    //   }

        let xCenter = this.x + this.img.width*this.zoom / 2;
        let yCenter = this.y + this.img.height*this.zoom / 2;
        let distance = getDistance(xCenter-panX, yCenter-panY, mouse.x, mouse.y);
        ctx.fillRect(xCenter,yCenter,1,1);

        if (distance < this.img.width / 4 || distance < this.img.height / 4) {
            let newZoom = 1 + (this.img.width / 4 - distance) / (this.img.width / 4) * this.originalZoom;
            let newWidth = this.img.width * newZoom;
            let newHeight = this.img.height * newZoom;
            let widthDiff = (newWidth - this.img.width) / 2;
            let heightDiff = (newHeight - this.img.height) / 2;
            this.targetZoom = newZoom;
            this.targetX = this.x - widthDiff;
            this.targetY = this.y - heightDiff;
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


    imgArray.forEach(image => {
        image.draw();
    });

    ctx.restore();

    requestAnimationFrame(panUpdate);
    
    if (closestIndex !== -1) {
        const closestImage = imgArray[closestIndex];
        imgArray.splice(closestIndex, 1);
        imgArray.push(closestImage);
        closestIndex = -1;
    }
}


// for (let i = 0; i < 20; i++) {
//     let zoom = 0.5;
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     let imgSrc = 'IMG_1566.jpg';
//     imgArray.push(new Imagez(x, y, zoom, imgSrc));
// };


function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    imgArray.forEach(image => {
        image.draw();
    });
};

img1 = new Imagez((canvas.width*0.1)-widthGap, (canvas.height*0.2)-heightGap, 0.3, 'assets/IMG/MariaDeLaCroix_Stillife_Budgie1_S.jpg')
img2 = new Imagez((canvas.width*0.42)-widthGap, (canvas.height*0.05)-heightGap, 0.3, 'assets/IMG/MariaDeLaCroix_Stillife_Domino1_S.jpg')
img3 = new Imagez((canvas.width*0.33)-widthGap, (canvas.height*0.5)-heightGap, 0.3, 'assets/IMG/MariaDeLaCroix_Stillife_Budige2_S.jpg')
img4 = new Imagez((canvas.width*0.27)-widthGap, (canvas.height*0.8)-heightGap, 0.3, 'assets/IMG/MariaDeLaCroix_Stillife_Cervera1_S.jpg')
img5 = new Imagez((canvas.width*0.60)-widthGap, (canvas.height*0.5)-heightGap, 0.3, 'assets/IMG/MariaDeLaCroix_Stillife_Crayon1_S.jpg')
img6 = new Imagez((canvas.width*0.60)-widthGap, (canvas.height*0.9)-heightGap, 0.3, 'assets/IMG/MariaDeLaCroix_Stillife_Crayon2_S.jpg')
img7 = new Imagez((canvas.width*0.45)-widthGap, (canvas.height*0.98)-heightGap, 0.3, 'assets/IMG/MariaDeLaCroix_Stillife_TheOdeTo3_S.jpg')
let imgArray = [img1,img2,img3,img4,img5,img6,img7];
console.log(panX);

panUpdate();


var newPercentX = 0, newPercentY = 0;
var percentX = 0, percentY = 0;

