using System.Collections;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.InputSystem;

public class BoîteAJouetNv3 : MonoBehaviour
{ 
    // Variables des componants ou des gameObjects
    public GameObject niveau3;
    Niveau3 scriptNiveau3;
    public SpriteRenderer visuelTrain;

    // variables de logiques

    public float decompteVisuel = 1f;
    public bool transparenceObject = false;

    /* === Fonctions natives de Unity === */

    void Start()
    {
        scriptNiveau3 = niveau3.GetComponent<Niveau3>();
    }

    void Update()
    {
        if (transparenceObject)
        {
            decompteVisuel -= 5f * Time.deltaTime;
            visuelTrain.color = new Color(1f, 1f, 1f, decompteVisuel);

            if (decompteVisuel <= 0f)
            {
                decompteVisuel = 1f;
                transparenceObject = false;
                DetruireTrain();
            }
        }
    }

    public void OnTriggerEnter2D(Collider2D collision)
    {
        BoucleLogiqueTrainDeposse();
    }

    /* === Fonctions pour le déposage des trains === */

    // Attrape les BoxCollider2D des trains

    public void BoucleLogiqueTrainDeposse()
    {
        foreach (var trainDeposse in scriptNiveau3.trainColorees)
        {
            GameObject train = trainDeposse.gameObject;
            visuelTrain = train.GetComponent<SpriteRenderer>();
            transparenceObject = true;
        }
    }

    // Fonction permettant de détruire les trains

    public void DetruireTrain()
    {
        GameObject train = visuelTrain.gameObject;
        Trains trainActuel = train.GetComponent<Trains>();

        visuelTrain = null;
        trainActuel.pris = false;
        scriptNiveau3.trainColorees.Remove(train.GetComponent<BoxCollider2D>());
        scriptNiveau3.trainCourant.Remove(trainActuel);
        Destroy(train);
        scriptNiveau3.AugmenterScore(true);

        if (scriptNiveau3.trainColorees.Count == 0)
        {
            scriptNiveau3.trainSelections = null;
        }
        else
        {
            BoucleLogiqueTrainDeposse();
        }

        scriptNiveau3.dragTrainActif = false;
        scriptNiveau3.tempsEcoulee = 0;
    }
}
