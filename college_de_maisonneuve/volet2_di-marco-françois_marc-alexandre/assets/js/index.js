// Fichier JS principal. Il lie aussi les autres fichiers JS


//Variables globales

let oCanvasHTML = document.getElementById("the_lengend_of_stranger");
let oContexte = oCanvasHTML.getContext("2d");
let nLargeur = oCanvasHTML.width;
let nHauteur = oCanvasHTML.height;
oContexte.imageSmoothingEnabled = false;

let sEtatJeu = "intro";
let bQuestionnaire;
let nQuestionActuelle = 1;

//Variables objets

let oSouris = {
    nPositionCurseurX :0,
    nPositionCurseurY :  0,
    bBoutonApuye : false,
};

let oFond = {
    x: 0,
    y: 0,
    largeur: oCanvasHTML.width,
    hauteur: oCanvasHTML.height,
    vitesse: 2,
    image: new Image(),
    src: "assets/images/back.png",
};
oFond.image.src = oFond.src;

let oBoutonPourJouer = {
    nPositionX : 300,
    nPositionY : 470,
    nLargeurBoutonX : 315,
    nHauteurBoutonY : 36,
};

let oBoutonAuCommande = {
    nPositionX : 13,
    nPositionY : 45,
    nLargeurBoutonX : 155,
    nHauteurBoutonY : 40,
};

//Fonctions principales essentielles à l'animation

function initialiser() {
    setInterval(boucleJeu, 1000 / 60);
    oCanvasHTML.addEventListener("click", clicCanvas);
    oCanvasHTML.addEventListener("mouseup", boutonSouris);
    window.addEventListener("keydown", ToucheAppuye);
}

function ToucheAppuye(evenement) {
    let oTouche = evenement.key;
    if (oTouche == "b") {
        nQuestionActuelle += 1;
    }
}

function boutonSouris(evenement) {
    oSouris.nPositionCurseurX = evenement.offsetX;
    oSouris.nPositionCurseurY = evenement.offsetY;
}

function boucleJeu() {
    oContexte.clearRect(0, 0, nLargeur, nHauteur);
    oFond.vitesse = 1;

    if (sEtatJeu == "intro") {
        afficherIntro();
    } else if (sEtatJeu == "commande") {
        afficherCommande(true);
    } else if (sEtatJeu == "jeu") {
        afficherJeu();
    } else if (sEtatJeu == "fin") {
        afficherFin();
    } 
}

function clicCanvas() {
    if (sEtatJeu == "intro") {
        let bCollisionIntro = verifierCollisions(oSouris.nPositionCurseurX, oSouris.nPositionCurseurY, 
                                            oImagePersonnageIntroEnnemi.nPositionX, oImagePersonnageIntroEnnemi.nPositionY,
                                            oImagePersonnageIntroEnnemi.nLargeurFrame * 4, oImagePersonnageIntroEnnemi.nHauteurFrame * 4
                                           );
        if (bCollisionIntro) {
            sEtatJeu = "commande";
        }
    } else if (sEtatJeu == "commande") {
        let bCollisionJeu = verifierCollisions(oSouris.nPositionCurseurX, oSouris.nPositionCurseurY,
                                            oBoutonPourJouer.nPositionX, oBoutonPourJouer.nPositionY,
                                            oBoutonPourJouer.nLargeurBoutonX, oBoutonPourJouer.nHauteurBoutonY);
        
        if (bCollisionJeu) {
            bQuestionnaire = true;
            if (bQuestionnaire) {

            }
            sEtatJeu = "jeu";
        }
    } else if (sEtatJeu == "fin") {
        bQuestionnaire = false;
        let bCollisionFin = verifierCollisions(oSouris.nPositionCurseurX, oSouris.nPositionCurseurY, 
                                            oImagePersonnageFinHero.nPositionX, oImagePersonnageFinHero.nPositionY,
                                            oImagePersonnageFinHero.nLargeurFrame * 4, oImagePersonnageFinHero.nHauteurFrame * 4
                                           );
        if (bCollisionFin) {
          sEtatJeu = "intro";   
        }
    }
    
}

function dessinerDessinerBase() {
    oFond.image.src = oFond.src;
    oFond.y += oFond.vitesse;
    if (oFond.y > nHauteur) {
        oFond.y = 0;
    }
    oContexte.drawImage(oFond.image, oFond.x, oFond.y, nLargeur, nHauteur);
    oContexte.drawImage(oFond.image, oFond.x, oFond.y - nHauteur, nLargeur, nHauteur);
}

//Fonctions dessinant les écrans du jeu

function afficherCommande(bActivee) {
    dessinerDessinerBase();
    AnimationIntro(false);
    if (bActivee) {
        oContexte.fillStyle = "rgb(172, 84, 33)";
        oContexte.font = `32px Playpen`;
        oContexte.textAlign = "center";
        oContexte.fillText("Se déplacer en haut : Flèche du haut ou 'W'", nLargeur / 2, 100);
        oContexte.fillText("Se déplacer en bas : Flèche du bas ou 'S'", nLargeur / 2, 150);
        oContexte.fillText("Se déplacer à gauche : Flèche de gauche ou 'A'", nLargeur / 2, 200);
        oContexte.fillText("Se déplacer à droite : Flèche de droite ou 'D'", nLargeur / 2, 250);
        oContexte.fillText("Faire une attaque : 'espace' ou 'enter'", nLargeur / 2, 300);
        oContexte.fillText("Replacer une boîte bleu : 'shift' ou 'backspace'", nLargeur / 2, 350);

        oContexte.fillStyle = "white";
        oContexte.fillRect(oBoutonPourJouer.nPositionX, oBoutonPourJouer.nPositionY, 
                           oBoutonPourJouer.nLargeurBoutonX, oBoutonPourJouer.nHauteurBoutonY);
        oContexte.fillStyle = "black";
        oContexte.fillText("Cliquez pour jouer", nLargeur / 2, 500);   
        
        oImagePersonnageJeuHero.nPositionX = 430;
        oImagePersonnageJeuHero.nPositionY = 550;
    } else{
        MusiqueIntro(false);
    }
}

