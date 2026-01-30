// Fichier js servant uniquement aux animations et aux intéractions liés à l'écran du jeu


// variables globales

let nTempsPasseeJeu = 0;
let nPositionImageY = -1;
let nPositionImageX = -1;

let bCollisionHeroMur = undefined;
let bCollisionHeroBoite = undefined;
let bAttaqueActivee = undefined;

let sDerniereTouche = undefined;

// Variables Objets du terrain de jeu

let oImagePlancherjeu = {
    Image: new Image(),
    src: "assets/images/ground.png",
};
oImagePlancherjeu.Image.src = oImagePlancherjeu.src;

let oImageMurJeu = {
    nPositionX : 0,
    nPositionY : 0,
    nLargeurFrame : 18,
    nHauteurFrame : 18,
    Image: new Image(),
    src: "assets/images/wall.png",
};
oImageMurJeu.Image.src = oImageMurJeu.src;

let oImageVideJeu = {
    nPositionX : 0,
    nPositionY : 0,
    nLargeurFrame : 18,
    nHauteurFrame : 18,
    Image: new Image(),
    src: "assets/images/hole.png",
};
oImageVideJeu.Image.src = oImageVideJeu.src;

let oImageBoiteJeu = {
    nPositionX : 0,
    nPositionY : 0,
    nLargeurFrame : 18,
    nHauteurFrame : 18,
    Image: new Image(),
    src: "assets/images/box.png",
};
oImageBoiteJeu.Image.src = oImageBoiteJeu.src;

let oCollisionMur = {
    nPositionX : 0,
    nPositionY : 0,
    nLargeurFrame : oImageMurJeu.nLargeurFrame,
    nHauteurFrame : oImageMurJeu.nHauteurFrame,
};

// Variables Objets de l'animation du jeu

let oAnimationPersonnageJeu = {
    nCompteur: 0,
    nVitesseAnimation: 8,
    bFinAnimation : false,
};

let oImagePersonnageJeuHero = {
    nPositionX: 430,
    nPositionY: 550,
    nLargeurFrame: 16, // 96/6 = 16
    nHauteurFrame: 17,
    nFrameActuelle: 0,
    nTotalFrames: 6,
    Image: new Image(),
    src: "assets/images/Char_walk_up.png",
};
oImagePersonnageJeuHero.Image.src = oImagePersonnageJeuHero.src;

let oImagePersonnageJeuHeroHaut = {
    nPositionX: 430,
    nPositionY: 550,
    nLargeurFrame: 16, // 96/6 = 16
    nHauteurFrame: 17,
    nFrameActuelle: 0,
    nTotalFrames: 6,
    Image: new Image(),
    src: "assets/images/Char_walk_up.png",
};

let oImagePersonnageJeuHeroHautAttaque = {
    nPositionX: 430,
    nPositionY: 550,
    nLargeurFrame: 23, // 138 / 6 = 23
    nHauteurFrame: 18,
    nFrameActuelle: 0,
    nTotalFrames: 6,
    Image: new Image(),
    src: "assets/images/Char_atk_up.png",
};

let oImagePersonnageJeuHeroHautAttaqueInverse = {
    nPositionX: 430,
    nPositionY: 550,
    nLargeurFrame: 23, // 138 / 6 = 23
    nHauteurFrame: 18,
    nFrameActuelle: 0,
    nTotalFrames: 6,
    Image: new Image(),
    src: "assets/images/Char_atk_up_reversed.png",
};

let oImagePersonnageJeuHeroBas = {
    nPositionX: 430,
    nPositionY: 550,
    nLargeurFrame: 16, // 96/6 = 16
    nHauteurFrame: 17,
    nFrameActuelle: 0,
    nTotalFrames: 6,
    Image: new Image(),
    src: "assets/images/Char_walk_down.png",
};

let oImagePersonnageJeuHeroGauche = {
    nPositionX: 430,
    nPositionY: 550,
    nLargeurFrame: 16, // 96/6 = 16
    nHauteurFrame: 17,
    nFrameActuelle: 0,
    nTotalFrames: 6,
    Image: new Image(),
    src: "assets/images/Char_walk_left.png",
};


let oImagePersonnageJeuHeroDroite = {
    nPositionX: 430,
    nPositionY: 550,
    nLargeurFrame: 16, // 96/6 = 16
    nHauteurFrame: 17,
    nFrameActuelle: 0,
    nTotalFrames: 6,
    Image: new Image(),
    src: "assets/images/Char_walk_right.png",
};

let oImagePersonnageJeuEnnemiGauche = {
    nPositionX: 300,
    nPositionY: 135,
    nLargeurFrame: 16, // 96/6 = 16
    nHauteurFrame: 17,
    nFrameActuelle: 0,
    nTotalFrames: 6,
    Image: new Image(),
    src: "assets/images/Skel_idle_down.png",
};
oImagePersonnageJeuEnnemiGauche.Image.src = oImagePersonnageJeuEnnemiGauche.src;

let oImagePersonnageJeuEnnemiMillieu = {
    nPositionX: 415,
    nPositionY: 135,
    nLargeurFrame: 16, // 96/6 = 16
    nHauteurFrame: 17,
    nFrameActuelle: 0,
    nTotalFrames: 6,
    Image: new Image(),
    src: "assets/images/Skel_idle_down.png",
};
oImagePersonnageJeuEnnemiMillieu.Image.src = oImagePersonnageJeuEnnemiMillieu.src;

let oImagePersonnageJeuEnnemiDroite = {
    nPositionX: 530,
    nPositionY: 135,
    nLargeurFrame: 16, // 96/6 = 16
    nHauteurFrame: 17,
    nFrameActuelle: 0,
    nTotalFrames: 6,
    Image: new Image(),
    src: "assets/images/Skel_idle_down.png",
};
oImagePersonnageJeuEnnemiDroite.Image.src = oImagePersonnageJeuEnnemiDroite.src;

