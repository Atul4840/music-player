



let playBtn = document.getElementById('play-btn');
let inputBtn = document.getElementById('progress');
let songList = document.getElementById('song-list');
let forwardBtn = document.getElementById('forward-play');
let backBtn = document.getElementById('back-play');

let songs = [
    {
        id:1,
        name: "song1"
        
    },
    {
        id:2,
        name: "song2"
        
    },
    {
        id:3,
        name: "song3"
        
    },
    {
        id:4,
        name: "song4"
        
    }
]



let audio = new Audio('./asset/song1.mp3');

for(let song of songs){
    let li = document.createElement('li');
    li.innerText = song.name;
    li.setAttribute('id',song.id);
    li.classList.add('item-list');
    songList.append(li);
}

playBtn.addEventListener('click',()=>{
        audio.paused ? audio.play() : audio.pause();

        if(playBtn.children[0].classList.contains('fa-play')){
            playBtn.children[0].classList.remove('fa-play')
            playBtn.children[0].classList.add('fa-pause')
        }else{
            playBtn.children[0].classList.remove('fa-pause')
            playBtn.children[0].classList.add('fa-play')
        }
})

// progress bar for the audio


audio.addEventListener("timeupdate", (event) => {
    let currentProgress = audio.currentTime * 100 / audio.duration;
    inputBtn.value = currentProgress;
});

// drag and play audio
inputBtn.addEventListener('change' , function(){
    let updatedTime = audio.duration * inputBtn.value / 100;
    audio.currentTime = updatedTime;
})

//console.log(songList);
songList.addEventListener('click',(e)=>{
      let id = e.target.getAttribute('id');
      audio.src = `./asset/song${id}.mp3`;
      audio.play();
      audio.currentTime = 0;
      playBtn.children[0].classList.remove('fa-play')
      playBtn.children[0].classList.add('fa-pause')
})

let len= songs.length;
console.log(len);


forwardBtn.addEventListener('click',(e)=>{
   // Find the index of the currently playing song
   let currentSongIndex = songs.findIndex(song => audio.src.endsWith(`song${song.id}.mp3`));

   // Calculate the index of the next song
   let nextSongIndex = (currentSongIndex + 1) % songs.length;

   // Update the audio source to play the next song
   audio.src = `./asset/song${songs[nextSongIndex].id}.mp3`;

   // Play the new song
   audio.play();

   audio.currentTime = 0;
   playBtn.children[0].classList.remove('fa-play')
   playBtn.children[0].classList.add('fa-pause')
})



backBtn.addEventListener('click',(e)=>{
    // Find the index of the currently playing song
    let currentSongIndex = songs.findIndex(song => audio.src.endsWith(`song${song.id}.mp3`));
 
    // Calculate the index of the next song
    let nextSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
 
    // Update the audio source to play the next song
    audio.src = `./asset/song${songs[nextSongIndex].id}.mp3`;
 
    // Play the new song
    audio.play();
 
    audio.currentTime = 0;
    playBtn.children[0].classList.remove('fa-play')
    playBtn.children[0].classList.add('fa-pause')
 })



 audio.addEventListener('ended', () => {
    // Find the index of the currently playing song
    let currentSongIndex = songs.findIndex(song => audio.src.endsWith(`song${song.id}.mp3`));

    // Calculate the index of the next song
    let nextSongIndex = (currentSongIndex + 1) % songs.length;

    // Update the audio source to play the next song
    audio.src = `./asset/song${songs[nextSongIndex].id}.mp3`;

    // Play the new song
    audio.play();

    // Update the UI to show the new song is playing
    audio.currentTime = 0;
    playBtn.children[0].classList.remove('fa-play')
    playBtn.children[0].classList.add('fa-pause')
});