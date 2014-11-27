#pragma strict

var lowIntensity:float = 0.5;
var highIntensity:float = 2.0;
var fadeSpeed:float =2.0;
var alarmOn:boolean;
var changeMargin:float = 0.2;

private var targetIntensity:float;

function Awake () {
	light.intensity = 0.0;
	targetIntensity = highIntensity;
}

function Update () {
	if(alarmOn) {
		light.intensity = Mathf.Lerp(light.intensity,targetIntensity,fadeSpeed * Time.deltaTime);
		checkTargetIntensity();	
	}
	else {
		light.intensity = Mathf.Lerp(light.intensity, 0.0, fadeSpeed * Time.deltaTime);
	}
}

function checkTargetIntensity() {
	if(Mathf.Abs(targetIntensity - light.intensity) < changeMargin) {
		if(targetIntensity == lowIntensity) {
			targetIntensity = highIntensity;
		}
		else {
			targetIntensity = lowIntensity;
		}
	}
}