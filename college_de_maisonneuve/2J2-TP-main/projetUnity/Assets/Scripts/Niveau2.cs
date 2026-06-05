using System;
using System.Linq.Expressions;
using TMPro;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.Rendering;
using UnityEngine.SceneManagement;

public class Niveau2 : MonoBehaviour
{
    /* === Variables === */

    // Variables pour l'animator

    public Animator animatorGestion;
    public Animator animatorAide;
    public Animator animatorRobots;

    // Variables pour le Canvas du niveau de la scène actuel

    public GameObject textScore;
    public TMP_Text contenuScore;
    public int scoreAfficher;

    // Variables des nom des scènes

    public string niveau3 = "Niveau3SelectionClicGlisser";

    // Variable pour les visuels - aide visuel

    GameObject aideVisuelNv2;

    // Variable pour les visuels - objects int ractifs de la scène du second niveau

    public GameObject visuel5;
    public GameObject visuel6;
    public GameObject visuel7;

    // Variables pour la gestion sonore - audio

    public AudioSource clipSfxMenu;
    public AudioSource clipOstJeu;
    public AudioSource clipSfxJouet;
    public AudioSource clipNv2;
    public AudioSource clipNv2Exp;
    public AudioSource clipBravo;

    // Variables pour la gestion sonore - GameObject

    private GameObject sonSfxMenu;
    private GameObject sonOstJeu;
    private GameObject sonSfxJouet;
    private GameObject sonNv2;
    private GameObject sonNv2Exp;
    private GameObject sonBravo;

    // Variables pour la mécanique du clic-glisser

    public GameObject parentRobots;
    private GameObject boîte;
    private Rigidbody2D rb5;
    private Rigidbody2D rb6;
    private Rigidbody2D rb7;
    private BoxCollider2D bc5;
    private BoxCollider2D bc6;
    private BoxCollider2D bc7;

    // Variables générales

    private float tempsEcoulee = 0;

    /* === Fonctions native de Unity === */

    void Start()
    {

        // Rechercher les gameObjects - Audio

        sonSfxMenu = GameObject.Find("GestionnaireSonore/SonSfxMenu");
        sonOstJeu = GameObject.Find("GestionnaireSonore/SonOstJeu");
        sonSfxJouet = GameObject.Find("GestionnaireSonore/SonSfxJouet");
        sonNv2 = GameObject.Find("GestionnaireSonore/SonNv2");
        sonNv2Exp = GameObject.Find("GestionnaireSonore/SonNv2Exp");
        sonBravo = GameObject.Find("GestionnaireSonore/SonBravo");

        // Assignation du gameObject aux componants - Audio

        clipSfxMenu = sonSfxMenu.GetComponent<AudioSource>();
        clipOstJeu = sonOstJeu.GetComponent<AudioSource>();
        clipSfxJouet = sonSfxJouet.GetComponent<AudioSource>();
        clipNv2 = sonNv2.GetComponent<AudioSource>();
        clipNv2Exp = sonNv2Exp.GetComponent<AudioSource>();
        clipBravo = sonBravo.GetComponent<AudioSource>();

        // Rechercher les gameObjects - Visuel du second niveau

        parentRobots = GameObject.Find("ElementsJoueur");
        aideVisuelNv2 = GameObject.FindWithTag("ExpNv2");
        visuel5 = GameObject.FindWithTag("N2V1");
        visuel6 = GameObject.FindWithTag("N2V2");
        visuel7 = GameObject.FindWithTag("N2V3");
        boîte = GameObject.FindWithTag("boiteAJouet");
        textScore = GameObject.Find("Canvas/Score");
        animatorRobots = parentRobots.GetComponent<Animator>();
        contenuScore = textScore.GetComponent<TMP_Text>();

        // Assignation du gameObject aux componants - Second niveau

        boîte.GetComponent<BoxCollider2D>();

        rb5 = visuel5.GetComponent<Rigidbody2D>();
        rb6 = visuel6.GetComponent<Rigidbody2D>();
        rb7 = visuel7.GetComponent<Rigidbody2D>();
        bc5 = visuel5.GetComponent<BoxCollider2D>();
        bc6 = visuel6.GetComponent<BoxCollider2D>();
        bc7 = visuel7.GetComponent<BoxCollider2D>();

        // Jouer les audio de base - Second niveau

        clipNv2.Play();
        clipOstJeu.Play();
        animatorRobots.SetBool("intro", true);
    }


    void Update()
    {
        // Remise du score à jour

        contenuScore.text = $"Jouets restants : {scoreAfficher}";

        // Vérification du temps  coulée pour s'assurer que le joueur termine le niveau actuel

        tempsEcoulee += Time.deltaTime;

        if (tempsEcoulee >= 10 && tempsEcoulee <= 11)
        {
            clipNv2.Play();
        }
        else if (tempsEcoulee >= 30 && tempsEcoulee <= 31)
        {
            tempsEcoulee = 0;
            clipNv2.Play();
            animatorAide.SetBool("clic2", true);
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
            clipBravo.Play();
            animatorAide.SetBool("clic2", false);

            if (scoreAfficher == 0)
            {
                Invoke("TransitionIn", 2f);
            }

            actif = false;
        }
    }

