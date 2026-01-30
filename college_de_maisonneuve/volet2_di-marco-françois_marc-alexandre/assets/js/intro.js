// Fichier js servant uniquement aux animations et aux intéractions liés à l'écran d'introduction

//Variables globales

let nTempsPasseeIntro = 0;

//Variables objets essentielles aux animations

let oAnimationTitreIntro = {
    nTaileTexte: 16,
    nDirection: 0.1,
    nOpacite: 1,
};

let oAnimationPersonnageIntro = {
    nCompteur: 0,
    nVitesseAnimation: 8,
};

//Variables objets essentielles aux images

let oImagePersonnageIntroHero = {
    nPositionX: -60,
    nPositionY: 250,
    nLargeurFrame: 16, // 96/6 = 16
    nHauteurFrame: 17,
    nFrameActuelle: 0,
    nTotalFrames: 6,
    Image: new Image(),
    src: "assets/images/Char_walk_right.png",
};
oImagePersonnageIntroHero.Image.src = oImagePersonnageIntroHero.src;

let oImagePersonnageIntroEnnemi = {
    nPositionX: 900,
    nPositionY: 350,
    nLargeurFrame: 16, // 96/6 = 16
    nHauteurFrame: 17,
    nFrameActuelle: 0,
    nTotalFrames: 6,
    Image: new Image(),
    src: "assets/images/Skel_walk_left.png",
};
oImagePersonnageIntroEnnemi.Image.src = oImagePersonnageIntroEnnemi.src;

let oCoeurAnimeIntroRemplie = {
    oImageCoeurRemplie: new Image(),
    srcRemplie: "assets/images/Heart.png",
};
oCoeurAnimeIntroRemplie.oImageCoeurRemplie.src = oCoeurAnimeIntroRemplie.srcRemplie;

let oCoeurAnimeIntroVide = {
    oImageCoeurVide: new Image(),
    srcVide: "assets/images/Heart-empty.png",
};
oCoeurAnimeIntroVide.oImageCoeurVide.src = oCoeurAnimeIntroVide.srcVide;

//Variables liés avec les variables objets

let oCoeurAffiche = oCoeurAnimeIntroVide.oImageCoeurVide;

let oSonIntro = new Audio();
oSonIntro.src = "assets/music/Ivan Stanton - The Epic Adventure - 01 Initd.mp3";
oSonIntro.volume = 0.5;
oSonIntro.loop = true;



//Fonction principal se dirigeant vers le fichier « index.js ».

function AnimationIntro(bFonction) {
    if (bFonction) {
        AnimationTexteIntro();
        dessinerPersonnageIntroHero();
        dessinerPersonnageIntroEnnemi();
        dessinerCoeurIntro();
    } else {
        MusiqueIntro(true);
        oAnimationTitreIntro.nOpacite = 1;
        oAnimationTitreIntro.nTaileTexte = 16;
    }
}

//Fonction exécutant la musique de l'écran des commandes

function MusiqueIntro(bActif) {
    if (bActif) {
        oSonIntro.play();
    } else {
        oSonIntro.pause();
    }
}

// Fonction lié aux animations du texte de l'intro

function AnimationTexteIntro() {
    nTempsPasseeIntro ++;

    oAnimationTitreIntro.nTaileTexte += oAnimationTitreIntro.nDirection / 1.5;
    oAnimationTitreIntro.nOpacite += (oAnimationTitreIntro.nDirection / 12) / 1.5;

    if (oAnimationTitreIntro.nTaileTexte > 30) {
        oAnimationTitreIntro.nDirection *= -1;
    } else if (oAnimationTitreIntro.nTaileTexte < 14) {
        oAnimationTitreIntro.nDirection *= -1;
    }

    if (oAnimationTitreIntro.nOpacite < 0) {
        oAnimationTitreIntro.nOpacite = 0;
    } else if (oAnimationTitreIntro.nOpacite > 1) {
        oAnimationTitreIntro.nOpacite = 1;
    }

    oAnimationPersonnageIntro.nCompteur ++;

    if (oAnimationPersonnageIntro.nCompteur % oAnimationPersonnageIntro.nVitesseAnimation == 0) {
        oImagePersonnageIntroHero.nFrameActuelle += 1;
        if (oImagePersonnageIntroHero.nFrameActuelle >= oImagePersonnageIntroHero.nTotalFrames) {
            oImagePersonnageIntroHero.nFrameActuelle = 0;
        }
    }

    if (oAnimationPersonnageIntro.nCompteur % oAnimationPersonnageIntro.nVitesseAnimation == 0) {
        oImagePersonnageIntroEnnemi.nFrameActuelle += 1;
        if (oImagePersonnageIntroEnnemi.nFrameActuelle >= oImagePersonnageIntroEnnemi.nTotalFrames) {
            oImagePersonnageIntroEnnemi.nFrameActuelle = 0;
        }
    }
}

// Fonction lié aux animations du hero de l'intro

function dessinerPersonnageIntroHero() {
    oImagePersonnageIntroHero.nPositionX++;
    let sourceX = oImagePersonnageIntroHero.nFrameActuelle * oImagePersonnageIntroHero.nLargeurFrame;
    let sourceY = 0;

    oContexte.drawImage(
        oImagePersonnageIntroHero.Image,
        sourceX,
        sourceY,  
        oImagePersonnageIntroHero.nLargeurFrame,
        oImagePersonnageIntroHero.nHauteurFrame, 
        oImagePersonnageIntroHero.nPositionX,
        oImagePersonnageIntroHero.nPositionY, 
        oImagePersonnageIntroHero.nLargeurFrame * 4,
        oImagePersonnageIntroHero.nHauteurFrame * 4
    );

    if (oImagePersonnageIntroHero.nPositionX >= 900) {
        oImagePersonnageIntroHero.nPositionX = -60;
    }
}

// Fonction lié aux animations de l'ennemi de l'intro

function dessinerPersonnageIntroEnnemi() {
    oImagePersonnageIntroEnnemi.nPositionX--;
    let sourceX = oImagePersonnageIntroEnnemi.nFrameActuelle * oImagePersonnageIntroEnnemi.nLargeurFrame;
    let sourceY = 0;

    oContexte.drawImage(
        oImagePersonnageIntroEnnemi.Image,
        sourceX,
        sourceY, 
        oImagePersonnageIntroEnnemi.nLargeurFrame,
        oImagePersonnageIntroEnnemi.nHauteurFrame, 
        oImagePersonnageIntroEnnemi.nPositionX,
        oImagePersonnageIntroEnnemi.nPositionY, 
        oImagePersonnageIntroEnnemi.nLargeurFrame * 5,
        oImagePersonnageIntroEnnemi.nHauteurFrame * 5
    );

    if (oImagePersonnageIntroEnnemi.nPositionX <= -60) {
        oImagePersonnageIntroEnnemi.nPositionX = 900;
    }
}

// Fonction lié aux animations du coueur de l'intro

function dessinerCoeurIntro() {
    if (nTempsPasseeIntro % 60 == 0) {
        oCoeurAffiche = oCoeurAnimeIntroVide.oImageCoeurVide;
    } else if (nTempsPasseeIntro % 60 == 30) {
        oCoeurAffiche = oCoeurAnimeIntroRemplie.oImageCoeurRemplie;
    }

    oContexte.drawImage(oCoeurAffiche, nLargeur / 2 - 25, 150);
}