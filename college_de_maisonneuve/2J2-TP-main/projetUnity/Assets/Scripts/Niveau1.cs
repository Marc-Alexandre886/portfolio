using System;
using System.Linq.Expressions;
using TMPro;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.Rendering;
using UnityEngine.SceneManagement;
using System.Collections.Generic;

public class Niveau1 : MonoBehaviour
{
    /* === Variables === */

    // Variables pour l'animator

    public Animator animatorGestion;
    public Animator animatorElements;
    public Animator animatorAide;

    // Variables pour le Canvas du niveau de la scène actuel

    public GameObject textScore;
    public TMP_Text contenuScore;
    public int scoreAfficher;

    // Variables des nom des scènes

    public string niveau2 = "Niveau2ClicGlisser";

    // Variable pour les visuels - aide visuel

    GameObject aideVisuelNv1;

    // Variable pour les visuels - objects intéractifs de la scène du premier niveau

    GameObject visuel0;
    GameObject visuel1;
    GameObject visuel2;
    GameObject visuel3;
    GameObject visuel4;

    // Variable pour les visuels - Sprite renderer des objects iné ractifs de la scène

    SpriteRenderer visuel0Image;
    SpriteRenderer visuel1Image;
    SpriteRenderer visuel2Image;
    SpriteRenderer visuel3Image;
    SpriteRenderer visuel4Image;

    // Liste pour aciver/désactiver les colliders des visuels

    public List<GameObject> collisions;

    // Variables pour la gestion sonore - audio

    public AudioSource clipSfxMenu;
    public AudioSource clipOstJeu;
    public AudioSource clipSfxJouet;
    public AudioSource clipNv1;
    public AudioSource clipNv1Exp;
    public AudioSource clipBravo;

    // Variables pour la gestion sonore - GameObject

    private GameObject sonSfxMenu;
    private GameObject sonOstJeu;
    private GameObject sonSfxJouet;
    private GameObject sonNv1;
    private GameObject sonNv1Exp;
    private GameObject sonBravo;

    // Variables pour la mécanique de clic

    private bool estClique = false;
    public int anim_voitures = 5;
    public bool clic;
    private int id;

    // Variables générales

    private float tempsEcoulee = 0;

    /* === Fonctions native de Unity === */

    void Start()
    {
        // Rechercher les gameObjects - Audio

        sonSfxMenu = GameObject.Find("GestionnaireSonore/SonSfxMenu");
        sonOstJeu = GameObject.Find("GestionnaireSonore/SonOstJeu");
        sonSfxJouet = GameObject.Find("GestionnaireSonore/SonSfxJouet");
        sonNv1 = GameObject.Find("GestionnaireSonore/SonNv1");
        sonNv1Exp = GameObject.Find("GestionnaireSonore/SonNv1Exp");
        sonBravo = GameObject.Find("GestionnaireSonore/SonBravo");

        // Assignation du gameObject aux componants - Audio

        clipSfxMenu = sonSfxMenu.GetComponent<AudioSource>();
        clipOstJeu = sonOstJeu.GetComponent<AudioSource>();
        clipSfxJouet = sonSfxJouet.GetComponent<AudioSource>();
        clipNv1 = sonNv1.GetComponent<AudioSource>();
        clipNv1Exp = sonNv1Exp.GetComponent<AudioSource>();
        clipBravo = sonBravo.GetComponent<AudioSource>();

        // Rechercher les gameObjects - Visuel du premier niveau

        aideVisuelNv1 = GameObject.FindWithTag("ExpNv1");
        visuel0 = GameObject.FindWithTag("N1V0");
        visuel1 = GameObject.FindWithTag("N1V1");
        visuel2 = GameObject.FindWithTag("N1V2");
        visuel3 = GameObject.FindWithTag("N1V3");
        visuel4 = GameObject.FindWithTag("N1V4");

        // Assignation du gameObject aux componants - Premier niveau


        visuel0Image = visuel0.GetComponentInChildren<SpriteRenderer>();
        visuel1Image = visuel1.GetComponentInChildren<SpriteRenderer>();
        visuel2Image = visuel2.GetComponentInChildren<SpriteRenderer>();
        visuel3Image = visuel3.GetComponentInChildren<SpriteRenderer>();
        visuel4Image = visuel4.GetComponentInChildren<SpriteRenderer>();

        // Jouer les audio de base - Premier niveau

        clipNv1.Play();
        clipOstJeu.Play();
    }


    void Update()
    {
        // Remise du score à jour

        contenuScore.text = $"Jouets restants : {scoreAfficher}";

        // Vérification du temps  coulée pour s'assurer que le joueur termine le niveau actuel

        tempsEcoulee += Time.deltaTime;

        if (tempsEcoulee >= 10 && tempsEcoulee <= 11)
        {
            clipNv1.Play();
        }
        else if (tempsEcoulee >= 30 && tempsEcoulee <= 31)
        {
            tempsEcoulee = 0;
            clic = true;
            clipNv1.Play();
            animatorAide.SetBool("clic1", true);
        }

        PriorisationAudio();
        clic = false;
    }

    /* === Fonctions générales === */

    // Fonction gérant la logique du score

    public void AugmenterScore(bool actif)
    {
        if (actif)
        {
            scoreAfficher--;
            clipSfxJouet.Play();
            clipBravo.Play();
            animatorAide.SetBool("clic1", false);
            Invoke("DestroyVoitures", 0.5f);

            if (scoreAfficher == 0)
            {
                Invoke("TransitionIn", 2f);
            }

            actif = false;
        }
    }

    // Fonction permettant de prioriser l'audio joué et arête les audio non-essentiel