// Variables liés aux objets

let aHitBoxHeroMur = [
   
];

let aHitBoxHeroBoite = [

];

let aHitBoxHeroEnnemi = [

];

let aBoiteDetruite = [

];


let sourceX = oImagePersonnageJeuHero.nFrameActuelle * oImagePersonnageJeuHero.nLargeurFrame;

// audio de l'écran de jeu

let oSonJeu = new Audio("assets/music/Ivan Stanton - The Epic Adventure - 02 Quantum.mp3");
oSonJeu.volume = 0.5;
oSonJeu.loop = true;

let oSonJeuSuscces = new Audio("assets/music/sonSuscces.wav");
oSonJeu.volume = 0.75;
oSonJeu.loop = true;

let oSonJeuDefaite = new Audio("assets/music/sonErreur.wav");
oSonJeu.volume = 1;
oSonJeu.loop = true;

genererHitboxes();

//Fonction envoyé dans le fichier index.js

function AnimationJeu(bFonction) {
    if (bFonction) {
        MusiqueJeu(true);
        dessinerTerrain();
        AnimationPersonnagesJeu();
        dessinerPersonnageJeuHero();
        dessinerPersonnageJeuEnnemi();
        dessinerUI();
    } else {
        MusiqueJeu(false);
    }
}

// Fonction permetant la musique dans l'écran de jeu

function MusiqueJeu(bActif) {
    if (bActif) {
        oSonJeu.play();
    } else {
        oSonJeu.pause();
    }
}

// Fonction dessinant le score du joueur

function dessinerUI() {
    oContexte.fillStyle = "#a84d9d";
    oContexte.fillText(`Question : ${nQuestionActuelle} / 3`, 775, 75);
}

// Fonction permetant d'initialiser l'animation des images

function AnimationPersonnagesJeu() {
        oAnimationPersonnageJeu.nCompteur ++;
        
        if (oAnimationPersonnageJeu.nCompteur % oAnimationPersonnageJeu.nVitesseAnimation == 0) {
            if (bAttaqueActivee && sDerniereTouche == "Mouvement") {
                oImagePersonnageJeuHero.nPositionX += 1;
            }

            oImagePersonnageJeuHero.nFrameActuelle += 1;
            if (bAttaqueActivee && oImagePersonnageJeuHero.nFrameActuelle == 6) {
                oImagePersonnageJeuHero.nPositionX += 15;
                oImagePersonnageJeuHero.Image.src = oImagePersonnageJeuHeroHaut.src;  
                oImagePersonnageJeuHero.nLargeurFrame = oImagePersonnageJeuHeroHaut.nLargeurFrame;
                oImagePersonnageJeuHero.nHauteurFrame = oImagePersonnageJeuHeroHaut.nHauteurFrame;
                bAttaqueActivee = false;
            }
            if (oImagePersonnageJeuHero.nFrameActuelle >= oImagePersonnageJeuHero.nTotalFrames) {
                oImagePersonnageJeuHero.nFrameActuelle = 0;
            }
        }

        if (oAnimationPersonnageJeu.nCompteur % oAnimationPersonnageJeu.nVitesseAnimation == 0) {
            oImagePersonnageJeuEnnemiGauche.nFrameActuelle += 1;
            if (oImagePersonnageJeuEnnemiGauche.nFrameActuelle >= oImagePersonnageJeuEnnemiGauche.nTotalFrames) {
                oImagePersonnageJeuEnnemiGauche.nFrameActuelle = 0;
            }
        }

        if (oAnimationPersonnageJeu.nCompteur % oAnimationPersonnageJeu.nVitesseAnimation == 0) {
            oImagePersonnageJeuEnnemiMillieu.nFrameActuelle += 1;
            if (oImagePersonnageJeuEnnemiMillieu.nFrameActuelle >= oImagePersonnageJeuEnnemiMillieu.nTotalFrames) {
                oImagePersonnageJeuEnnemiMillieu.nFrameActuelle = 0;
            }
        }

        if (oAnimationPersonnageJeu.nCompteur % oAnimationPersonnageJeu.nVitesseAnimation == 0) {
            oImagePersonnageJeuEnnemiDroite.nFrameActuelle += 1;
            if (oImagePersonnageJeuEnnemiDroite.nFrameActuelle >= oImagePersonnageJeuEnnemiDroite.nTotalFrames) {
                oImagePersonnageJeuEnnemiDroite.nFrameActuelle = 0;
            }
        }
}

// Fonction permetant de génénrer toutes le collisions entre le joueur et sa zone d'intéraction

