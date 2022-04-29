const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// unité de bloc
const box = 32;

// on crée les images de fond et de nourriture
const ground = new Image();
ground.src = "/assets/img/fond.png";

const foodImg = new Image();
foodImg.src = "/assets/img/food.png";

const food2Img = new Image();
food2Img.src = "/assets/img/food2.png";

const headImg = new Image();
headImg.src ="/assets/img/head.png";

const nourritures = [foodImg, food2Img];

// variable du serpent
let snake = [];

// position de départ
snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// générer aléatoirement la position de la nourriture
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// variable de score
let score = 0;

//  variable qui contrôle la direction du serpent
let d;

// on écoute les touches pressées par l'utilisateur
document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
    }
}

function collision(head,array) {
    // vérifie si le serpent se mord lui meme
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

const couleurs = ["black", "#3498db", "pink", "orange"];
let couleurAleatoire = "black";
let nourritureAleatoire = foodImg;

function draw(){
    // dessine le canevas
    ctx.drawImage(ground,0,0);
    
    // dessine chaque bloc du serpent
    for( let i = 0; i < snake.length ; i++){
        if (i==0) {
            ctx.drawImage(headImg, snake[i].x, snake[i].y);
        } else {
        ctx.fillStyle = couleurAleatoire;
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "grey";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
        }
    }
    // dessine le bloc de nourriture
    ctx.drawImage(nourritureAleatoire, food.x, food.y);
    
    // position de l'ancienne tête du serpent
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // direction du serpent
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // si le serpent mange la nourriture
    if(snakeX == food.x && snakeY == food.y){
        couleurAleatoire = couleurs[Math.floor(Math.random() * couleurs.length)];
        nourritureAleatoire = nourritures[Math.floor(Math.random() * nourritures.length)];
        score++;
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    }
    // on retire la queue du serpent (dernier élément dans la liste)
    else {
        snake.pop();
    }
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // si le serpent touche un bord ou si on sait que le serpent se mord lui-meme, on arrete le jeu
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        gameEnd();
        return;
    }
    
    snake.unshift(newHead);
    
    // écrire le score dans le canevas
    ctx.fillStyle = "white";
    ctx.font = "40px Calibri";
    ctx.fillText(score, 4*box,1.5*box);
    setTimeout(draw, vitesse);
}

draw();
