using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.CompilerServices;
using TMPro;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.Rendering;
using UnityEngine.SceneManagement;

public class Niveau3 : MonoBehaviour
{
    /* === Variables === */

    // Variables pour l'animator

    public Animator animatorGestion;
    public Animator animatorAide;
    public Animator animatorElements;

    // Variables pour le Canvas du niveau de la scène actuel

    public GameObject parentTrain;
    public GameObject textScore;
    public TMP_Text contenuScore;
    public int scoreAfficher;

    // Variables des nom des scènes

    public string debutJeu = "Debut";

    // Variable pour les visuels - aide visuel

    GameObject aideVisuelNv3;

    // Variables pour la gestion sonore - audio

    public AudioSource clipSfxMenu;
    public AudioSource clipOstJeu;
    public AudioSource clipSfxJouet;
    public AudioSource clipNv3;
    public AudioSource clipNv3Exp;
    public AudioSource clipBravo;
    public AudioSource clipFin;

    // Variables pour la gestion sonore - GameObject

    private GameObject sonSfxMenu;
    private GameObject sonOstJeu;
    private GameObject sonSfxJouet;
    private GameObject sonNv3;
    private GameObject sonNv3Exp;
    private GameObject sonBravo;
    private GameObject sonFin;

    // Variables pour indiquer si le drag and drop est possible sur les jouets sélectionnable

    public LayerMask masqueTrain;
    public bool dragTrainActif = false;

    // Variables pour la sélection avec la souris

    private float xA;
    private float yA;
    private float xB;
    private float yB;
    private float xC;
    private float yC;
    private float xD;
    private float yD;
    private LineRenderer lineRenderer;

    // Liste et tableaux pour la mécanique de la sélection

    public Vector2[] selection;
    public Vector2[] coordoness = new Vector2[4];
    public Collider2D[] trainSelections;
    public List<Trains> trainCourant;
    public List<Collider2D> trainColorees;

    // Variables générales

    public float tempsEcoulee = 0;

    /* === Fonctions native de Unity === */

    void Start()
    {

        // Rechercher les gameObjects - Audio

        sonSfxMenu = GameObject.Find("GestionnaireSonore/SonSfxMenu");
        sonOstJeu = GameObject.Find("GestionnaireSonore/SonOstJeu");
        sonSfxJouet = GameObject.Find("GestionnaireSonore/SonSfxJouet");
        sonNv3 = GameObject.Find("GestionnaireSonore/SonNv3");
        sonNv3Exp = GameObject.Find("GestionnaireSonore/SonNv3Exp");
        sonBravo = GameObject.Find("GestionnaireSonore/SonBravo");
        sonFin = GameObject.Find("GestionnaireSonore/SonFin");

        // Assignation du gameObject aux componants - Audio

        clipSfxMenu = sonSfxMenu.GetComponent<AudioSource>();
        clipOstJeu = sonOstJeu.GetComponent<AudioSource>();
        clipSfxJouet = sonSfxJouet.GetComponent<AudioSource>();
        clipNv3 = sonNv3.GetComponent<AudioSource>();
        clipNv3Exp = sonNv3Exp.GetComponent<AudioSource>();
        clipBravo = sonBravo.GetComponent<AudioSource>();
        clipFin = sonFin.GetComponent<AudioSource>();

        // Rechercher les gameObjects - Visuel du troisième niveau

        aideVisuelNv3 = GameObject.FindWithTag("ExpNv3");
        textScore = GameObject.Find("Canvas/Score");
        contenuScore = textScore.GetComponent<TMP_Text>();
        lineRenderer = gameObject.GetComponent<LineRenderer>();

        // Jouer les audio de base - Troisième niveau

        clipNv3.Play();
        clipOstJeu.Play();
        clipOstJeu.Play();

        // Activation de l'animation d'intro du niveau 3

        parentTrain.GetComponent<Animator>().enabled = true;
    }


    void Update()
    {
        // Remise du score à jour

        contenuScore.text = $"Jouets restants : {scoreAfficher}";

        // Vérification du temps  coulée pour s'assurer que le joueur termine le niveau actuel

        tempsEcoulee += Time.deltaTime;

        if (tempsEcoulee >= 20 && tempsEcoulee <= 21)
        {
            clipNv3.Play();
        }
        else if (tempsEcoulee >= 40 && tempsEcoulee <= 41)
        {
            tempsEcoulee = 0;
            clipNv3.Play();
            animatorAide.SetBool("clic3", true);
        }

        PriorisationAudio();
    }

