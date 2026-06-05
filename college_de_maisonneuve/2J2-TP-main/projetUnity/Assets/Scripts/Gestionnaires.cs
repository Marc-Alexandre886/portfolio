using System.Security.Cryptography.X509Certificates;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class Gestionnaires : MonoBehaviour
{
    /* === Variables === */

    // Variables pour l'animator

    public Animator animator;
    public GameObject jouer;
    public GameObject quitter;
    private Image jouerImage;
    private Image quitterImage;
    public bool inActif = false;
    public bool inActifinverse = false;
    public bool outActif = false;
    public bool outActifinverse = false;

    // Variables des nom des scènes

    public string debutJeu = "Debut";
    public string niveau1 = "Niveau1Clic";
    public string niveau2 = "Niveau2ClicGlisser";
    public string niveau3 = "Niveau3SelectionClicGlisser";
    public string finJeu = "Fin";

    // Variables pour la gestion sonore - audio

    public AudioSource clipOstMenu;
    public AudioSource clipSfxMenu;
    public AudioSource clipOstJeu;

    // Variables pour la gestion sonore - GameObject

    private GameObject sonOstMenu;
    private GameObject sonSfxMenu;
    private GameObject sonOstJeu;

    /* === Fonctions native de Unity === */

    private void Awake()
    {
        DontDestroyOnLoad(this);
    }

    private void Start()
    {
        // Rechercher les gameObjects - Audio

        sonOstMenu = GameObject.Find("GestionnaireSonore/SonOstMenu");
        sonSfxMenu = GameObject.Find("GestionnaireSonore/SonSfxMenu");
        sonOstJeu = GameObject.Find("GestionnaireSonore/SonOstJeu");

        // Assignation du gameObject aux componants - Audio

        clipOstMenu = sonOstMenu.GetComponent<AudioSource>();
        clipSfxMenu = sonSfxMenu.GetComponent<AudioSource>();
        clipOstJeu = sonOstJeu.GetComponent<AudioSource>();

        // Rechercher les gameObjects - Canvas

        jouer = GameObject.FindWithTag("jouer");
        quitter = GameObject.FindWithTag("quitter");

        // Assignation du gameObject aux componants - Animation

        animator = GetComponent<Animator>();

        // Permet de s'assurer que le joueur estbel et bien dans l'écran du début pour éviter des plutiples sons dans le jeu
        
        Scene sceneMenu = SceneManager.GetActiveScene();

        if (sceneMenu.name != "Debut")
        {
            clipOstMenu.Stop();
        }
        else
        {
            // Assignation du gameObject aux componants - Canvas

            jouerImage = jouer.GetComponent<Image>();
            quitterImage = quitter.GetComponent<Image>();
            clipOstMenu.Play();
        }
    }

    /* === Fonctions pour démarrer le jeu === */

    // Foncton apeller lorsque le bouton "Jouer" est appuyé 

    public void Gestion()
    {
        clipSfxMenu.Play();
        TransitionIn();
        Invoke("Scenes", 1f);
    }

    // Fonction permettant de changer de scène

    public void Scenes()
    {
        Scene sceneCourante = SceneManager.GetActiveScene();

        switch (sceneCourante.name)
        {
            case "Debut":
                SceneManager.LoadScene(niveau1);
                break;
            case "Niveau1Clic":
                SceneManager.LoadScene(niveau2);
                break;
            case "Niveau2ClicGlisser":
                SceneManager.LoadScene(niveau3);
                break;
            case "Niveau3SelectionClicGlisser":
                SceneManager.LoadScene(finJeu);
                break;
            case "Fin":
                SceneManager.LoadScene(debutJeu);
                break;
        }

        TransitionOut();
    }

    /* === Fonctions pour quitter le jeu === */

    // Foncton apeller lorsque le bouton "Quitter" est appuyé 

    public void Quitter()
    {
        clipSfxMenu.Play();
        TransitionInInverse();
        Invoke("QuitterSite", 1f);
    }

    // Fonction permettant de quitter le jeu en retournant sur la page des jeux sur Télé-Québec

    public void QuitterSite()
    {
        TransitionOutInverse();
        Application.OpenURL("https://coucou.telequebec.tv/jeux");
    }

    /* === Fonctions du survolement de la souris sur le Canvas === */

    // Fonctions de survolement de la souris pour le bouton "Jouer"

    public void HoverJouer()
    {
        jouerImage.color = Color.grey;
    }

    public void UnSelectJouer()
    {
        jouerImage.color = Color.white;
    }

    // Fonctions de survolement de la souris pour le bouton "Quitter"

    public void HoverQuitter()
    {
        quitterImage.color = Color.grey;
    }

    public void UnSelectQuitter()
    {
        quitterImage.color = Color.white;
    }

    /* === Fonctions des transtions === */

    // Fonctons de transitionnement lorsque le bouton "Jouer" est appuyé 

    public void TransitionIn()
    {
        animator.SetBool("inActif", true);
    }
    public void TransitionOut()
    {
        animator.SetBool("outActif", true);
        Invoke("FinTransition", 0.5f);
    }

    // Fonctons de transitionnement lorsque le bouton "Quitter" est appuyé 

    public void TransitionInInverse()
    {
        animator.SetBool("inActifInverse", true);
    }


    public void TransitionOutInverse()
    {
        animator.SetBool("outActifInverse", true);
        Invoke("FinTransition", 0.5f);
    }

    // Fonction désactivant tous les variables de l'animation

    public void FinTransition()
    {
        animator.SetBool("inActif", false);
        animator.SetBool("outActif", false);
        animator.SetBool("inActifInverse", false);
        animator.SetBool("outActifInverse", false);
    }
}
