let songs = [
    {
        songName: "MILLION DOLLAR BABY",
        songArtist: "Tommy Richman",
        cover: "million.png",
        duration: "2:35",
        src : "./music/million.mp3"
        
    },
    {
        songName: "bad",
        songArtist: "wave to earth",
        cover: "bad.png",
        duration: "4:32",
        src: "./music/bad.mp3"
    },
    {
        songName: "intro(end of the world)",
        songArtist: "Ariana Grande",
        cover: "ariana.png",
        duration: "1:32",
        src: "./music/intro.mp3"
    },
    {
        songName: "ILY",
        songArtist: "YB Neet, Bugoy na Koykoy",
        cover: "ily.png",
        duration: "2:59",
        src:"./music/ily.mp3"
    },
    {
        songName: "See You Again",
        songArtist: "Tyler, The Creator, Kali Uchis",
        cover: "see.png",
        duration: "3:00",
        src:"./music/see.mp3"
    },
    {
        songName: "Don't",
        songArtist: "Bryson Tiller",
        cover: "dont.png",
        duration: "3:18",
        src:"./music/dont.mp3"
    },
    {
        songName: "Nakauwi Na",
        songArtist: "Ang Bandang Shirley",
        cover: "nakauwi.png",
        duration: "5:28",
        src:"./music/nakauwi.mp3"
    }
];

// Define the order of song indices
let songOrder = [0, 1, 2, 3, 4, 5, 6];

let songContainer = document.querySelector(".songContainer");
let songTitle = document.querySelector(".songTitle");
let songArtist = document.querySelector(".songArtist");
let duration = document.querySelector(".time");
let songImg = document.querySelector(".songImg");

function displaySongs() {
    songOrder.forEach(index => {
        let song = songs[index];
        let songi = `
        <div class="song">
            <img class="songImg" src="${song.cover}" alt="" srcset="">
            <div class="sss">
                <div class="songTitleArtist">
                    <p class="songTitle">${song.songName}</p>
                    <p class="songArtist">${song.songArtist}</p>
                </div>
                <div class="time">
                    <p>${song.duration}</p>
                </div>
            </div>
        </div>`;
        songContainer.innerHTML += songi;
    });
}

displaySongs();

let musicTitle = document.querySelector(".musicTitle");
let musicArtist = document.querySelector(".musicArtist");
let musicImg = document.querySelector(".musicPlayercontainer img");
let songsElements = document.querySelectorAll(".song");
let musicContainer = document.querySelector(".musicContainer");

// Get the audio player
let audioPlayer = document.getElementById("audioPlayer");
let currentIndex = 0;


// Listen for the "ended" event on the audio element
audioPlayer.addEventListener("ended", function() {
    // Increment the index for the next song
    currentIndex = (currentIndex + 1) % songOrder.length;
    playSong(currentIndex);
});


let track = document.querySelector(".track");
let lastTime = document.querySelector(".last-time");
let totalTime = document.querySelector(".total-time");
let tracker = document.querySelector(".tracker");
// Update total time of audio
audioPlayer.addEventListener("loadedmetadata", function () {
    let totalMinutes = Math.floor(audioPlayer.duration / 60);
    let totalSeconds = Math.floor(audioPlayer.duration % 60);
    totalTime.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
    
});

// Seek functionality when the user interacts with the progress bar
track.addEventListener("input", function () {
    let seekTime = (audioPlayer.duration * track.value) / 100;
    audioPlayer.currentTime = seekTime;
});

// Update last time of audio and track progress
audioPlayer.addEventListener("timeupdate", function () {
    let currentMinutes = Math.floor(audioPlayer.currentTime / 60);
    let currentSeconds = Math.floor(audioPlayer.currentTime % 60);
    lastTime.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

    // Update progress bar value
    let progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    track.value = progress;
    tracker.style.width = progress + "%"; // Set width based on progress
});

// When the user clicks on the progress bar, seek to that position
track.addEventListener("click", function(event) {
    let clickPosition = event.offsetX / track.offsetWidth;
    audioPlayer.currentTime = clickPosition * audioPlayer.duration; 
});



