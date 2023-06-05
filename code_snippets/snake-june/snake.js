let canvas = document.getElementById("snake");
const context = canvas.getContext('2d');
const userList = document.getElementById('userList');
const userNameInput = document.getElementById('userNameInput');
const currentPlayerLabel = document.getElementById('currentPlayerLabel');
const maxScoreLabel = document.getElementById('maxScoreLabel');

let box, canvasSize;
if (window.innerWidth < 600) {
  box = 20;
  canvasSize = 15;
} else {
  box = 32;
  canvasSize = 17;
}

canvas.width = box * canvasSize;
canvas.height = box * canvasSize;
let game, speed, score, users = [], currentUser = null;

let touchStartX = null;
let touchStartY = null;

resetGame();

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for(let i = 0; i < snake.length; i++){
    context.fillStyle = (i == 0) ? "green" : "white";
    context.fillRect(snake[i].x, snake[i].y, box, box);
    
    if(i != 0 && snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      gameOver();
      return;
    }
  }
  
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(d == "LEFT") snakeX -= box;
  if(d == "UP") snakeY -= box;
  if(d == "RIGHT") snakeX += box;
  if(d == "DOWN") snakeY += box;

  if(snakeX == food.x && snakeY == food.y){
    score++;
    speed = speed > 50 ? speed - 10 : 50; // Ensure speed does not go below 50
    clearInterval(game);
    game = setInterval(draw, speed);
    food = {
      x : Math.floor(Math.random() * canvasSize) * box,
      y : Math.floor(Math.random() * canvasSize) * box
    };
    if (currentUser && score > currentUser.maxScore) {
      currentUser.maxScore = score;
      updateUserElement();
    }
  } else {
    snake.pop();
  }
  

  const newHead = {
    x : snakeX,
    y : snakeY
  };

  if (snakeX < 0) newHead.x = canvasSize * box - box;
  if (snakeX >= canvasSize * box) newHead.x = 0;
  if (snakeY < 0) newHead.y = canvasSize * box - box;
  if (snakeY >= canvasSize * box) newHead.y = 0;

  snake.unshift(newHead);

  if (currentUser && snake.length > currentUser.maxScore) {
    currentUser.maxScore = snake.length;
    maxScoreLabel.innerText = "New max score!";
    maxScoreLabel.style.visibility = 'visible';
    setTimeout(() => maxScoreLabel.style.visibility = 'hidden', 2000);
  }
}

function addUser() {
    const userName = userNameInput.value;
    if (userName && !users.find(user => user.name === userName)) {
      const user = { name: userName, maxScore: 0 };
      users.push(user);
      const li = document.createElement('li');
      li.innerText = `${user.name} (max: ${user.maxScore})`;
      li.style.color = "white";
      li.style.cursor = "pointer";
      li.onclick = function() {
        if (currentUser && score > currentUser.maxScore) {
          currentUser.maxScore = score;
          updateUserElement();
        }
        currentUser = users.find(u => u.name === user.name); // Find the user from the array
        currentPlayerLabel.innerText = currentUser.name;
        resetGame();
      };
      userList.appendChild(li);
      if (!currentUser) {
        currentUser = user;
        currentPlayerLabel.innerText = currentUser.name;
        resetGame();
      }
    }
    userNameInput.value = '';
  }

function gameOver() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "red";
  context.font = "50px Arial";
  context.fillText("Game Over", canvas.width / 2, canvas.height / 2);
  resetGame();

  updateUserElement();
}

function resetGame() {
  clearInterval(game);
  speed = 100;
  score = 0;
  d = "";
  snake = [];
  snake[0] = { x : 10 * box, y : 10 * box };
  food = { x : Math.floor(Math.random() * canvasSize) * box, y : Math.floor(Math.random() * canvasSize) * box };
  game = setInterval(draw, speed);

  if (currentUser) {
    updateUserElement();
  }
}

function updateUserElement() {
  Array.from(userList.children).forEach(child => {
    if (child.innerText.startsWith(currentUser.name)) {
      child.innerText = `${currentUser.name} (max: ${currentUser.maxScore})`;
    }
  });
}

document.addEventListener("keydown", direction);

function direction(event) {
  if(event.keyCode == 37 && d != "RIGHT")
    d = "LEFT";
  else if(event.keyCode == 38 && d != "DOWN")
    d = "UP";
  else if(event.keyCode == 39 && d != "LEFT")
    d = "RIGHT";
  else if(event.keyCode == 40 && d != "UP")
    d = "DOWN";
}

window.addEventListener("keydown", function(e) {
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
    }
  }, false);

  canvas.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, false);

canvas.addEventListener('touchmove', function(e) {
    e.preventDefault(); // Stop default behavior
    if (!touchStartX || !touchStartY) {
        return;
    }

    let xDiff = touchStartX - e.touches[0].clientX;
    let yDiff = touchStartY - e.touches[0].clientY;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            d = "LEFT";
        } else {
            d = "RIGHT";
        }                       
    } else {
        if (yDiff > 0) {
            d = "UP";
        } else { 
            d = "DOWN";
        }                                                                    
    }

    // Reset values
    touchStartX = null;
    touchStartY = null;
}, false);

canvas.addEventListener('touchstart', function(e) {
    e.preventDefault(); // Stop default behavior
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, false);