    // Fonction permettant de prioriser l'audio joué  et ar te les audio non-essentiel

    public void PriorisationAudio()
    {
        if (clipBravo.isPlaying)
        {
            clipNv2.Stop();
            clipNv2Exp.Stop();
        }
        else if (clipNv2.isPlaying)
        {
            clipBravo.Stop();
            clipNv2Exp.Stop();
        }
        else if (clipNv2Exp.isPlaying)
        {
            clipBravo.Stop();
            clipNv2.Stop();
        }
    }

    // Fonction permettant de illlustrer visuelement ce que le joeur doit réaliser

    public void Aide()
    {
        if (aideVisuelNv2.gameObject.tag == "ExpNv2")
        {
            clipNv2Exp.Play();
        }
    }

    /* === Fonctions de la mécanique du clic-glisser === */

    // Deuxième niveau

    // Foncitons débutant le drag.
    public void OnBeginDrag5(BaseEventData eventData)
    {
        animatorRobots.SetBool("intro", false);
        bc5.enabled = false;
        rb5.bodyType = RigidbodyType2D.Static;
        visuel5.GetComponentInChildren<SpriteRenderer>().color = Color.white;
    }

    public void OnBeginDrag6(BaseEventData eventData)
    {
        animatorRobots.SetBool("intro", false);
        bc6.enabled = false;
        rb6.bodyType = RigidbodyType2D.Static;
        visuel6.GetComponentInChildren<SpriteRenderer>().color = Color.white;
    }

    public void OnBeginDrag7(BaseEventData eventData)
    {
        animatorRobots.SetBool("intro", false);
        bc7.enabled = false;
        rb7.bodyType = RigidbodyType2D.Static;
        visuel7.GetComponentInChildren<SpriteRenderer>().color = Color.white;
    }


    // Fonctions glissant durant le drag.
    public void OnDrag5(BaseEventData eventData)
    {
        PointerEventData pointerEventData = eventData as PointerEventData;
        Vector2 positionPointeurMonde = Camera.main.ScreenToWorldPoint(pointerEventData.position);
        visuel5.transform.position = positionPointeurMonde;
        visuel5.GetComponentInChildren<SpriteRenderer>().color = Color.green;
        tempsEcoulee = 0;

        if (visuel5.transform.position.x < -8.3f)
        {
            visuel5.transform.position = new Vector2(-8.3f, visuel5.transform.position.y);

            if (visuel5.transform.position.y > 4.8f)
            {
                visuel5.transform.position = new Vector2(-8.3f, 4.8f);
            }
            else if (visuel5.transform.position.y < -4f)
            {
                visuel5.transform.position = new Vector2(-8.3f, -4f);
            }
        }
        else if (visuel5.transform.position.x > 8f)
        {
            visuel5.transform.position = new Vector2(8f, visuel5.transform.position.y);

            if (visuel5.transform.position.y > 4.8f)
            {
                visuel5.transform.position = new Vector2(8f, 4.8f);
            }
            else if (visuel5.transform.position.y < -4f)
            {
                visuel5.transform.position = new Vector2(8f, -4f);
            }
        }
        else if (visuel5.transform.position.y < -4f)
        {
            visuel5.transform.position = new Vector2(visuel5.transform.position.x, -4f);

            if (visuel5.transform.position.x < -8.3f)
            {
                visuel5.transform.position = new Vector2(-8.3f, -4f);
            }
            else if (visuel5.transform.position.x > 8f)
            {
                visuel5.transform.position = new Vector2(8f, -4f);
            }
        }
        else if (visuel5.transform.position.y > 4.8f)
        {
            visuel5.transform.position = new Vector2(visuel5.transform.position.x, 4.8f);

            if (visuel5.transform.position.x < -8.3f)
            {
                visuel5.transform.position = new Vector2(-8.3f, 4.8f);
            }
            else if (visuel5.transform.position.x > 8f)
            {
                visuel5.transform.position = new Vector2(8f, 4.8f);
            }
        }
    }