    /* === Fonctions générales === */

    // Fonction gérant la logique du score

    public void AugmenterScore(bool actif)
    {
        if (actif)
        {
            scoreAfficher--;
            clipSfxJouet.Play();
            animatorAide.SetBool("clic3", false);

            if (scoreAfficher == 0)
            {
                clipFin.Play();
                Invoke("TransitionIn", 4.5f);
            }
            else
            {
                clipBravo.Play();
            }

            actif = false;
        }
    }

    // Fonction permettant de prioriser l'audio jou  et arête les audio non-essentiel

    public void PriorisationAudio()
    {
        if (clipBravo.isPlaying)
        {
            clipNv3.Stop();
            clipNv3Exp.Stop();
        }
        else if (clipNv3.isPlaying)
        {
            clipBravo.Stop();
            clipNv3Exp.Stop();
        }
        else if (clipNv3Exp.isPlaying)
        {
            clipBravo.Stop();
            clipNv3.Stop();
        }
        else if (clipFin.isPlaying)
        {
            clipBravo.Stop();
            clipNv3.Stop();
            clipNv3Exp.Stop();
        }
    }

    // Fonction permettant de illlustrer visuelement ce que le joeur doit réaliser

    public void Aide()
    {
        if (aideVisuelNv3.gameObject.tag == "ExpNv3")
        {
            clipNv3Exp.Play();
        }
    }

    /* === Fonctions de la mécanique de la sélection === */

    // Fonction lors du début de la sélection

    public void OnPointerEnter(BaseEventData eventData)
    {
        parentTrain.GetComponent<Animator>().enabled = false;   // Désactive la priorisation de l'opacité sur l'animation.
        lineRenderer.positionCount = 8;
        dragTrainActif = false;
        PointerEventData pointerEventData = eventData as PointerEventData;
        Vector2 positionSourisActuelle = Camera.main.ScreenToWorldPoint(pointerEventData.position);

        xA = positionSourisActuelle.x;
        yA = positionSourisActuelle.y;

        foreach (var trainPasSelectionner in trainCourant)
        {
            trainPasSelectionner.pris = false;
            trainPasSelectionner.GetComponent<SpriteRenderer>().color = Color.white;
        }

        trainSelections = null;
        trainColorees.Clear();
    }

    // Fonction appeler pendant la sélection

    public void SourisEnMouvement(BaseEventData eventData)
    {
        PointerEventData pointerEventData = eventData as PointerEventData;
        Vector2 positionSourisActuelle = Camera.main.ScreenToWorldPoint(pointerEventData.position);

        xB = positionSourisActuelle.x;
        yB = positionSourisActuelle.y;

        xC = xB;
        yC = yA;
        xD = xA;
        yD = yB;

        // Création des vecteurs pour le rendu visuel de la zone de sélection

        selection[0] = new Vector2(xA, yA);
        selection[1] = new Vector2(xB, yB);
        selection[2] = new Vector2(xC, yC);
        selection[3] = new Vector2(xD, yD);

        // détecté les collisions à partir de overlapArea

        trainSelections = Physics2D.OverlapAreaAll(selection[0], selection[1], masqueTrain);

        foreach (var trainPasSelectionner in trainCourant)
        {
            trainPasSelectionner.pris = false;
            trainPasSelectionner.GetComponent<SpriteRenderer>().color = Color.white;
        }

        foreach (var selection in trainSelections)
        {
            tempsEcoulee = 0;
            selection.GetComponent<SpriteRenderer>().color = Color.blue;
            Trains trainActuel = selection.GetComponent<Trains>();
            Collider2D collisionTrain = trainActuel.GetComponent<Collider2D>();
            trainActuel.pris = true;
            selection.GetComponent<EventTrigger>().enabled = true;

            if (Vector3.Distance(selection.bounds.center, collisionTrain.bounds.center) < 0.01f && trainActuel.pris == true)
            {
                continue;
            }
        }

        // Afficher la zone de sélection possible visuellement

        lineRenderer.SetPosition(0, selection[0]);
        lineRenderer.SetPosition(1, selection[2]);
        lineRenderer.SetPosition(2, selection[2]);
        lineRenderer.SetPosition(3, selection[1]);
        lineRenderer.SetPosition(4, selection[1]);
        lineRenderer.SetPosition(5, selection[3]);
        lineRenderer.SetPosition(6, selection[3]);
        lineRenderer.SetPosition(7, selection[0]);
    }