function afficherIntro() {
    dessinerDessinerBase();
    AnimationFin(false);
    AnimationIntro(true);

    oContexte.fillStyle = `rgba(205, 225, 25, ${oAnimationTitreIntro.nOpacite})`;
    oContexte.font = `${oAnimationTitreIntro.nTaileTexte}px Playpen`;
    oContexte.textAlign = "center";
    oContexte.fillText("The legend of stranger", nLargeur / 2, 100);
    oContexte.fillStyle = `rgba(228, 34, 34, ${oAnimationTitreIntro.nOpacite})`;
    oContexte.fillText("Frappez le squelette pour découvrir la véritée.", nLargeur / 2, 500);
}

function afficherJeu() {
    afficherCommande(false);
    AnimationJeu(true);
    ecrireQuestion();
    retourCommandes();
    if(!bQuestionnaire) {
        nQuestionActuelle = undefined;
        sEtatJeu = "fin";
    }
}

function afficherFin() {
    dessinerDessinerBase();
    AnimationJeu(false);
    AnimationFin(true);
    reintialiser();

    oContexte.fillStyle = "Yellow";
    oContexte.fillText("Veuillez frappez le joueur pour recommencer", nLargeur / 2, 100);
    oContexte.fillText("Création de Marc-Alexandre Di Marco François TIM 2025", nLargeur / 2, 500);

    nTempsPassee = 0;
}

//Fonctions dessinant les questions sur l'écran du jeu

function ecrireQuestion() {
    oContexte.font = "28px Playpen";
    oContexte.fillStyle = "white";
    switch (nQuestionActuelle) {
        case 1:
            oContexte.fillText("Quel est le nom de l'hérisson bleu?", nLargeur / 2, 30);
            ecrireReponses(1);
            break;
        case 2:
            oContexte.fillText("Quel est le nom du plombier Italien?", nLargeur / 2, 30);
            ecrireReponses(2);
            break;
        case 3:
            oContexte.fillText("Quel est le nom du héros sauvant le royaume d'hyrule?", nLargeur / 2, 30);
            ecrireReponses(3);
            break;
        case 4:
            oContexte.fillStyle = "black";
            bQuestionnaire = false;
            break;
    }
    
}

function ecrireReponses(nChoixActuelles) {
    oContexte.font = "22px Playpen";
    switch (nChoixActuelles) {
        case 1:
            oContexte.fillStyle = "#5069b1";
            oContexte.fillText("Superman", 300, 110);
            oContexte.fillText("Sonic", 450, 110);
            oContexte.fillText("Porc-épic", 590, 110);
            break;
        case 2:
            oContexte.fillStyle = "#b0191b";
            oContexte.fillText("Mario", 310, 110);
            oContexte.fillText("Knuckles", 450, 110);
            oContexte.fillText("Flash", 580, 110);
            break;
        case 3:
            oContexte.fillStyle = "#62b041";
            oContexte.fillText("Luigi", 310, 110);
            oContexte.fillText("Shadow", 450, 110);
            oContexte.fillText("Link", 580, 110);
            break;
        default:
            console.error("La logique des réponses ne fonctionne pas.");
            break;
    }
}

function retourCommandes() {
    oContexte.fillStyle = "rgb(206, 206, 206)";
    oContexte.fillRect(oBoutonAuCommande.nPositionX, oBoutonAuCommande.nPositionY, oBoutonAuCommande.nLargeurBoutonX, oBoutonAuCommande.nHauteurBoutonY);
    oContexte.fillStyle = "#fff200ff";
    oContexte.font = "28px Playpen";
    oContexte.fillText("Commande", 90, 75);
    oContexte.fillText("Détruisez les boîtes et les squelettes", (nLargeur / 2) - 30, 75);
    let bCollisionCommande = verifierCollisions(oSouris.nPositionCurseurX, oSouris.nPositionCurseurY,
                                    oBoutonAuCommande.nPositionX, oBoutonAuCommande.nPositionY,
                                    oBoutonAuCommande.nLargeurBoutonX, oBoutonAuCommande.nHauteurBoutonY);
    if (bCollisionCommande) {
        sEtatJeu = "commande";
        MusiqueJeu(false);
    }
}

function reintialiser() {
    nTempsPassee = 0;
    nTempsPasseeJeu = 0;
    nQuestionActuelle = 1;
}

//Fonctions intéractives

function verifierCollisions(
    positionXCurseur,
    positionYCurseur,
    positionXElement,
    positionYElement,
    largeurElement,
    hauteurElement
) {
    if (positionXCurseur >= positionXElement &&
        positionXCurseur <= positionXElement + largeurElement &&
        positionYCurseur >= positionYElement &&
        positionYCurseur <= positionYElement + hauteurElement
    ) {
        return true;
    } else {
        return false;
    }
}

// Exécute le code JS après que la page HTML soit chargée

window.addEventListener("load", initialiser);