function genererHitboxes(){
    aHitBoxHeroMur = [];
    aHitBoxHeroBoite = [];
    aHitBoxHeroEnnemi = [];
    // collision des murs du squelette à gauche

    for (nPositionImageX = oImagePersonnageJeuEnnemiGauche.nPositionX + 16;
        nPositionImageX < oImagePersonnageJeuEnnemiGauche.nPositionX + 100;
        nPositionImageX += 16
    ) {
        aHitBoxHeroMur.push({nPositionX:nPositionImageX, nPositionY:nPositionImageY, nLargeurFrame:18, nHauteurFrame:18});
        if (nPositionImageX >= oImagePersonnageJeuEnnemiGauche.nPositionX + 48 && nPositionImageY < 178) {
            nPositionImageX = oImagePersonnageJeuEnnemiGauche.nPositionX + 16;
            nPositionImageY += 18;
        } else if (nPositionImageX > oImagePersonnageJeuEnnemiGauche.nPositionX + 32 && nPositionImageY > 178) {
            nPositionImageY = 125;
            break;
        }
    }

    for (nPositionImageX = oImagePersonnageJeuEnnemiGauche.nPositionX - 32;
        nPositionImageX < oImagePersonnageJeuEnnemiGauche.nPositionX + 16;
        nPositionImageX += 16
    ) {
        aHitBoxHeroMur.push({nPositionX:nPositionImageX, nPositionY:nPositionImageY, nLargeurFrame:18, nHauteurFrame:18});
        if (nPositionImageX >= oImagePersonnageJeuEnnemiGauche.nPositionX - 32 && nPositionImageY < 342) {
            nPositionImageX = oImagePersonnageJeuEnnemiGauche.nPositionX - 48;
            nPositionImageY += 18;
        } else if (nPositionImageX > oImagePersonnageJeuEnnemiGauche.nPositionX - 48 && nPositionImageY > 342) {
            nPositionImageY = 125;
            break;
        }
    }
    
    // collision des murs du squelette au millieu

    for (nPositionImageX = oImagePersonnageJeuEnnemiMillieu.nPositionX + 32;
        nPositionImageX < oImagePersonnageJeuEnnemiMillieu.nPositionX + 100;
        nPositionImageX += 16
    ) {
        aHitBoxHeroMur.push({nPositionX:nPositionImageX, nPositionY:nPositionImageY, nLargeurFrame:18, nHauteurFrame:18});
        if (nPositionImageX >= oImagePersonnageJeuEnnemiMillieu.nPositionX + 48 && nPositionImageY < 178) {
            nPositionImageX = oImagePersonnageJeuEnnemiMillieu.nPositionX + 32;
            nPositionImageY += 18;
        } else if (nPositionImageX > oImagePersonnageJeuEnnemiMillieu.nPositionX + 32 && nPositionImageY > 178) {
            nPositionImageY = 125;
            break;
        }
    }

    for (nPositionImageX = oImagePersonnageJeuEnnemiMillieu.nPositionX - 32;
        nPositionImageX < oImagePersonnageJeuEnnemiMillieu.nPositionX + 16;
        nPositionImageX += 16
    ) {
        aHitBoxHeroMur.push({nPositionX:nPositionImageX, nPositionY:nPositionImageY, nLargeurFrame:18, nHauteurFrame:18});
        if (nPositionImageX >= oImagePersonnageJeuEnnemiMillieu.nPositionX - 32 && nPositionImageY < 178) {
            nPositionImageX = oImagePersonnageJeuEnnemiMillieu.nPositionX - 48;
            nPositionImageY += 18;
        } else if (nPositionImageX > oImagePersonnageJeuEnnemiMillieu.nPositionX - 48 && nPositionImageY > 178) {
            nPositionImageY = 125;
            break;
        }
    }

    // collision des murs du squelette à droite

    for (nPositionImageX = oImagePersonnageJeuEnnemiDroite.nPositionX + 16;
        nPositionImageX < oImagePersonnageJeuEnnemiDroite.nPositionX + 100;
        nPositionImageX += 16
    ) {
        aHitBoxHeroMur.push({nPositionX:nPositionImageX, nPositionY:nPositionImageY, nLargeurFrame:18, nHauteurFrame:18});
        if (nPositionImageX >= oImagePersonnageJeuEnnemiDroite.nPositionX + 48 && nPositionImageY < 342) {
            nPositionImageX = oImagePersonnageJeuEnnemiDroite.nPositionX + 16;
            nPositionImageY += 18;
        } else if (nPositionImageX > oImagePersonnageJeuEnnemiDroite.nPositionX + 32 && nPositionImageY > 342) {
            nPositionImageY = 125;
            break;
        }
    }

    for (nPositionImageX = oImagePersonnageJeuEnnemiDroite.nPositionX - 32;
        nPositionImageX < oImagePersonnageJeuEnnemiDroite.nPositionX + 16;
        nPositionImageX += 16
    ) {
        aHitBoxHeroMur.push({nPositionX:nPositionImageX, nPositionY:nPositionImageY, nLargeurFrame:18, nHauteurFrame:18});
        if (nPositionImageX >= oImagePersonnageJeuEnnemiDroite.nPositionX - 32 && nPositionImageY < 178) {
            nPositionImageX = oImagePersonnageJeuEnnemiDroite.nPositionX - 48;
            nPositionImageY += 18;
        } else if (nPositionImageX >= oImagePersonnageJeuEnnemiDroite.nPositionX - 32 && nPositionImageY > 178) {
            nPositionImageY = 125;
            break;
        }
    }

    // collision des murs
    for (nPositionImageX = -1; nPositionImageX < 270; nPositionImageX += 18) {
        aHitBoxHeroMur.push({nPositionX:nPositionImageX, nPositionY:nPositionImageY, nLargeurFrame:18, nHauteurFrame:18});
        if (nPositionImageX >= 250 && nPositionImageY < 600) {
            nPositionImageX = -18;
            nPositionImageY += 18;
        } else if (nPositionImageX > 250 && nPositionImageY > 600) {
            nPositionImageY = -1;
            break;
        }
    }

    for (nPositionImageX = 596; nPositionImageX < 930; nPositionImageX += 18) {
        aHitBoxHeroMur.push({nPositionX:nPositionImageX, nPositionY:nPositionImageY, nLargeurFrame:18, nHauteurFrame:18});
        if (nPositionImageX >= 918 && nPositionImageY < 600) {
            nPositionImageX = 578;
            nPositionImageY += 18;
        } else if (nPositionImageX > 900 && nPositionImageY > 600) {
            nPositionImageY = 350;
            break;
        }
    }

    //collision des murs autour du joueur

    for (nPositionImageX = 470; nPositionImageX < 590; nPositionImageX += 18) {
        aHitBoxHeroMur.push({nPositionX:nPositionImageX, nPositionY:nPositionImageY, nLargeurFrame:18, nHauteurFrame:18});
        if (bCollisionHeroMur == true) {
            oImagePersonnageJeuHero.nPositionX = nRetourPosX;
            oImagePersonnageJeuHero.nPositionY = nRetourPosY;
        }
        if (nPositionImageX >= 568 && nPositionImageY < 600) {
            nPositionImageX = 452;
            nPositionImageY += 16;
        } else if (nPositionImageX > 568 && nPositionImageY > 600) {
            nPositionImageY = 342;
            break;
        }
    }

    for (nPositionImageX = 270; nPositionImageX < 420; nPositionImageX += 18) {
        aHitBoxHeroMur.push({nPositionX:nPositionImageX, nPositionY:nPositionImageY, nLargeurFrame:18, nHauteurFrame:18});
        if (nPositionImageX >= 390 && nPositionImageY < 600) {
            nPositionImageX = 252;
            nPositionImageY += 18;
        } else if (nPositionImageX > 390 && nPositionImageY > 600) {
            nPositionImageY = 125;
            break;
        }
    }


    // collision du vide

    for (nPositionImageX = 0; nPositionImageX < 960; nPositionImageX += 18) {
        aHitBoxHeroMur.push({nPositionX:nPositionImageX, nPositionY:nPositionImageY, nLargeurFrame:18, nHauteurFrame:18});
        if (nPositionImageX >= 900 && nPositionImageY < 103) {
            nPositionImageX = -18;
            nPositionImageY += 18;
        } else if (nPositionImageX > 900 && nPositionImageY > 103) {
            nPositionImageY = 0;
            break;
        }
    }

    // collision des boîtes

    genererHitboxesBoites();
    
    // collision des squelettes

    aHitBoxHeroEnnemi.push({nPositionX:oImagePersonnageJeuEnnemiGauche.nPositionX, 
            nPositionY:oImagePersonnageJeuEnnemiGauche.nPositionY,
            nLargeurFrame:oImagePersonnageJeuEnnemiGauche.nLargeurFrame * 2.5, 
            nHauteurFrame:oImagePersonnageJeuEnnemiGauche.nHauteurFrame * 2.5}
        );

    aHitBoxHeroEnnemi.push({nPositionX:oImagePersonnageJeuEnnemiMillieu.nPositionX, 
                nPositionY:oImagePersonnageJeuEnnemiMillieu.nPositionY,
                nLargeurFrame:oImagePersonnageJeuEnnemiMillieu.nLargeurFrame * 2.5, 
                nHauteurFrame:oImagePersonnageJeuEnnemiMillieu.nHauteurFrame * 2.5}
            );

    aHitBoxHeroEnnemi.push({nPositionX:oImagePersonnageJeuEnnemiDroite.nPositionX, 
            nPositionY:oImagePersonnageJeuEnnemiDroite.nPositionY,
            nLargeurFrame:oImagePersonnageJeuEnnemiDroite.nLargeurFrame * 2.5, 
            nHauteurFrame:oImagePersonnageJeuEnnemiDroite.nHauteurFrame * 2.5}
        );
}

