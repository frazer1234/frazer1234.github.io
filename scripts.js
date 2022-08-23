

let playIcon = $('#play-icon');
let pauseIcon = $('#pause-icon');
let player = $('#player');
let mediaType = $('#media-type');
let nowPlaying = $('#now-playing');
let controls = $('#media-controls');
let currentMediaType = "song";

let currentSongIndex = 0;
let currentFunnyIndex = 0;
let playing = false;


let songs = ["summer.mp3",
"sky full of stars.mp3",
"astronomia.mp3",
"scientist.mp3",
"glad you came.mp3",
"how deep is your love.mp3"];

let funnies = ["Muriel Gifford's Sea shells .aac",
"belly scratches.aac",
"circumcision.aac",
"five for a sixer.aac",
"flap flap bastards.aac",
"freebacon! .aac",
"ghosties down the u-bend.aac",
"jackets and trouser legs.aac",
"making a balls of the news.aac",
"morning sitcom.aac",
"nobody needs knickers! .aac",
"one-armed man.aac",
"satisfying piss.aac"]

// const push = require('pushover-notifications');
// require(['pushover-notifications'], function (foo) {
//     //foo is now loaded.
//     const Pushover = new foo({
//   'user': 'u4f6a38f8smcathvtm5itr5pgqytbe',
//   'token': 'a1ntu7ubs36c1o7xpnqi46yxwkpaud',
//   onerror: function(error) { throw err; }
// });
// });
// const Pushover = new push({
//   'user': 'u4f6a38f8smcathvtm5itr5pgqytbe',
//   'token': 'a1ntu7ubs36c1o7xpnqi46yxwkpaud',
//   onerror: function(error) { throw err; }
// });


// const notify = (data) => {
//   const text = `User`;

//   const msg = {
//     // These values correspond to the parameters detailed on https://pushover.net/api
//     // 'message' is required. All other values are optional.
//     message: text, // required
//     title: 'Reddit Notifier',
//     // sound: 'magic',
//     // device: 'devicename',
//     // priority: 1
//   };

//   console.log('Sending notification: %s', text);

//   Pushover.send(msg, function(err, result) {
//     if (err) {
//       console.error('Pushover failure');
//       throw err;
//     }

//     // console.log(result);
//   });

//   // dump(data);
// };



$(document).ready(()=>{
	console.log('page loaded, magic ensues');

	// Put first song in array into src attr of audio element
	player.attr('src', "music/"+songs[currentSongIndex]);
	nowPlaying.text(cleanName(songs[currentSongIndex]));

	playing = false;

})

function handleBold(el){
	$(".media-select .button").removeClass('selected')
	$(el).addClass('selected');
}

// Listen for media-select button presses
function playSong(el){

	currentMediaType = 'song'
	console.log("binish wants to play a song");

	handleBold(el)

	mediaType.text('Song Mode')

	nowPlaying.text(cleanName(songs[currentSongIndex]));

	player[0].pause()

	player.attr('src', "music/"+songs[currentSongIndex]);

	pausePlayer();

	controls.show();
}

function playFunnyTime(el){
	console.log("binish wants to play a funny time");

	currentMediaType = "funny"

	handleBold(el)

	controls.show()

	mediaType.text('Funny Times...')

	nowPlaying.text(cleanName(funnies[currentFunnyIndex]));

	pausePlayer();

	player.attr('src', "funnytimes/"+funnies[currentFunnyIndex]);
	
}

function freakout(el){
	console.log("binish is freaking out");
	handleBold(el)
	mediaType.text('Received your message love, will call you ASAP!')

	player[0].pause()

	nowPlaying.text('')

	controls.hide()

	sendPushOver();
}

function playPauseClicked(el){
	console.log("binish pressed play/pause");
	// console.log('el:', el);

	// find icon that ISN'T hidden
	let clicked = $(el).find('img').not(".hidden")[0];
	clicked = $(clicked).attr('id');
	// console.log("element clicked was:", clicked);

	if (clicked === "play-icon") {
		// binish wants to play the media
		player[0].play();

		// show media-playing
		// $('#media-playing').visible();

		if (currentMediaType === "song") {
			nowPlaying.text(cleanName(songs[currentSongIndex]))
		} else {
			nowPlaying.text(cleanName(funnies[currentFunnyIndex]));
		}
		

		playing = true

		// hide play-icon, show pause-icon
		playIcon.addClass('hidden');
		pauseIcon.removeClass('hidden');

	} else {

		// binish is pausing
		player[0].pause();

		playing = false;

		playIcon.removeClass('hidden')
		pauseIcon.addClass('hidden');
	}
}

