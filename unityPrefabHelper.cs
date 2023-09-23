using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using Mona;

public class PrefabSpawner
{


    [MenuItem("JD/CreateVrmPlatforms")]
    static void CreateVrmPlatforms()
    {
        var numNouns = 50;
        var baseUrl = "https://github.com/jasperdegens/mona-token-gated/raw/main/nouns/vrm/{0}.vrm";
        for (var i = 0; i < numNouns; i++)
        {
            var go = GameObject.CreatePrimitive(PrimitiveType.Cube);
            go.name = string.Format("Noun {0}", i);
            var vrmSwitcher = go.AddComponent<Mona.MonaVRMSwitcher>();
            vrmSwitcher.VrmName = go.name;
            vrmSwitcher.VrmUrl = string.Format(baseUrl, i);
            string localPath = "Assets/Prefabs/" + go.name + ".prefab";
            PrefabUtility.SaveAsPrefabAsset(go, localPath);
        }
    }
}