// Fonction permetant de génénrer les hitboxs de la boîte

function genererHitboxesBoites() {
    aHitBoxHeroBoite.push({nPositionX:oImagePersonnageJeuEnnemiGauche.nPositionX - 3, 
                nPositionY:oImagePersonnageJeuEnnemiGauche.nPositionY + 45,
                nLargeurFrame:oImagePersonnageJeuEnnemiGauche.nLargeurFrame * 2.5, 
                nHauteurFrame:oImagePersonnageJeuEnnemiGauche.nHauteurFrame * 2.5,
                image : new Image(),
                src : "assets/images/box.png"}
        );

    aHitBoxHeroBoite.push({nPositionX:oImagePersonnageJeuEnnemiMillieu.nPositionX + 3, 
                nPositionY:oImagePersonnageJeuEnnemiMillieu.nPositionY + 45,
                nLargeurFrame:oImagePersonnageJeuEnnemiMillieu.nLargeurFrame * 2.5, 
                nHauteurFrame:oImagePersonnageJeuEnnemiMillieu.nHauteurFrame * 2.5,
                image : new Image(),
                src : "assets/images/box.png"}
            );


    aHitBoxHeroBoite.push({nPositionX:oImagePersonnageJeuEnnemiDroite.nPositionX + 3, 
                nPositionY:oImagePersonnageJeuEnnemiDroite.nPositionY + 45,
                nLargeurFrame:oImagePersonnageJeuEnnemiDroite.nLargeurFrame * 2.5, 
                nHauteurFrame:oImagePersonnageJeuEnnemiDroite.nHauteurFrame * 2.5,
                image : new Image(),
                src : "assets/images/box.png"}
            );
}

// Fonction permetant de dessiner le terrain autour de l'ennemi dans le jeu

