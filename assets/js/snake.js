const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// unité de bloc
const box = 32;

// on crée les images de fond et de nourriture
const imageFond = new Image();
imageFond.src = "/assets/img/fond.png";

const imageNourriture = new Image();
imageNourriture.src = "/assets/img/food.png";

const imageNourriture2 = new Image();
imageNourriture2.src = "/assets/img/food2.png";

const imageTeteSerpent = new Image();
imageTeteSerpent.src ="/assets/img/head.png";

const nourritures = [imageNourriture, imageNourriture2];

// variable du serpent
let serpent = creerPile();

// position de départ
empiler(serpent, {
    x : 9 * box,
    y : 10 * box
});

// générer aléatoirement la position de la nourriture
let nourriture = {
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

function collision(teteSerpent, pile) {
    let pileTemp = copierPile(pile);
    let element = null;
    while (pileEstVide(pileTemp) !== true) {
        element = depiler(pileTemp);
        if(teteSerpent.x == element.x && teteSerpent.y == element.y){
            return true;
        }
    };
}

const couleurs = ["black", "#3498db", "pink", "orange"];
let couleurAleatoire = "black";
let nourritureAleatoire = imageNourriture;

function dessiner(){
    // dessine le canevas
    ctx.drawImage(imageFond,0,0);
    
    // dessine chaque bloc du serpent
    for (let i = 0; i < serpent.length ; i++){
        if (i==0) {
            ctx.drawImage(imageTeteSerpent, serpent[i].x, serpent[i].y);
        } else {
        ctx.fillStyle = couleurAleatoire;
        ctx.fillRect(serpent[i].x,serpent[i].y,box,box);
        
        ctx.strokeStyle = "grey";
        ctx.strokeRect(serpent[i].x,serpent[i].y,box,box);
        }
    }
    // dessine le bloc de nourriture
    ctx.drawImage(nourritureAleatoire, nourriture.x, nourriture.y);
    
    // position de l'ancienne tête du serpent (queue de pile)
    let posAncienneTete = retournerQueue(serpent);
    let serpentX = posAncienneTete.x;
    let serpentY = posAncienneTete.y;
    
    // direction du serpent
    if( d == "LEFT") serpentX -= box;
    if( d == "UP") serpentY -= box;
    if( d == "RIGHT") serpentX += box;
    if( d == "DOWN") serpentY += box;
    
    // si le serpent mange la nourriture
    if(serpentX == nourriture.x && serpentY == nourriture.y){
        couleurAleatoire = couleurs[Math.floor(Math.random() * couleurs.length)];
        nourritureAleatoire = nourritures[Math.floor(Math.random() * nourritures.length)];
        score++;
        nourriture = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    }
    // on retire la queue du serpent (sommet de pile)
    else {
        depiler(serpent);
    }
    
    let nouvelleTeteSerpent = {
        x : serpentX,
        y : serpentY
    }
    
    // si le serpent touche un bord ou si on sait que le serpent se mord lui-meme, on arrete le jeu
    if(serpentX < box || serpentX > 17 * box || serpentY < 3*box || serpentY > 17*box || collision(nouvelleTeteSerpent,serpent)){
        gameEnd();
        return;
    }
    
    // on insere les coordonnées de la nouvelle tête de serpent (bas de pile)
    serpent = insererQueue(serpent, nouvelleTeteSerpent);
    
    // écrire le score dans le canevas
    ctx.fillStyle = "white";
    ctx.font = "40px Calibri";
    ctx.fillText(score, 4*box,1.5*box);
    // rappeler la fonction qui gère le canevas
    setTimeout(dessiner, vitesse);
}

dessiner();
