const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

const songs = ['afternoon homework', 'all over again', 'are you lost', 'aster', 'at night thinking about you', 'backyard', 'bird watching', 'breathing', 'city lights', 'dancing on my own pt2', 'despondency', 'distant memories', 'dont run', 'evening sky', 'faithful', 'falling asleep together when it rains', 'feeling cozy', 'fresh', 'friends in different seasons', 'hey', 'hobo', 'i found myself in the cold', 'i think youd like me better now', 'in love', 'it might take forever', 'its a good night', 'its okay', 'karasuno high', 'keep gazing', 'lavender', 'let me hold you', 'like i need u', 'lonely', 'lullabies', 'me n you', 'melting snow growing leaves and the sound of spring', 'memories', 'midsummer nights', 'neverland', 'nightskate', 'nov2', 'on my way', 'over now', 'panorama', 'past fields', 'plaza', 'remember me when i leave', 'reminisce', 'rowboat', 'sanctum', 'sea la vie', 'shyness', 'sleepy eyes', 'summertime', 'tender', 'under the stars', 'unknown places', 'unrequited', 'walk by the lake', 'water lily', 'what u need', '喫茶店'];

let songIndex = 0;
loadSong(songs[songIndex]); // initially load song details into DOM
 
// update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `assets/lofi/${song}.mp3`; // access it using the name stored in the array
}

// play 
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}

// pause 
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  audio.pause();
}

// previous
function prevSong() {
  songIndex--; // decrement, go to previous track

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// next song
function nextSong() {
  songIndex++; // increment, skip a track

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// updatetimer progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// set timer progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// find duration of song
function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);
	currTime.innerHTML = min +':'+ sec;

	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 
	
	get_sec_d (duration);
	durTime.innerHTML = min_d +':'+ sec_d;
		
};

playBtn.addEventListener('click', () => {
	const isPlaying = musicContainer.classList.contains('play');
	
	if (isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);
audio.addEventListener('timeupdate',DurTime);