function dessinerTerrainennemi() {
    //zone du squelette à gauche
    for (nPositionImageX = oImagePersonnageJeuEnnemiGauche.nPositionX + 48;
        nPositionImageX < oImagePersonnageJeuEnnemiGauche.nPositionX + 100;
        nPositionImageX += 16
    ) {
        oContexte.drawImage(oImageMurJeu.Image, nPositionImageX, nPositionImageY);
        if (nPositionImageX >= oImagePersonnageJeuEnnemiGauche.nPositionX + 48 && nPositionImageY < 178) {
            nPositionImageX = oImagePersonnageJeuEnnemiGauche.nPositionX + 32;
            nPositionImageY += 18;
        } else if (nPositionImageX > oImagePersonnageJeuEnnemiGauche.nPositionX + 32 && nPositionImageY > 178) {
            nPositionImageY = 125;
            break;
        }
    }

    for (nPositionImageX = oImagePersonnageJeuEnnemiGauche.nPositionX - 32;
        nPositionImageX < oImagePersonnageJeuEnnemiGauche.nPositionX + 16;
        nPositionImageX += 16
    ) {
        oContexte.drawImage(oImageMurJeu.Image, nPositionImageX, nPositionImageY);
        if (nPositionImageX >= oImagePersonnageJeuEnnemiGauche.nPositionX - 32 && nPositionImageY < 342) {
            nPositionImageX = oImagePersonnageJeuEnnemiGauche.nPositionX - 48;
            nPositionImageY += 18;
        } else if (nPositionImageX > oImagePersonnageJeuEnnemiGauche.nPositionX - 48 && nPositionImageY > 342) {
            nPositionImageY = 125;
            break;
        }
    }

    //zone du squelete au millieu
    for (nPositionImageX = oImagePersonnageJeuEnnemiMillieu.nPositionX + 48;
        nPositionImageX < oImagePersonnageJeuEnnemiMillieu.nPositionX + 100;
        nPositionImageX += 16
    ) {
        oContexte.drawImage(oImageMurJeu.Image, nPositionImageX, nPositionImageY);
        if (nPositionImageX >= oImagePersonnageJeuEnnemiMillieu.nPositionX + 48 && nPositionImageY < 178) {
            nPositionImageX = oImagePersonnageJeuEnnemiMillieu.nPositionX + 32;
            nPositionImageY += 18;
        } else if (nPositionImageX > oImagePersonnageJeuEnnemiMillieu.nPositionX + 46 && nPositionImageY > 178) {
            nPositionImageY = 125;
            break;
        }
    }

    for (nPositionImageX = oImagePersonnageJeuEnnemiMillieu.nPositionX - 32;
        nPositionImageX < oImagePersonnageJeuEnnemiMillieu.nPositionX + 16;
        nPositionImageX += 16
    ) {
        oContexte.drawImage(oImageMurJeu.Image, nPositionImageX, nPositionImageY);
        if (nPositionImageX >= oImagePersonnageJeuEnnemiMillieu.nPositionX - 32 && nPositionImageY < 178) {
            nPositionImageX = oImagePersonnageJeuEnnemiMillieu.nPositionX - 48;
            nPositionImageY += 18;
        } else if (nPositionImageX > oImagePersonnageJeuEnnemiMillieu.nPositionX - 48 && nPositionImageY > 178) {
            nPositionImageY = 125;
            break;
        }
    }

    //zone du squelete à droite
    for (nPositionImageX = oImagePersonnageJeuEnnemiDroite.nPositionX + 48;
        nPositionImageX < oImagePersonnageJeuEnnemiDroite.nPositionX + 100;
        nPositionImageX += 16
    ) {
        oContexte.drawImage(oImageMurJeu.Image, nPositionImageX, nPositionImageY);
        if (nPositionImageX >= oImagePersonnageJeuEnnemiDroite.nPositionX + 48 && nPositionImageY < 342) {
            nPositionImageX = oImagePersonnageJeuEnnemiDroite.nPositionX + 32;
            nPositionImageY += 18;
        } else if (nPositionImageX > oImagePersonnageJeuEnnemiDroite.nPositionX + 46 && nPositionImageY > 342) {
            nPositionImageY = 125;
            break;
        }
    }

    for (nPositionImageX = oImagePersonnageJeuEnnemiDroite.nPositionX - 32;
        nPositionImageX < oImagePersonnageJeuEnnemiDroite.nPositionX + 16;
        nPositionImageX += 16
    ) {
        oContexte.drawImage(oImageMurJeu.Image, nPositionImageX, nPositionImageY);
        if (nPositionImageX >= oImagePersonnageJeuEnnemiDroite.nPositionX - 32 && nPositionImageY < 178) {
            nPositionImageX = oImagePersonnageJeuEnnemiDroite.nPositionX - 48;
            nPositionImageY += 18;
        } else if (nPositionImageX >= oImagePersonnageJeuEnnemiDroite.nPositionX - 32 && nPositionImageY > 178) {
            nPositionImageY = 125;
            break;
        }
    }

    // Dessin des boîtes

    for (let i = 0; i < aHitBoxHeroBoite.length; i++) {
        let element = aHitBoxHeroBoite[i]; 
        element.image.src = element.src;
        oContexte.drawImage(element.image,
            element.nPositionX, element.nPositionY,
            element.nLargeurFrame, element.nHauteurFrame
        );
    }

    nPositionImageY = -1;
}

// Fonction permetant de déssiner le terrain du jeu

