using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.InputSystem;

public class BoîteAJouetNv2 : MonoBehaviour
{
    // Variables d'obtention du script actuel du niveau
    public GameObject niveau2;
    private Niveau2 scriptNiveau2;

    /* === Fonctions native de Unity === */

    void Start()
    {
        // Rechercher les gameobjects du niveau2

        scriptNiveau2 = niveau2.GetComponent<Niveau2>();
        scriptNiveau2.visuel5 = GameObject.FindWithTag("N2V1");
        scriptNiveau2.visuel6 = GameObject.FindWithTag("N2V2");
        scriptNiveau2.visuel7 = GameObject.FindWithTag("N2V3");
    }

    // Fonction attendant qu'une collision soit présente avec la collision de la boîte

    public void OnTriggerStay2D(Collider2D collision)
    {
        if (collision.gameObject.tag == "N2V1")
        {
            scriptNiveau2.animatorRobots.SetInteger("robot", 1);
            scriptNiveau2.visuel5.GetComponent<BoxCollider2D>().enabled = false;
            Invoke("DetruireRobot5", 0.2f);
            scriptNiveau2.AugmenterScore(true);
        }
        else if (collision.gameObject.tag == "N2V2")
        {
            scriptNiveau2.animatorRobots.SetInteger("robot", 2);
            scriptNiveau2.visuel6.GetComponent<BoxCollider2D>().enabled = false;
            Invoke("DetruireRobot6", 0.2f);
            scriptNiveau2.AugmenterScore(true);
        }
        else if (collision.gameObject.tag == "N2V3")
        {
            scriptNiveau2.animatorRobots.SetInteger("robot", 3);
            scriptNiveau2.visuel7.GetComponent<BoxCollider2D>().enabled = false;
            Invoke("DetruireRobot7", 0.2f);
            scriptNiveau2.AugmenterScore(true);
        }
    }

    /* === Fonctions de destruction des gameobjects du niveau2 === */

    public void DetruireRobot5()
    {
        Destroy(scriptNiveau2.visuel5);
    }

    public void DetruireRobot6()
    {
        Destroy(scriptNiveau2.visuel6);
    }

    public void DetruireRobot7()
    {
        Destroy(scriptNiveau2.visuel7);
    }
}