    public void PriorisationAudio()
    {
        if (clipBravo.isPlaying)
        {
            clipNv1.Stop();
            clipNv1Exp.Stop();
        }
        else if (clipNv1.isPlaying)
        {
            clipBravo.Stop();
            clipNv1Exp.Stop();
        }
        else if (clipNv1Exp.isPlaying)
        {
            clipBravo.Stop();
            clipNv1.Stop();
        }
    }

    // Fonction permettant de illlustrer visuelement ce que le joeur doit réaliser

    public void Aide()
    {
        if (aideVisuelNv1.gameObject.tag == "ExpNv1")
        {
            clipNv1Exp.Play();
        }
    }

    // Fonctions permettant d'indiquer que le jouet est sur la souris

    public void HoverJouet0()
    {
        visuel0Image.color = Color.red;
    }

    public void HoverJouet1()
    {
        visuel1Image.color = Color.red;
    }

    public void HoverJouet2()
    {
        visuel2Image.color = Color.red;
    }

    public void HoverJouet3()
    {
        visuel3Image.color = Color.red;
    }

    public void HoverJouet4()
    {
        visuel4Image.color = Color.red;
    }

    // Fonctions permettant d'indiquer que le jouet n'est pas sur la souris

    public void UnleaseHover0()
    {
        visuel0Image.color = Color.white;
    }

    public void UnleaseHover1()
    {
        visuel1Image.color = Color.white;
    }

    public void UnleaseHover2()
    {
        visuel2Image.color = Color.white;
    }

    public void UnleaseHover3()
    {
        visuel3Image.color = Color.white;
    }

    public void UnleaseHover4()
    {
        visuel4Image.color = Color.white;
    }

    /* === Fonctions de la mécanique de clic === */

    // Fonctions permettant de déplacer la voiture dans la boîte à jouet

    public void OnClic0()
    {
        if (!estClique)
        {
            estClique = true;
            anim_voitures = 0;

            if (visuel0.gameObject.tag == "N1V0")
            {
                foreach (var collisionVoiture in collisions)
                {
                    collisionVoiture.GetComponent<EventTrigger>().enabled = false;
                }

                animatorElements.SetInteger("anim_voitures", 0);
                tempsEcoulee = 0;
                id = 0;
                AugmenterScore(true);
            }

            estClique = false;
        }
    }

    public void OnClic1()
    {
        if (!estClique)
        {
            estClique = true;
            anim_voitures = 1;

            if (visuel1.gameObject.tag == "N1V1")
            {
                foreach (var collisionVoiture in collisions)
                {
                    collisionVoiture.GetComponent<EventTrigger>().enabled = false;
                }

                animatorElements.SetInteger("anim_voitures", 1);
                tempsEcoulee = 0;
                id = 1;
                AugmenterScore(true);
            }

            estClique = false;
        }
    }

    public void OnClic2()
    {
        if (!estClique)
        {
            estClique = true;
            anim_voitures = 2;

            if (visuel2.gameObject.tag == "N1V2")
            {
                foreach (var collisionVoiture in collisions)
                {
                    collisionVoiture.GetComponent<EventTrigger>().enabled = false;
                }

                animatorElements.SetInteger("anim_voitures", 2);
                tempsEcoulee = 0;
                id = 2;
                AugmenterScore(true);
            }

            estClique = false;
        }
    }

    public void OnClic3()
    {
        if (!estClique)
        {
            estClique = true;
            anim_voitures = 3;

            if (visuel3.gameObject.tag == "N1V3")
            {
                foreach (var collisionVoiture in collisions)
                {
                    collisionVoiture.GetComponent<EventTrigger>().enabled = false;
                }

                animatorElements.SetInteger("anim_voitures", 3);
                tempsEcoulee = 0;
                id = 3;
                AugmenterScore(true);
            }

            estClique = false;
        }
    }

    public void OnClic4()
    {
        if (!estClique)
        {
            estClique = true;
            anim_voitures = 4;

            if (visuel4.gameObject.tag == "N1V4")
            {
                foreach (var collisionVoiture in collisions)
                {
                    collisionVoiture.GetComponent<EventTrigger>().enabled = false;
                }

                animatorElements.SetInteger("anim_voitures", 4);
                tempsEcoulee = 0;
                id = 4;
                AugmenterScore(true);
            }

            estClique = false;
        }
    }

    // Fonction permettant de détruire la voiture qui est dans la boîte à jouet

    public void DestroyVoitures()
    {
        switch (id)
        {
            case 0:
                collisions.Remove(visuel0);
                Destroy(visuel0);
                break;
            case 1:
                collisions.Remove(visuel1);
                Destroy(visuel1);
                break;
            case 2:
                collisions.Remove(visuel2);
                Destroy(visuel2);
                break;
            case 3:
                collisions.Remove(visuel3);
                Destroy(visuel3);
                break;
            case 4:
                collisions.Remove(visuel4);
                Destroy(visuel4);
                break;
        }

        foreach (var collisionVoiture in collisions)
        {
            collisionVoiture.GetComponent<EventTrigger>().enabled = true;
        }
    }

    /* === Fonction de transitionement des scènes === */

    // Fonction changeant de scène
    private void changerScene()
    {
        clipOstJeu.Stop();
        SceneManager.LoadScene(niveau2);
        TransitionOut();
    }

    // Fonctions permettant le fade in et fade out dans les  écrans de jeu

    public void TransitionIn()
    {
        animatorGestion.SetBool("inActif", true);
        clipSfxMenu.Play();
        Invoke("changerScene", 1f);
    }

    public void TransitionOut()
    {
        animatorGestion.SetBool("outActif", true);
    }
}