function dessinerTerrain() {
    //Dessin du plancher
    for (nPositionImageX = -1; nPositionImageX < 920; nPositionImageX += 18) {
        oContexte.drawImage(oImagePlancherjeu.Image, nPositionImageX, nPositionImageY);
        if (nPositionImageX >= 900 && nPositionImageY < 600) {
            nPositionImageX = -18;
            nPositionImageY += 18;
        } else if (nPositionImageX > 900 && nPositionImageY > 600) {
            nPositionImageY = -1;
            break;
        }
    }

    //Dessin du mur

    for (nPositionImageX = -1; nPositionImageX < 270; nPositionImageX += 18) {
        oContexte.drawImage(oImageMurJeu.Image, nPositionImageX, nPositionImageY);
        if (nPositionImageX >= 250 && nPositionImageY < 600) {
            nPositionImageX = -18;
            nPositionImageY += 18;
        } else if (nPositionImageX > 250 && nPositionImageY > 600) {
            nPositionImageY = -1;
            break;
        }
    }

    for (nPositionImageX = 596; nPositionImageX < 930; nPositionImageX += 18) {
        oContexte.drawImage(oImageMurJeu.Image, nPositionImageX, nPositionImageY);
        if (nPositionImageX >= 918 && nPositionImageY < 600) {
            nPositionImageX = 578;
            nPositionImageY += 18;
        } else if (nPositionImageX > 900 && nPositionImageY > 600) {
            nPositionImageY = 342;
            break;
        }
    }

    //zone du joueur

    for (nPositionImageX = 470; nPositionImageX < 590; nPositionImageX += 18) {
        oContexte.drawImage(oImageMurJeu.Image, nPositionImageX, nPositionImageY);
        if (bCollisionHeroMur == true) {
            oImagePersonnageJeuHero.nPositionX = nRetourPosX;
            oImagePersonnageJeuHero.nPositionY = nRetourPosY;
        }
        if (nPositionImageX >= 568 && nPositionImageY < 600) {
            nPositionImageX = 452;
            nPositionImageY += 16;
        } else if (nPositionImageX > 568 && nPositionImageY > 600) {
            nPositionImageY = 342;
            break;
        }
    }

    for (nPositionImageX = 270; nPositionImageX < 420; nPositionImageX += 18) {
        oContexte.drawImage(oImageMurJeu.Image, nPositionImageX, nPositionImageY);
        if (nPositionImageX >= 390 && nPositionImageY < 600) {
            nPositionImageX = 252;
            nPositionImageY += 18;
        } else if (nPositionImageX > 390 && nPositionImageY > 600) {
            nPositionImageY = 125;
            break;
        }
    }

    dessinerTerrainennemi();


    //Dessin du vide

    for (nPositionImageX = 0; nPositionImageX < 960; nPositionImageX += 18) {
        oContexte.drawImage(oImageVideJeu.Image, nPositionImageX, nPositionImageY);
        if (nPositionImageX >= 900 && nPositionImageY < 103) {
            nPositionImageX = -18;
            nPositionImageY += 18;
        } else if (nPositionImageX > 900 && nPositionImageY > 103) {
            nPositionImageY = 0;
            break;
        }
    }
}

// Fonction permetant de détecter une attaque

function DetecterAttaque(evenement) {
    let oToucheJeu = evenement.key;

    if (oToucheJeu == " " || oToucheJeu == "Enter") {
        sDerniereTouche = "Frappe";
        oImagePersonnageJeuHero.nFrameActuelle = 0;
        bAttaqueActivee = true;
        oImagePersonnageJeuHero.Image.src = oImagePersonnageJeuHeroHautAttaque.src;
        oImagePersonnageJeuHero.nLargeurFrame = oImagePersonnageJeuHeroHautAttaque.nLargeurFrame;
        oImagePersonnageJeuHero.nHauteurFrame = oImagePersonnageJeuHeroHautAttaque.nHauteurFrame;
        oImagePersonnageJeuHero.nPositionX -= 15; 
        oImagePersonnageJeuHero.nPositionY -= 7;
        
        for (let i = 0; i < aHitBoxHeroBoite.length; i++) {
            let element = aHitBoxHeroBoite[i];
            let collision = detecterCollision(element, oImagePersonnageJeuHero);
            
            if (collision == true && (oToucheJeu == " " || oToucheJeu == "Enter")) {    
                bCollisionHeroBoite = true;
                aBoiteDetruite.push(aHitBoxHeroBoite[i]);
                aHitBoxHeroBoite.splice(i, 1);
                break;
            }
        }

        for (let i = 0; i < aHitBoxHeroEnnemi.length; i++) {
            let element = aHitBoxHeroEnnemi[i];
            let collision = detecterCollision(element, oImagePersonnageJeuHero);

            if (collision == true && i == 0 && nQuestionActuelle == 2) {
                oImagePersonnageJeuHero.Image.src = oImagePersonnageJeuHeroHaut.src;  
                oImagePersonnageJeuHero.nLargeurFrame = oImagePersonnageJeuHeroHaut.nLargeurFrame;
                oImagePersonnageJeuHero.nHauteurFrame = oImagePersonnageJeuHeroHaut.nHauteurFrame;
                oImagePersonnageJeuHero.nPositionX = 400;
                oImagePersonnageJeuHero.nPositionY = 550; 
                nQuestionActuelle = 3;
                aHitBoxHeroBoite.length = 0;
                aBoiteDetruite.length = 0;
                oSonJeuSuscces.play();
                genererHitboxesBoites();              
                break;
            } else if (collision == true && i == 1 && nQuestionActuelle == 1) {
                oImagePersonnageJeuHero.Image.src = oImagePersonnageJeuHeroHaut.src;  
                oImagePersonnageJeuHero.nLargeurFrame = oImagePersonnageJeuHeroHaut.nLargeurFrame;
                oImagePersonnageJeuHero.nHauteurFrame = oImagePersonnageJeuHeroHaut.nHauteurFrame;
                oImagePersonnageJeuHero.nPositionX = 400;
                oImagePersonnageJeuHero.nPositionY = 550; 
                nQuestionActuelle = 2;
                aHitBoxHeroBoite.length = 0;
                aBoiteDetruite.length = 0;
                oSonJeuSuscces.play();
                genererHitboxesBoites();              
                break;
            } else if (collision == true && i == 2 && nQuestionActuelle == 3) {
                oImagePersonnageJeuHero.Image.src = oImagePersonnageJeuHeroHaut.src;  
                oImagePersonnageJeuHero.nLargeurFrame = oImagePersonnageJeuHeroHaut.nLargeurFrame;
                oImagePersonnageJeuHero.nHauteurFrame = oImagePersonnageJeuHeroHaut.nHauteurFrame;
                oImagePersonnageJeuHero.nPositionX = 400;
                oImagePersonnageJeuHero.nPositionY = 550; 
                nQuestionActuelle = 4;
                aHitBoxHeroBoite.length = 0;
                aBoiteDetruite.length = 0;
                oSonJeuSuscces.play();
                genererHitboxesBoites();
                break;
            } else if (collision == true) {
                oImagePersonnageJeuHero.Image.src = oImagePersonnageJeuHeroHaut.src;  
                oImagePersonnageJeuHero.nLargeurFrame = oImagePersonnageJeuHeroHaut.nLargeurFrame;
                oImagePersonnageJeuHero.nHauteurFrame = oImagePersonnageJeuHeroHaut.nHauteurFrame;
                oImagePersonnageJeuHero.nPositionX = 400;
                oImagePersonnageJeuHero.nPositionY = 550; 
                aHitBoxHeroBoite.length = 0;
                aBoiteDetruite.length = 0;
                oSonJeuDefaite.play();
                genererHitboxesBoites();
                
            }
        }

        for (let i = 0; i < aHitBoxHeroMur.length; i++) {
            let element = aHitBoxHeroMur[i];
            let collision = detecterCollision(element, oImagePersonnageJeuHero);
            
            if (collision == true) {
                oImagePersonnageJeuHero.nPositionX = 420;
                oImagePersonnageJeuHero.nPositionY = 550;
                oSonJeuDefaite.play();
                break;
            }
        }
    } else if (aBoiteDetruite.length >= 1 && (oToucheJeu == "Shift" || oToucheJeu == "Backspace")) {
        sDerniereTouche = "Replacer";
        oImagePersonnageJeuHero.nFrameActuelle = 0;
        bAttaqueActivee = true;
        oImagePersonnageJeuHero.Image.src = oImagePersonnageJeuHeroHautAttaqueInverse.src;
        oImagePersonnageJeuHero.nLargeurFrame = oImagePersonnageJeuHeroHautAttaqueInverse.nLargeurFrame;
        oImagePersonnageJeuHero.nHauteurFrame = oImagePersonnageJeuHeroHautAttaqueInverse.nHauteurFrame;
        oImagePersonnageJeuHero.nPositionX -= 15; 
        aHitBoxHeroBoite.push(aBoiteDetruite[0]);
        aBoiteDetruite.splice(0, 1);
    } else {
        sDerniereTouche = "Mouvement";
        oImagePersonnageJeuHero.nLargeurFrame = oImagePersonnageJeuHeroHaut.nLargeurFrame;
        oImagePersonnageJeuHero.nHauteurFrame = oImagePersonnageJeuHeroHaut.nHauteurFrame;
        DetecterMouvement(evenement);
    }

    

    if (sEtatJeu != "jeu") { 
        return; 
    }
}