    // Fonction appeler après la sélection

    public void OnPointerExit (BaseEventData eventData)
    {
        PointerEventData pointerEventData = eventData as PointerEventData;
        dragTrainActif = true;
        selection[0] = new Vector2(0, 0);
        selection[1] = new Vector2(0, 0);
        selection[2] = new Vector2(0, 0);
        selection[3] = new Vector2(0, 0);
        lineRenderer.positionCount = 0;
    }

    // Fonction appeler au début du drag

    public void OnEnterDrag(BaseEventData eventData)
    {
        if (dragTrainActif)
        {
            foreach (var dragTrain in trainSelections)
            {
                dragTrain.GetComponent<BoxCollider2D>().enabled = false;
                trainColorees.Add(dragTrain);
            }
        }
    }

    // Fonction appeler pendant le drag

    public void OnDrag(BaseEventData eventData)
    {
        if (dragTrainActif)
        {
            PointerEventData pointerEventData = eventData as PointerEventData;
            Vector2 positionSourisActuelle = Camera.main.ScreenToWorldPoint(pointerEventData.position);

            foreach (var dragTrain in trainSelections)
            {
                if (dragTrain == null)
                {
                    break;
                }

                dragTrain.transform.position = positionSourisActuelle;

                if (dragTrain.transform.position.x < -8.3f)
                {
                    dragTrain.transform.position = new Vector2(-8.3f, dragTrain.transform.position.y);

                    if (dragTrain.transform.position.y > 4.8f)
                    {
                        dragTrain.transform.position = new Vector2(-8.3f, 4.8f);
                    }
                    else if (dragTrain.transform.position.y < -4f)
                    {
                        dragTrain.transform.position = new Vector2(-8.3f, -4f);
                    }
                }
                else if (dragTrain.transform.position.x > 8.3f)
                {
                    dragTrain.transform.position = new Vector2(8.3f, dragTrain.transform.position.y);

                    if (dragTrain.transform.position.y > 4.8f)
                    {
                        dragTrain.transform.position = new Vector2(8.3f, 4.8f);
                    }
                    else if (dragTrain.transform.position.y < -4f)
                    {
                        dragTrain.transform.position = new Vector2(8.3f, -4f);
                    }
                }
                else if (dragTrain.transform.position.y < -4f)
                {
                    dragTrain.transform.position = new Vector2(dragTrain.transform.position.x, -4f);

                    if (dragTrain.transform.position.x < -8.3f)
                    {
                        dragTrain.transform.position = new Vector2(-8.3f, -4f);
                    }
                    else if (dragTrain.transform.position.x > 8.3f)
                    {
                        dragTrain.transform.position = new Vector2(8.3f, -4f);
                    }
                }
                else if (dragTrain.transform.position.y > 4.8f)
                {
                    dragTrain.transform.position = new Vector2(dragTrain.transform.position.x, 4.8f);

                    if (dragTrain.transform.position.x < -8.3f)
                    {
                        dragTrain.transform.position = new Vector2(-8.3f, 4.8f);
                    }
                    else if (dragTrain.transform.position.x > 8.3f)
                    {
                        dragTrain.transform.position = new Vector2(8.3f, 4.8f);
                    }
                }
            }
        }
    }

    // Fonction appeler à la fin du drag

    public void OnEndDrag(BaseEventData eventData)
    {
        if (dragTrainActif)
        {
            foreach (var dragTrain in trainSelections)
            {
                if (dragTrain == null)
                {
                    break;
                }

                dragTrain.GetComponent<BoxCollider2D>().enabled = true;
                dragTrain.GetComponentInChildren<SpriteRenderer>().color = Color.white;
            }

            trainSelections = null;
        }
    }

    /* === Fonction de transitionement des scènes === */

    // Fonction changeant de scène
    private void changerScene()
    {
        clipOstJeu.Stop();
        SceneManager.LoadScene(debutJeu);
        TransitionOut();
    }

    // Fonctions permettant le fade in et fade out dans les écrans de jeu

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

