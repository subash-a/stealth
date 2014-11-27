#pragma strict

private var lastPlayerSighting: LastPlayerSighting;
private var player:GameObject;

function Awake() {
	player = GameObject.FindGameObjectWithTag(Tags.player);
	lastPlayerSighting = GameObject.FindGameObjectWithTag(Tags.gameController).GetComponent(LastPlayerSighting);
}

function OnTriggerStay(other:Collider) {
	if(other.gameObject == player) {
		var relPlayerPos:Vector3 = player.transform.position - transform.position;
		var hit:RaycastHit;
		if(Physics.Raycast(transform.position, relPlayerPos, hit)) {
			if(hit.collider.gameObject == player) {
				lastPlayerSighting.position = player.transform.position;
			}
		}
	}
}