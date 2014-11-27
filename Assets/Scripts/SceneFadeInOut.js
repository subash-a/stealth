#pragma strict

public var fadeSpeed:float = 1.5;
public var sceneStart:boolean = true;

function Awake () {
	guiTexture.pixelInset = new Rect(0.0,0.0,Screen.width, Screen.height);
}

function Update () {
	if(sceneStart) {
		StartScene();
	}
}

function fadeToClear () {
	guiTexture.color = Color.Lerp(guiTexture.color, Color.clear, fadeSpeed * Time.deltaTime);
}

function fadeToBlack () {
	guiTexture.color = Color.Lerp(guiTexture.color, Color.black, fadeSpeed * Time.deltaTime);
}

function StartScene () {
	fadeToClear();
	if(guiTexture.color.a <= 0.05) {
		guiTexture.color = Color.clear;
		guiTexture.enabled = false;
		sceneStart = false;
	}
}

public function EndScene () {
	guiTexture.enabled = true;
	fadeToBlack();
	if(guiTexture.color.a >= 0.95) {
		Application.LoadLevel(1);
	}
}