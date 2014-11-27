#pragma strict

public var position:Vector3 = new Vector3(1000,1000,1000);
public var resetPosition:Vector3 = new Vector3(1000,1000,1000);
public var lightHighIntensity:float = 0.25;
public var lightLowIntensity:float = 0.0;
public var fadeSpeed:float = 7.0;
public var musicFadeSpeed: float = 1.0;

private var alarm:AlarmLight;
private var mainLight:Light;
private var panicAudio:AudioSource;
private var sirens:AudioSource[];

function Awake() {
	alarm = GameObject.FindGameObjectWithTag(Tags.alarm).GetComponent(AlarmLight);
	mainLight = GameObject.FindGameObjectWithTag(Tags.mainLight).light;
	panicAudio = transform.Find("secondaryMusic").audio;
	var sirenGameObjects:GameObject[] = GameObject.FindGameObjectsWithTag(Tags.siren);
	sirens = new AudioSource[sirenGameObjects.Length];
	
	for(var i = 0; i < sirens.Length; i++) {
		sirens[i] = sirenGameObjects[i].audio;
	}
}	

function Update () {
	SwitchAlarms();
	MusicFading();
}
	
function SwitchAlarms () {
	alarm.alarmOn = (position != resetPosition);
	var newIntensity:float;
	if(position != resetPosition) {
		newIntensity = lightLowIntensity;
	}
	else {
		newIntensity = lightHighIntensity;
	}
	mainLight.intensity = Mathf.Lerp(mainLight.intensity,newIntensity,fadeSpeed * Time.deltaTime);
	for( var i = 0; i < sirens.length; i++) {
		if(position != resetPosition && !sirens[i].isPlaying) {
			sirens[i].Play();
		}
		else if(position == resetPosition) {
			sirens[i].Stop();
		}
	}
}

function MusicFading () {
	if(position != resetPosition) {
		audio.volume = Mathf.Lerp(audio.volume, 0.0, musicFadeSpeed * Time.deltaTime);
		panicAudio.volume = Mathf.Lerp(panicAudio.volume, 0.8, musicFadeSpeed * Time.deltaTime);
	}
	else {
		audio.volume = Mathf.Lerp(audio.volume, 0.8, musicFadeSpeed * Time.deltaTime);
		panicAudio.volume = Mathf.Lerp(panicAudio.volume, 0.0, musicFadeSpeed * Time.deltaTime);
	}
}