/* === Variables === */

// Variables contenant un identifiant HTML

const chkMenu = document.getElementById("chk-menu");
const gabaritArcade = document.getElementById("gabarit_arcade");

// Variables contenant une ou des classes HTML

const boutonBurger = document.querySelector(".burger > img");
const menu = document.querySelector(".menu");
const retour = document.querySelector(".retour");
const btnAppel = document.querySelector(".btn-appel");
const recherche = document.querySelector(".recherche-jeu");
const eltRecherche = document.querySelector(".recherche-jeu input[name = 'mot-cle']");
const contenuPrincipal = document.querySelector(".principal");
const logo = document.querySelector(".logo");
const imageMenu = "label > img";
const tuiles = document.querySelectorAll(".tuile");
const aucunElementTrouvee = document.querySelector("#arcade > .aucun_element");
const retourDesactivee = document.querySelector(".retour_haut");
const contenuRetourDesactivee = document.querySelector(".retour_haut > a");
const divListeArcade = document.querySelector(".contenu_arcade");
const piedDePage = document.querySelector(".infos");
const liensMenu = document.querySelectorAll(".menu a");
const liensRetour = document.querySelectorAll(".retour a");

// Variable pour l'état d'ouverture du menu en mobile

let fermerActivee = false;

// Variables de la boucle pour l'arcade dynamique

let indexVedettes = -1;
let jeu;
let articleJeu;
let listeEttiquettes
let liEttiquete;

// Variables pour le filtrage de la recherche

let jeuFiltres;
let etiquetteFiltrer;
let chaineEtiquette;
let chaineGroupe;

// Premier affichage de l'arcade

afficherJeuArcade();

/* === Évènements et boucles sur toute la page html actif === */


// Attend qu'un état de changement soit présent sur le checkBox

chkMenu.addEventListener("change", synchroniserEtatMenu);

// Attend que la page change de largeur

window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && chkMenu.checked) {
        chkMenu.checked = false;
        synchroniserEtatMenu();
    }
});

// Boucle pour fermer le menu si un lien est cliqué dans le menu

for (const lien of liensMenu) {
    lien.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            chkMenu.checked = false;
            synchroniserEtatMenu(); 
        }
    });
}

for (const lien of liensRetour) {
    lien.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            chkMenu.checked = false;
            synchroniserEtatMenu(); 
        }
    });
}

// Boucles pour indiquer sur quelle tuile l'utilisateur est sur l'arcade

for (const jeu of tuiles) {
    jeu.addEventListener("mouseenter", () => {
        jeu.classList.remove("couleur");
        jeu.classList.add("pascouleur");
    });
}

for (const jeu of tuiles) {
    jeu.addEventListener("mouseleave", () => {
        jeu.classList.remove("pascouleur");
        jeu.classList.add("couleur");
    });
}

/* === Fonctions  === */

/**
 * Remettre l'état du bouton à jour du menu
**/
function synchroniserEtatMenu() {
    document.querySelector(imageMenu).src = chkMenu.checked ? 
                                        "ressources/images/bouton_fermer.webp" 
                                        : 
                                        "ressources/images/bouton_burger.webp";

    if (chkMenu.checked) {
        classListManager(true);
    } else if (!chkMenu.checked) {
        classListManager(false);
    }
}

/**
 * Remettre l'état du bouton à jour du menu
 * 
 * @param {boolean} checked : l'état d'activation ou de désactivation du bouton
**/
function classListManager(checked) {
    if (checked) {
        document.body.classList.add("overflow");
        contenuPrincipal.classList.add("pointer");
        logo.classList.add("pointer");

        if (menu) {
            btnAppel.classList.add("pointer");
            menu.classList.remove("fermer");
            menu.classList.add("ouvert");
        } else if (!menu) {
            recherche.classList.add("pointer");
            retour.classList.remove("fermer");
            retour.classList.add("ouvert");
        }
    } else if (!checked) {
        document.body.classList.remove("overflow");
        contenuPrincipal.classList.remove("pointer");
        logo.classList.remove("pointer");

        if (menu) {
           btnAppel.classList.remove("pointer");
           menu.classList.remove("ouvert");
           menu.classList.add("fermer"); 
        } else if (!menu) {
           recherche.classList.remove("pointer");
           retour.classList.remove("ouvert");
           retour.classList.add("fermer"); 
        } 
    }
}