// Fonction permetant de détecter un mouvement du joueur

function DetecterMouvement(evenement) {
    let oToucheJeu = evenement.key;

    if (oImagePersonnageJeuHero.nPositionX > nLargeur - oImagePersonnageJeuHero.nLargeurFrame) {
            oImagePersonnageJeuHero.nPositionX = 430;
            oImagePersonnageJeuHero.nPositionY = 550;
    }

    if (oImagePersonnageJeuHero.nPositionX < -18) {
            oImagePersonnageJeuHero.nPositionX = 430;
            oImagePersonnageJeuHero.nPositionY = 550;
    }

    if (oImagePersonnageJeuHero.nPositionY > nHauteur - oImagePersonnageJeuHero.nHauteurFrame) {
            oImagePersonnageJeuHero.nPositionX = 430;
            oImagePersonnageJeuHero.nPositionY = 550;
    }

    if (oImagePersonnageJeuHero.nPositionY < -18) {
            oImagePersonnageJeuHero.nPositionX = 430;
            oImagePersonnageJeuHero.nPositionY = 550;
    }

    if (oToucheJeu == "ArrowUp" || oToucheJeu == "w") {
        oImagePersonnageJeuHero.Image.src = oImagePersonnageJeuHeroHaut.src;  
        oImagePersonnageJeuHero.nPositionY -= 7;

        for (let i = 0; i < aHitBoxHeroMur.length; i++) {
            let element = aHitBoxHeroMur[i];
            let collision = detecterCollision(element, oImagePersonnageJeuHero);
            
            if (collision == true) {
                oImagePersonnageJeuHero.nPositionY += 7;
                break;
            }
        }

        for (let i = 0; i < aHitBoxHeroBoite.length; i++) {
            let element = aHitBoxHeroBoite[i];
            let collision = detecterCollision(element, oImagePersonnageJeuHero);
            
            if (collision == true) {
                oImagePersonnageJeuHero.nPositionY += 7;
                break;
            }
        }
    } else if (oToucheJeu == "ArrowDown" || oToucheJeu == "s") {
        oImagePersonnageJeuHero.Image.src = oImagePersonnageJeuHeroBas.src;  
        oImagePersonnageJeuHero.nPositionY += 7;
        for (let i = 0; i < aHitBoxHeroMur.length; i++) {
            let element = aHitBoxHeroMur[i];
            let collision = detecterCollision(element, oImagePersonnageJeuHero)

            if (collision == true) {
                oImagePersonnageJeuHero.nPositionY -= 7;
                break;
            }
        }

        for (let i = 0; i < aHitBoxHeroBoite.length; i++) {
            let element = aHitBoxHeroBoite[i];
            let collision = detecterCollision(element, oImagePersonnageJeuHero);

            if (collision == true) {
                oImagePersonnageJeuHero.nPositionY -= 7;
                break;
            }
        }
    } else if (oToucheJeu == "ArrowLeft" || oToucheJeu == "a") {
        oImagePersonnageJeuHero.Image.src = oImagePersonnageJeuHeroGauche.src;  
        oImagePersonnageJeuHero.nPositionX -= 7;
        for (let i = 0; i < aHitBoxHeroMur.length; i++) {
            let element = aHitBoxHeroMur[i];
            let collision = detecterCollision(element, oImagePersonnageJeuHero)

            if (collision == true) {
                oImagePersonnageJeuHero.nPositionX += 7;
                break;
            }
        }

        for (let i = 0; i < aHitBoxHeroBoite.length; i++) {
            let element = aHitBoxHeroBoite[i];
            let collision = detecterCollision(element, oImagePersonnageJeuHero);

            if (collision == true) {
                oImagePersonnageJeuHero.nPositionX += 7;
                break;
            }
        }
    } else if (oToucheJeu == "ArrowRight" || oToucheJeu == "d") {
        oImagePersonnageJeuHero.Image.src = oImagePersonnageJeuHeroDroite.src;  
        oImagePersonnageJeuHero.nPositionX += 7;
        for (let i = 0; i < aHitBoxHeroMur.length; i++) {
            let element = aHitBoxHeroMur[i];
            let collision = detecterCollision(element, oImagePersonnageJeuHero)
            if (collision == true) {
                oImagePersonnageJeuHero.nPositionX -= 7;
                break;
            }
        }

        for (let i = 0; i < aHitBoxHeroBoite.length; i++) {
            let element = aHitBoxHeroBoite[i];
            let collision = detecterCollision(element, oImagePersonnageJeuHero);

            if (collision == true) {
                oImagePersonnageJeuHero.nPositionX -= 7;
                break;
            }
        }
    } 
}