    public void OnDrag6(BaseEventData eventData)
    {
        PointerEventData pointerEventData = eventData as PointerEventData;
        Vector2 positionPointeurMonde = Camera.main.ScreenToWorldPoint(pointerEventData.position);
        visuel6.transform.position = positionPointeurMonde;
        visuel6.GetComponentInChildren<SpriteRenderer>().color = Color.green;
        tempsEcoulee = 0;

        if (visuel6.transform.position.x < -8.3f)
        {
            visuel6.transform.position = new Vector2(-8.3f, visuel6.transform.position.y);

            if (visuel6.transform.position.y > 4.8f)
            {
                visuel6.transform.position = new Vector2(-8.3f, 4.8f);
            }
            else if (visuel6.transform.position.y < -4f)
            {
                visuel6.transform.position = new Vector2(-8.3f, -4f);
            }
        }
        else if (visuel6.transform.position.x > 7f)
        {
            visuel6.transform.position = new Vector2(7f, visuel6.transform.position.y);

            if (visuel6.transform.position.y > 4.8f)
            {
                visuel6.transform.position = new Vector2(7f, 4.8f);
            }
            else if (visuel6.transform.position.y < -4f)
            {
                visuel6.transform.position = new Vector2(7f, -4f);
            }
        }
        else if (visuel6.transform.position.y < -4f)
        {
            visuel6.transform.position = new Vector2(visuel6.transform.position.x, -4f);

            if (visuel6.transform.position.x < -8.3f)
            {
                visuel6.transform.position = new Vector2(-8.3f, -4f);
            }
            else if (visuel6.transform.position.x > 7f)
            {
                visuel6.transform.position = new Vector2(7f, -4f);
            }
        }
        else if (visuel6.transform.position.y > 4.8f)
        {
            visuel6.transform.position = new Vector2(visuel6.transform.position.x, 4.8f);

            if (visuel6.transform.position.x < -8.3f)
            {
                visuel6.transform.position = new Vector2(-8.3f, 4.8f);
            }
            else if (visuel6.transform.position.x > 7f)
            {
                visuel6.transform.position = new Vector2(7f, 4.8f);
            }
        }
    }

    public void OnDrag7(BaseEventData eventData)
    {
        PointerEventData pointerEventData = eventData as PointerEventData;
        Vector2 positionPointeurMonde = Camera.main.ScreenToWorldPoint(pointerEventData.position);
        visuel7.transform.position = positionPointeurMonde;
        visuel7.GetComponentInChildren<SpriteRenderer>().color = Color.green;
        tempsEcoulee = 0;

        if (visuel7.transform.position.x < -8.3f)
        {
            visuel7.transform.position = new Vector2(-8.3f, visuel7.transform.position.y);

            if (visuel7.transform.position.y > 4.8f)
            {
                visuel7.transform.position = new Vector2(-8.3f, 4.8f);
            }
            else if (visuel7.transform.position.y < -4f)
            {
                visuel7.transform.position = new Vector2(-8.3f, -4f);
            }
        }
        else if (visuel7.transform.position.x > 7f)
        {
            visuel7.transform.position = new Vector2(7f, visuel7.transform.position.y);

            if (visuel7.transform.position.y > 4.8f)
            {
                visuel7.transform.position = new Vector2(7f, 4.8f);
            }
            else if (visuel7.transform.position.y < -4f)
            {
                visuel7.transform.position = new Vector2(7f, -4f);
            }
        }
        else if (visuel7.transform.position.y < -4f)
        {
            visuel7.transform.position = new Vector2(visuel7.transform.position.x, -4f);

            if (visuel7.transform.position.x < -8.3f)
            {
                visuel7.transform.position = new Vector2(-8.3f, -4f);
            }
            else if (visuel7.transform.position.x > 7f)
            {
                visuel7.transform.position = new Vector2(7f, -4f);
            }
        }
        else if (visuel7.transform.position.y > 4.8f)
        {
            visuel7.transform.position = new Vector2(visuel7.transform.position.x, 4.8f);

            if (visuel7.transform.position.x < -8.3f)
            {
                visuel7.transform.position = new Vector2(-8.3f, 4.8f);
            }
            else if (visuel7.transform.position.x > 7f)
            {
                visuel7.transform.position = new Vector2(7f, 4.8f);
            }
        }
    }

    // Fonctions terminant le drag.
    public void OnEndDrag5(BaseEventData eventData)
    {
        bc5.enabled = true;
        rb5.bodyType = RigidbodyType2D.Dynamic;
        visuel5.GetComponentInChildren<SpriteRenderer>().color = Color.white;
    }

    public void OnEndDrag6(BaseEventData eventData)
    {
        bc6.enabled = true;
        rb6.bodyType = RigidbodyType2D.Dynamic;
        visuel6.GetComponentInChildren<SpriteRenderer>().color = Color.white;
    }

    public void OnEndDrag7(BaseEventData eventData)
    {
        bc7.enabled = true;
        rb7.bodyType = RigidbodyType2D.Dynamic;
        visuel7.GetComponentInChildren<SpriteRenderer>().color = Color.white;
    }

    /* === Fonctions de transitionement des scènes === */

    // Fonction changeant de scène
    private void changerScene()
    {
        clipOstJeu.Stop();
        SceneManager.LoadScene(niveau3);
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

