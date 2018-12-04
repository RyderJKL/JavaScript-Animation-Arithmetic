function shuffle(array) {
  let i = 0,
    j = 0,
    temp = null;

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;

    temp = array[i].x;
    array[i].x = array[j].x;
    array[j].x = temp;
  }
  return array;
}

function start() {
  const myCanvas = document.getElementById("myCanvas");
  const ctx = myCanvas.getContext("2d");
  const  widthRatio = 0.9;
  const  heightRatio = 0.50;

  myCanvas.width = window.innerWidth * widthRatio;
  myCanvas.height = window.innerHeight * heightRatio;

  const  barSettings = {
    width: 25,
    heightMultiplier: 20,
    margin: 7
  }

  let swapInterval = null;
  let swappingFlag = false;
  let barsArray = [];
  const colorsArray = ["yellow", "black", "red", "green", "blue", "orange", "purple", "lightgreen", "pink"]

  document.getElementById("shuffleArray").onclick = function () {
    barsArray = shuffle(barsArray);
    drawBars();
  }

  document.getElementById("bubbleSort").onclick = function () {
    document.getElementById("shuffleArray").disabled = true;
    document.getElementById("bubbleSort").disabled = true;
    bubbleSort(barsArray);

    let sortInterval = setInterval(function () {
      let sorted = true;
      for (let i = 0; i < barsArray.length - 1; i++) {
        if (barsArray[i].x > barsArray[i + 1].x)
          sorted = false;
      }
      if (sorted) {
        clearInterval(sortInterval);
        document.getElementById("shuffleArray").disabled = false;
        document.getElementById("bubbleSort").disabled = false;
        document.getElementById("info").innerHTML = "All Done!";
      }
    }, 1000);

  }

  let xBuffer = barSettings.margin * 2;
  for (let i = 1; i < 10; i++) {
    barsArray.push({
      value: i,
      width: barSettings.width,
      height: barSettings.heightMultiplier * i,
      x: xBuffer,
      y: myCanvas.height - barSettings.heightMultiplier * i - 10,
      color: colorsArray[i % colorsArray.length]
    });
    xBuffer += barSettings.width + barSettings.margin;
  }

  function drawBars() {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
    xBuffer = barSettings.margin * 2;
    for (let i = 0; i < barsArray.length; i++) {
      const bar = barsArray[i];
      ctx.beginPath();
      ctx.fillStyle = bar.color;
      ctx.rect(bar.x, bar.y, bar.width, bar.height);

      ctx.fill();
      ctx.font = "20px Times New Roman";
      ctx.fillStyle = "black";
      ctx.fillText(bar.value, bar.x + barSettings.width / 4, bar.y - barSettings.margin);
      ctx.closePath();
    }
  }

  function swapBars(barA, barB) {
    console.log('wait minute ....');
    const xA = barA.x;
    const xB = barB.x;

    function swapAnimation() {
      drawBars();

      if (barA.x >= xB || barB.x <= xA) {
        clearInterval(swapInterval);
        swapInterval = null;
        swappingFlag = false;
      } else {
        barA.x++;
        barB.x--;
      }
    }

    if (!swapInterval) {
      swappingFlag = true;
      document.getElementById("info").innerHTML = barA.value + " > " + barB.value + " --> SWAP!";
      swapInterval = setInterval(swapAnimation, 16);
    } else {
      setTimeout(swapBars.bind(null, barA, barB), 300);
    }
  }

  function bubbleSort(a) {
    let  swapped;
    do {
      swapped = false;
      for (let i = 0; i < a.length - 1; i++) {
        if (a[i].value > a[i + 1].value) {

          swapBars(a[i], a[i + 1]);

          const  temp = a[i];
          a[i] = a[i + 1];
          a[i + 1] = temp;

          swapped = true;
        }
      }
    } while (swapped);
  }

  drawBars();
}

export default start