// Fonction permetant le dessin du hero dans l'écran de jeu

function dessinerPersonnageJeuHero() {
        sourceX = oImagePersonnageJeuHero.nFrameActuelle * oImagePersonnageJeuHero.nLargeurFrame;
        oContexte.drawImage(
            oImagePersonnageJeuHero.Image,
            sourceX,
            0,
            oImagePersonnageJeuHero.nLargeurFrame,
            oImagePersonnageJeuHero.nHauteurFrame,
            oImagePersonnageJeuHero.nPositionX,
            oImagePersonnageJeuHero.nPositionY,
            oImagePersonnageJeuHero.nLargeurFrame * 2.5,
            oImagePersonnageJeuHero.nHauteurFrame * 2.5
        );
}

// Fonction permetant les dessins des ennemis dans le jeu

function dessinerPersonnageJeuEnnemi() {
    let sourceX = oImagePersonnageJeuEnnemiGauche.nFrameActuelle * oImagePersonnageJeuEnnemiGauche.nLargeurFrame;
    let sourceY = 0;

    oContexte.drawImage(
        oImagePersonnageJeuEnnemiGauche.Image,
        sourceX,
        sourceY,
        oImagePersonnageJeuEnnemiGauche.nLargeurFrame,
        oImagePersonnageJeuEnnemiGauche.nHauteurFrame,
        oImagePersonnageJeuEnnemiGauche.nPositionX,
        oImagePersonnageJeuEnnemiGauche.nPositionY,
        oImagePersonnageJeuEnnemiGauche.nLargeurFrame * 2.5,
        oImagePersonnageJeuEnnemiGauche.nHauteurFrame * 2.5
    );

    sourceX = oImagePersonnageJeuEnnemiMillieu.nFrameActuelle * oImagePersonnageJeuEnnemiMillieu.nLargeurFrame;
    sourceY = 0;

    oContexte.drawImage(
        oImagePersonnageJeuEnnemiMillieu.Image,
        sourceX,
        sourceY,
        oImagePersonnageJeuEnnemiMillieu.nLargeurFrame,
        oImagePersonnageJeuEnnemiMillieu.nHauteurFrame,
        oImagePersonnageJeuEnnemiMillieu.nPositionX,
        oImagePersonnageJeuEnnemiMillieu.nPositionY,
        oImagePersonnageJeuEnnemiMillieu.nLargeurFrame * 2.5,
        oImagePersonnageJeuEnnemiMillieu.nHauteurFrame * 2.5
    );

    sourceX = oImagePersonnageJeuEnnemiDroite.nFrameActuelle * oImagePersonnageJeuEnnemiDroite.nLargeurFrame;
    sourceY = 0;

    oContexte.drawImage(
        oImagePersonnageJeuEnnemiDroite.Image,
        sourceX,
        sourceY,
        oImagePersonnageJeuEnnemiDroite.nLargeurFrame,
        oImagePersonnageJeuEnnemiDroite.nHauteurFrame,
        oImagePersonnageJeuEnnemiDroite.nPositionX,
        oImagePersonnageJeuEnnemiDroite.nPositionY,
        oImagePersonnageJeuEnnemiDroite.nLargeurFrame * 2.5,
        oImagePersonnageJeuEnnemiDroite.nHauteurFrame * 2.5
    );


}

// Fonction Intéractives

function detecterCollision(objet1, objet2) {
    if (objet1.nPositionX < objet2.nPositionX + objet2.nLargeurFrame && 
        objet1.nPositionX + objet1.nLargeurFrame > objet2.nPositionX && 
        objet1.nPositionY < objet2.nPositionY + objet2.nHauteurFrame && 
        objet1.nPositionY + objet1.nHauteurFrame > objet2.nPositionY) {
        return true;
    } else {
        return false;
    }
}

window.addEventListener("keydown", DetecterAttaque);