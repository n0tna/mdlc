const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const scaleBorderFactor = 1.7;
const widthGap = (canvas.width * scaleBorderFactor - canvas.width) / 2;
const heightGap = (canvas.height * scaleBorderFactor - canvas.height) / 2;

let panX = 0;
let panY = 0;
let mouse = { x: -500, y: -500 };
let closestIndex = -1;
let mouseEntered = false;

canvas.addEventListener("mouseenter", function (e) {
  mouse.mouseInside = true;
  mouseEntered = true;
});

canvas.addEventListener("mouseleave", function (e) {
  mouse.mouseInside = false;
});

canvas.addEventListener("mousemove", function (e) {
  if (mouse.mouseInside) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }
});

canvas.addEventListener('click', (e) => {
  imgArray.forEach(image => {
    const { x, y, img, zoom } = image;
    const posX = x - panX;
    const posY = y - panY;
    const w = img.width * zoom;
    const h = img.height * zoom;
    if (e.clientX >= posX && e.clientX <= posX + w && e.clientY >= posY && e.clientY <= posY + h) {
      const path = imagePathMap.get(image);
      console.log(path);
    }
  });
});

function lerp(start, end, percent) {
  return start * (1 - percent) + percent * end;
}

function getDistance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

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

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.img.width * this.zoom, this.img.height * this.zoom);
    this.update();
  }

  update() {
    const xCenter = this.originalX + this.img.width * this.originalZoom / 2;
    const yCenter = this.originalY + this.img.height * this.originalZoom / 2;
    const distance = getDistance(xCenter - panX, yCenter - panY, mouse.x, mouse.y);

    if (distance < this.img.width / 2 || distance < this.img.height / 2) {
      const newZoom = 1 + (this.img.width / 2 - distance * 3) / (this.img.width / 2) * this.originalZoom;
      const newWidth = this.img.width * newZoom;
      const newHeight = this.img.height * newZoom;
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
  if (mouseEntered) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    const newPercentX = mouse.x / canvas.width;
    const newPercentY = mouse.y / canvas.height;

    panX = lerp(panX, widthGap * newPercentX - widthGap * (1 - newPercentX), 0.05);
    panY = lerp(panY, heightGap * newPercentY - heightGap * (1 - newPercentY), 0.05);

    ctx.translate(-panX, -panY);

    if (closestIndex !== -1) {
      const closestImage = imgArray[closestIndex];
      imgArray.splice(closestIndex, 1);
      imgArray.push(closestImage);
      closestIndex = -1;
    }
  }
    imgArray.forEach(image => {
      image.draw();
    });

    ctx.restore();


  requestAnimationFrame(panUpdate);
}



const budgie1 = {
  x: canvas.width * 0.1 - widthGap,
  y: canvas.height * 0.2 - heightGap,
  zoom: 0.3,
  imgSrc: 'assets/IMG/MariaDeLaCroix_Stillife_Budgie1_S.jpg',
  title: 'Budgie 1',
  path: 'budgie1'
};

const domino1 = {
  x: canvas.width * 0.42 - widthGap,
  y: canvas.height * 0.17 - heightGap,
  zoom: 0.3,
  imgSrc: 'assets/IMG/MariaDeLaCroix_Stillife_Domino1_S.jpg',
  title: 'Domino 1',
  path: 'domino1'
};

const budige2 = {
  x: canvas.width * 0.33 - widthGap,
  y: canvas.height * 0.5 - heightGap,
  zoom: 0.3,
  imgSrc: 'assets/IMG/MariaDeLaCroix_Stillife_Budige2_S.jpg',
  title: 'Budgie 2',
  path: 'budgie2'
};

const cervera1 = {
  x: canvas.width * 0.27 - widthGap,
  y: canvas.height * 0.8 - heightGap,
  zoom: 0.3,
  imgSrc: 'assets/IMG/MariaDeLaCroix_Stillife_Cervera1_S.jpg',
  title: 'Cervera 1',
  path: 'cervera1'
};

const crayon1 = {
  x: canvas.width * 0.60 - widthGap,
  y: canvas.height * 0.5 - heightGap,
  zoom: 0.3,
  imgSrc: 'assets/IMG/MariaDeLaCroix_Stillife_Crayon1_S.jpg',
  title: 'Crayon 1',
  path: 'crayon1'
};

const crayon2 = {
  x: canvas.width * 0.60 - widthGap,
  y: canvas.height * 0.9 - heightGap,
  zoom: 0.3,
  imgSrc: 'assets/IMG/MariaDeLaCroix_Stillife_Crayon2_S.jpg',
  title: 'Crayon 2',
  path: 'crayon2'
};

const theOdeTo3 = {
  x: canvas.width * 0.45 - widthGap,
  y: canvas.height * 0.98 - heightGap,
  zoom: 0.3,
  imgSrc: 'assets/IMG/MariaDeLaCroix_Stillife_TheOdeTo3_S.jpg',
  title: 'The Ode to 3',
  path: 'theOdeTo3'
};

const stillife1 = {
  x: canvas.width * 0.80 - widthGap,
  y: canvas.height * 0.24 - heightGap,
  zoom: 0.3,
  imgSrc: 'assets/IMG/MariaDeLaCroix_Stillife1_S.jpg',
  title: 'Still Life 1',
  path: 'stillife1'
};

const imagePathMap = new Map();

let images = [budgie1, domino1, budige2, cervera1, crayon1, crayon2, theOdeTo3, stillife1];
imgArray = images.map(image => {
  const imgInstance = new Imagez(image.x, image.y, image.zoom, image.imgSrc);
  imagePathMap.set(imgInstance, image.path);
  return imgInstance;
});

panUpdate();