function playSong(index) {
    let clickedSong = songs[songOrder[index]];
    
    // Update music player with the clicked song details
    musicTitle.textContent = clickedSong.songName;
    musicArtist.textContent = clickedSong.songArtist;
    musicImg.setAttribute("src", clickedSong.cover);
     
    let playBtn = document.getElementById("playBtn");
    
    // Set the source of the audio player to the next song and play it
    audioPlayer.src = clickedSong.src;
    if (audioPlayer.paused) {
        audioPlayer.play();
        playBtn.classList.remove("fa-play");
        playBtn.classList.add("fa-pause");
    } else {
        audioPlayer.pause();
        playBtn.classList.remove("fa-pause");
        playBtn.classList.add("fa-play");
    }

    // Remove "playing" class from all songs
    songsElements.forEach(function(song) {
        song.classList.remove("playing");
    });

    // Add "playing" class to the next song
    songsElements[index].classList.add("playing");

    // Apply background color based on the next song
    if (clickedSong.songName === "bad") {
        document.body.style.background = "radial-gradient(circle, rgba(123,130,136,1) 38%, rgba(155,163,164,1) 100%)";
    } else if (clickedSong.songName === "intro(end of the world)") {
        document.body.style.background = " radial-gradient(circle, rgba(168,133,27,1) 0%, rgba(27,23,23,1) 97%)";
    } else if (clickedSong.songName === "ILY") {
        document.body.style.background = " radial-gradient(circle, rgba(215,196,196,1) 0%, rgba(190,122,122,1) 56%, rgba(167,52,52,1) 78%, rgba(0,0,0,1) 100%)";
    } else if (clickedSong.songName === "See You Again") {
        document.body.style.background = " radial-gradient(circle, rgba(240,144,0,1) 0%, rgba(136,222,111,1) 100%)";
    } else if (clickedSong.songName === "Don't") {
        document.body.style.background = " radial-gradient(circle, rgba(120,118,115,1) 12%, rgba(17,18,17,1) 100%)";
    } else if (clickedSong.songName === "Nakauwi Na") {
        document.body.style.background = " radial-gradient(circle, rgba(38,139,208,1) 30%, rgba(82,209,94,1) 100%)";
    } else {
        // Reset background color if it's not the "bad" song
        document.body.style.background = "radial-gradient(circle, rgba(173,168,168,1) 8%, rgba(43,42,42,1) 62%)";
    }
    

    

    
}
 

let playBtn = document.querySelector(".fa-play");
let backwardBtn = document.querySelector(".fa-backward");
let forwardBtn = document.querySelector(".fa-forward");
let currentTime = 0;




songsElements.forEach(function(songElement) {
    songElement.addEventListener("click", function() {
        currentIndex = Array.from(songsElements).indexOf(songElement);
        playSong(currentIndex);
    });

    function playSong(index) {
        let clickedSong = songs[index];
        audioPlayer.src = clickedSong.src;
        audioPlayer.play();
        currentTime && (audioPlayer.currentTime = currentTime); // Set current time if it's stored
    }
    


    playBtn.addEventListener("click", function(){
        if (audioPlayer.paused) {
            playSong(currentIndex);
            playBtn.classList.remove("fa-play");
            playBtn.classList.add("fa-pause");
        } else {
            currentTime = audioPlayer.currentTime; // Store current time
            audioPlayer.pause();
            playBtn.classList.remove("fa-pause");
            playBtn.classList.add("fa-play");
        }
    });
});





// Forward button event listener
forwardBtn.addEventListener("click", function () {
    // Increment the index for the next song
    currentIndex = (currentIndex + 1) % songOrder.length;
    playSong(currentIndex);
});

// Backward button event listener
backwardBtn.addEventListener("click", function () {
    // Decrement the index for the previous song
    currentIndex = (currentIndex - 1 + songOrder.length) % songOrder.length;
    playSong(currentIndex);
});


// Song elements event listeners
songsElements.forEach(function(songElement) {
    songElement.addEventListener("click", function() {
        // Set current time to 0 when a song element is clicked
        currentTime = 0;
        currentIndex = Array.from(songsElements).indexOf(songElement);
        playSong(currentIndex);
    });
});


