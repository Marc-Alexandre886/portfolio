// Fichier js servant uniquement aux animations et aux intéractions liés à l'écran de fin

// Variables Objets

let oAnimationPersonnageFin = {
    nCompteur: 0,
    nVitesseAnimation: 8,
};

let oImagePersonnageFinHero = {
    nPositionX: 900,
    nPositionY: 150,
    nLargeurFrame: 16, // 96/6 = 16
    nHauteurFrame: 17,
    nFrameActuelle: 0,
    nTotalFrames: 6,
    Image: new Image(),
    src: "assets/images/Char_walk_left.png",
};
oImagePersonnageFinHero.Image.src = oImagePersonnageFinHero.src;

let oImagePersonnageFinEnnemi = {
    nPositionX: -60,
    nPositionY: 350,
    nLargeurFrame: 16, // 96/6 = 16
    nHauteurFrame: 17,
    nFrameActuelle: 0,
    nTotalFrames: 6,
    Image: new Image(),
    src: "assets/images/Skel_walk_right.png",
};
oImagePersonnageFinEnnemi.Image.src = oImagePersonnageFinEnnemi.src;

// variables liés aux objets

let oSonFin = new Audio();
oSonFin.src = "assets/music/Ivan Stanton - The Epic Adventure - 04 The Forest Fortress.mp3";
oSonFin.volume = 0.5;
oSonFin.loop = true;



// Fonction envoyée dans le fichier « index.js ».

function AnimationFin(bFonction) {
    if (bFonction) {
        MusiqueFin(true);
        AnimationPersonnagesFin();
        dessinerPersonnageFinHero();
        dessinerPersonnageFinEnnemi();
    } else {
        MusiqueFin(false);
    }
}

// Fonction permetant de jour de la musique dans l'écran de fin

function MusiqueFin(bActif) {
    if (bActif) {
        oSonFin.play();
    } else {
        oSonFin.pause();        
    }
}

// Fonction permetant d'initialiser l'animation des images

function AnimationPersonnagesFin() {
        oAnimationPersonnageFin.nCompteur ++;

        if (oAnimationPersonnageFin.nCompteur % oAnimationPersonnageFin.nVitesseAnimation == 0) {
            oImagePersonnageFinHero.nFrameActuelle += 1;
            if (oImagePersonnageFinHero.nFrameActuelle >= oImagePersonnageFinHero.nTotalFrames) {
                oImagePersonnageFinHero.nFrameActuelle = 0;
            }
        }

        if (oAnimationPersonnageFin.nCompteur % oAnimationPersonnageFin.nVitesseAnimation == 0) {
            oImagePersonnageFinEnnemi.nFrameActuelle += 1;
            if (oImagePersonnageFinEnnemi.nFrameActuelle >= oImagePersonnageFinEnnemi.nTotalFrames) {
                oImagePersonnageFinEnnemi.nFrameActuelle = 0;
            }
        }
}

// Fonction permetant de dessiner le hero de l'écran de fin

function dessinerPersonnageFinHero() {
    oImagePersonnageFinHero.nPositionX--;
    let sourceX = oImagePersonnageFinHero.nFrameActuelle * oImagePersonnageFinHero.nLargeurFrame;
    let sourceY = 0;

    oContexte.drawImage(
        oImagePersonnageFinHero.Image,
        sourceX,
        sourceY,  
        oImagePersonnageFinHero.nLargeurFrame,
        oImagePersonnageFinHero.nHauteurFrame, 
        oImagePersonnageFinHero.nPositionX,
        oImagePersonnageFinHero.nPositionY, 
        oImagePersonnageFinHero.nLargeurFrame * 5,
        oImagePersonnageFinHero.nHauteurFrame * 5
    );

    if (oImagePersonnageFinHero.nPositionX <= -60) {
        oImagePersonnageFinHero.nPositionX = 900;
    }
}

// Fonction permetant de dessiner l'ennemi dans l'écran de fin

function dessinerPersonnageFinEnnemi() {
    oImagePersonnageFinEnnemi.nPositionX++;
    let sourceX = oImagePersonnageFinEnnemi.nFrameActuelle * oImagePersonnageFinEnnemi.nLargeurFrame;
    let sourceY = 0;

    oContexte.drawImage(
        oImagePersonnageFinEnnemi.Image,
        sourceX,
        sourceY, 
        oImagePersonnageFinEnnemi.nLargeurFrame,
        oImagePersonnageFinEnnemi.nHauteurFrame, 
        oImagePersonnageFinEnnemi.nPositionX,
        oImagePersonnageFinEnnemi.nPositionY, 
        oImagePersonnageFinEnnemi.nLargeurFrame * 4,
        oImagePersonnageFinEnnemi.nHauteurFrame * 4
    );

    if (oImagePersonnageFinEnnemi.nPositionX >= 900) {
        oImagePersonnageFinEnnemi.nPositionX = -60;
    }
}