function nextClicked(){
	console.log('binish clicked next');

	if (currentMediaType === "song") {
			// incrememnt currentSongIndex
			currentSongIndex++
			currentSongIndex > songs.length ? currentSongIndex = 0 : true;
			player.attr('src', "music/"+songs[currentSongIndex]);
			nowPlaying.text(cleanName(songs[currentSongIndex]));
		} else {
			currentFunnyIndex++;
			currentFunnyIndex > funnies.length ? currentFunnyIndex = 0 : true;
			player.attr('src', "funnytimes/"+funnies[currentFunnyIndex]);
			nowPlaying.text(cleanName(funnies[currentFunnyIndex]));
		}

	if (playing === true) {
		// things are playing
		player[0].play();
	}
	
}

function prevClicked(){
	console.log("binish clicked previous")

	if (currentMediaType === "song"){
		currentSongIndex--;
		currentSongIndex < 0 ? currentSongIndex = 0 : true;

		player.attr('src', "music/"+songs[currentSongIndex]);
		nowPlaying.text(cleanName(songs[currentSongIndex]));
	} else {
		currentFunnyIndex--;
		currentFunnyIndex < 0 ? currentFunnyIndex = 0 : true;
		player.attr('src', "funnytimes/"+funnies[currentFunnyIndex]);
		nowPlaying.text(cleanName(funnies[currentFunnyIndex]));
	}
	

	if (playing === true) {
		// things are playing
		player[0].play();
	}

}



player.on("ended", ()=>{
	console.log("player has ended, hide play button, show pause");
	pausePlayer();
})

function pausePlayer(){
	player[0].pause()
	pauseIcon.addClass('hidden');
	playIcon.removeClass('hidden');
	playing = false;
}

function sendPushOver(){
var url = "https://api.mynotifier.app/";

var xhr = new XMLHttpRequest();
xhr.open("POST", url);

xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
   }};

var data = `{
  "apiKey": "baedb8ad-36d8-479f-963c-ee0d3bf5f3fd",
  "message": "Binish needs you ASAP",
  "description": "Call her up",
  "body": "",
  "type": "success",
  "project": ""
}`;

xhr.send(data);
alert("Alert sent to Rehan");

}

function sendPush(){
	let push = {
		"active": "true",
		"type": "note",
		"title": "HELP",
		"body": "Shit is hitting binish fan!",
		"email": "a.rehan6947@gmail.com"
	}

	let headers = {
		'Content-Type': 'application/json'
	}
	$.ajax({
	         url: "https://api.pushbullet.com/v2/pushes",
	         data: JSON.stringify(push),
	         type: "POST",
	         beforeSend: function(xhr){xhr.setRequestHeader('Access-Token', 'o.r0rfvQah6E40bogS6JCF6w0Pstp1bT9o').setRequestHeader('Content-Type','application/json');},
	         success: function() { alert("Alert sent to Rehan"); }
	      });
}

// Replace placeholder texts and urls with your own values:

//https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?
// title=If%20this%20is%20set%20will%20create%20notification&icon=http://example.com/icon.png&
// text==:=command text=:=etc&
//  url=http://example.com&
// clipboard=Some+Text&
// file=http://publicurl.com/image.jpg,http://publicurl.com/image2.jpg&
// deviceId=9916eb2045544b20a9b3c3af1f0e0b3e&
// apikey=




function cleanName(name){
	name = name.replace('.mp3', '')
	name = name.replace('.aac', '')
	return name
}


jQuery.fn.visible = function() {
    return this.css('visibility', 'visible');
};

jQuery.fn.invisible = function() {
    return this.css('visibility', 'hidden');
};

jQuery.fn.visibilityToggle = function() {
    return this.css('visibility', function(i, visibility) {
        return (visibility == 'visible') ? 'hidden' : 'visible';
    });
};
