function creerPile() {
    return [];
};

function pileEstVide(pile) {
    return pile.length===0;
};

function depiler(pile) {
    if (pileEstVide(pile) === false) {
        return pile.pop();
    }
};

function empiler(pile, element) {
    pile.push(element);
};

function retournerQueue(pile) {
    pileTemp = copierPile(pile);
    let queue = null;
    while (pileEstVide(pileTemp) === false) {
        queue = depiler(pileTemp);
    }
    return queue;
};

function insererQueue(pile, element) {
    // pour insérer en bas de pile, il faut utiliser une pile pivot pour les 
    // mettre dans l'ordre inverse puis redépiler ces éléments vers la pile avec 
    // l'élément voulue en bas de pile
    pileNouvelle = creerPile();
    empiler(pileNouvelle, element);
    pileTemp = copierPile(pile);
    pileInverse = creerPile();
    while (pileEstVide(pileTemp) === false) {
        empiler(pileInverse, depiler(pileTemp));
    };
    while (pileEstVide(pileInverse) === false) {
        empiler(pileNouvelle, depiler(pileInverse));
    }
    return pileNouvelle;
};

function copierPile(pile) {
    // pour copier le contenu d'une variable et ne pas créer une référence simple vers la pile
    return JSON.parse(JSON.stringify(pile));
}