/**
 * Créer l'arcade des fichiers html dynamiquement par javascript
 * 
 * @param {Array} [arcadeBase=jeuArcade] : 
 * assigner l'arcade de base comme étant le tableau du dossier "data"
**/
function afficherJeuArcade(arcadeBase = jeuArcade) {
    // Ne débute pas l'API view-transition sur tout la fenêtre pour éviter qu'il 
    // le redessiner par dessus les z-index.

    contenuPrincipal.startViewTransition(() => {
        divListeArcade.innerHTML = "";

        // Boucle pour prendre les objects du tbleau pour les implémenter dyamiquement

        for (jeu of arcadeBase) {
            indexVedettes++;
            articleJeu = gabaritArcade.cloneNode(true).content.querySelector(".tuile");
            
            articleJeu.querySelector("h2").textContent = jeu.titre;
            articleJeu.querySelector("h3").textContent = jeu.auteur;
            const imageArcade = articleJeu.querySelector("img");
            listeEttiquettes = articleJeu.querySelector("ul");
            
            for (const ettique of jeu.ettiquetes) {
                liEttiquete = document.createElement("li");
                liEttiquete.textContent = ettique;
                listeEttiquettes.append(liEttiquete);
            }

            imageArcade.alt = `Vignette de ${jeu.titre}`;
            imageArcade.src = `ressources/images/arcade/${jeu.src}`;

            imageArcade.addEventListener("error", () => {
                imageArcade.src = `ressources/images/arcade/image_non_disponible.webp`;
            });

            articleJeu.style.viewTransitionName = `jeu${jeu.id}`;
            articleJeu.href = `https://h26-2j2.github.io/${jeu.githubpage}`;
            articleJeu.querySelector(".groupe").textContent = `Groupe:${jeu.groupe}`;
            articleJeu.querySelector("p:last-child").textContent = jeu.description;        

            divListeArcade.append(articleJeu);

            if (indexVedettes == 2 && menu) {
                break;
            }
        }
    });
}

/**
 * Réinitialise la recherche par le champ du texte et le réaffichage complet de l'arcade.
**/
function resetRecherche() {
    eltRecherche.value = "";
    contenuRetourDesactivee.textContent = "Retourner au début de la page de l'arcade";
    aucunElementTrouvee.classList.add("rien");
    piedDePage.classList.remove("rien");
    retourDesactivee.classList.remove("rien");

    afficherJeuArcade();
}

/* === Recherche dans le fichier html « arcade.html » === */

// Recherche d'une information dans l'arcade de jeu

if (!menu) {
    eltRecherche.addEventListener("input", (evt) => {
        const motCle = eltRecherche.value.toLowerCase().trim();

        // Si l'utilisateur n'a saisi aucune touche

        if (motCle == "") {
            piedDePage.classList.remove("rien");
            retourDesactivee.classList.remove("rien");
            aucunElementTrouvee.classList.add("rien");
            contenuRetourDesactivee.textContent = "Retourner au début de la page de l'arcade";

            // pour désactiver un évènement, il faut une fonction de référence au aEL.
            // lien de la référence MDN : 
            // « https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener »

            retourDesactivee.removeEventListener("click", resetRecherche);
            afficherJeuArcade();
            return;
        }

        // Filtre l'arcade des jeux

        jeuFiltres = jeuArcade.filter(
            jeu => {
                chaineEtiquette = jeu.ettiquetes.join(" ");
                chaineGroupe = String(jeu.groupe);
                
                return jeu.auteur.toLowerCase().trim().includes(motCle)
                || jeu.titre.toLowerCase().trim().includes(motCle)
                || chaineEtiquette.toLowerCase().trim().includes(motCle)
                || chaineGroupe.toLowerCase().trim().includes(motCle)
                || jeu.description.toLowerCase().trim().includes(motCle)
        });

        // Vérifie le nombre d'éléments dans le talbeau filtré

        if (jeuFiltres.length == jeuArcade.length) {
            jeuFiltres.length = 0;
        } else if (jeuFiltres.length == 0) {
            piedDePage.classList.add("rien");
            retourDesactivee.classList.add("rien");
            aucunElementTrouvee.classList.remove("rien");
            aucunElementTrouvee.addEventListener("click", resetRecherche);
        } else if (jeuFiltres.length >= 1) {
            piedDePage.classList.remove("rien");
            retourDesactivee.classList.remove("rien");
            aucunElementTrouvee.classList.add("rien");
            contenuRetourDesactivee.textContent = "Réinitialiser la recherche";
            retourDesactivee.addEventListener("click", resetRecherche);
        }

        // Affiche la liste de jeu filtrés selon le tableau filtrés

        afficherJeuArcade(jeuFiltres);
    });
}