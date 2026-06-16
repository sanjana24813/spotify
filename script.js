let play=document.getElementById('play');
let progressBar= document.getElementById('progressBar');
let audio=new Audio('audio/1.mp3');
let currentSong=1;

play.addEventListener('click', () => {
 if(audio.paused || audio.currentTime == 0){
    audio.play();
    play.classList.remove('fa-circle-play');
    play.classList.add('fa-circle-pause');
 } else{
    audio.pause();
     play.classList.remove('fa-circle-pause');
    play.classList.add('fa-circle-play');

 }

});

audio.addEventListener('timeupdate', () =>{
    let progress=(audio.currentTime/audio.duration)*100;
    progressBar.value=progress;
    progressBar.style.background=`linear-gradient(to right, #177200ff ${progress}%, #333 ${progress}%)`;


})


progressBar.addEventListener('input', function (){

    let value =this.value;
    this.style.background=`linear-gradient(to right, #177200ff ${value}%, #333 ${value}%)`;
    audio.currentTime=(progressBar.value* audio.duration) / 100;


});

let playmusic=Array.from(document.getElementsByClassName('playmusic'));

makeAllPlay=() => {
    playmusic.forEach((element) => {
         element.classList.remove('fa-circle-pause');
         element.classList.add('fa-circle-play');

    })
}

playmusic.forEach((element) => {
    element.addEventListener('click',(e) =>{
        makeAllPlay();
        e.target.classList.remove('fa-circle-play');
         e.target.classList.add('fa-circle-pause');
         play.classList.remove('fa-circle-play');
         play.classList.add('fa-circle-pause')


         index= parseInt(e.target.id);
        currentSong=index;
         
         audio.src=`audio/${index}.mp3`;
         audio.currentTime=0;
         audio.play();
         updateNavBar();

    });

});


let allMusic = Array.from(document.getElementsByClassName('music-card'));

songs = [
    { songName: 'Song 1', songDes: 'This is the description for song 1', songImage: 'Images/1.jpg', songPath: 'Audio/1.mp3' },
    { songName: 'Song 2', songDes: 'This is the description for song 2', songImage: 'Images/2.jpg', songPath: 'Audio/2.mp3' },
    { songName: 'Song 3', songDes: 'This is the description for song 3', songImage: 'Images/3.jpg', songPath: 'Audio/3.mp3' },
    { songName: 'Song 4', songDes: 'This is the description for song 4', songImage: 'Images/4.jpg', songPath: 'Audio/4.mp3' },
    { songName: 'Song 5', songDes: 'This is the description for song 5', songImage: 'Images/5.jpg', songPath: 'Audio/5.mp3' },
    { songName: 'Song 6', songDes: 'This is the description for song 6', songImage: 'Images/6.jpg', songPath: 'Audio/6.mp3' },
    { songName: 'Song 7', songDes: 'This is the description for song 7', songImage: 'Images/7.jpg', songPath: 'Audio/7.mp3' },
    { songName: 'Song 8', songDes: 'This is the description for song 8', songImage: 'Images/8.jpg', songPath: 'Audio/8.mp3' },
    { songName: 'Song 9', songDes: 'This is the description for song 9', songImage: 'Images/9.jpg', songPath: 'Audio/9.mp3' },
    { songName: 'Song 10', songDes: 'This is the description for song 10', songImage: 'Images/10.jpg', songPath: 'Audio/10.mp3' },
    { songName: 'Song 11', songDes: 'This is the description for song 11', songImage: 'Images/11.jpg', songPath: 'Audio/11.mp3' },
    { songName: 'Song 12', songDes: 'This is the description for song 12', songImage: 'Images/12.jpg', songPath: 'Audio/12.mp3' },
    { songName: 'Song 13', songDes: 'This is the description for song 13', songImage: 'Images/13.jpg', songPath: 'Audio/13.mp3' },
    { songName: 'Song 14', songDes: 'This is the description for song 14', songImage: 'Images/14.jpg', songPath: 'Audio/14.mp3' },
    { songName: 'Song 15', songDes: 'This is the description for song 15', songImage: 'Images/15.jpg', songPath: 'Audio/15.mp3' },
]



allMusic.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].songImage;
    element.getElementsByClassName('img-title')[0].innerText = songs[i].songName;
    element.getElementsByClassName('img-description')[0].innerText = songs[i].songDes;
});

let shuffle = document.getElementById('shuffle');
let repeat = document.getElementById('repeat');
let navBar = document.querySelector('.nav-bar');

let songOnRepeat = false;
let songOnShuffle = false;

let order = songs;

function shuffleSongs(originalOrder) {
    let order = [...originalOrder];

    for (let i = order.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
    }

    return order;
}

shuffle.addEventListener('click', () => {
    if (!songOnShuffle) {
        songOnShuffle = true;
        songOnRepeat = false;

        shuffle.classList.add('active');
        repeat.classList.remove('active');

        order = shuffleSongs(songs);
    } else {
        songOnShuffle = false;

        shuffle.classList.remove('active');

        order = songs;
    }
});

repeat.addEventListener('click', () => {
    if (!songOnRepeat) {
        songOnRepeat = true;
        songOnShuffle = false;

        repeat.classList.add('active');
        shuffle.classList.remove('active');
    } else {
        songOnRepeat = false;

        repeat.classList.remove('active');
    }
});

playNextSong = () => {
    if(!songOnRepeat){
        let nextSong = (currentSong + 1) % playmusic.length;
        currentSong = nextSong == 0 ? 18 : nextSong;
    
        audio.src = order[currentSong-1].songPath;
        audio.currentTime = 0;
        audio.play();
        updateNavBar();
    } else {
        audio.src = order[currentSong-1].songPath;
        audio.currentTime = 0;
        audio.play();
        updateNavBar();
    }
}



playPrevSong = () => {
    let prevSong = (currentSong - 1);
    currentSong = prevSong == 0 ? 18 : prevSong;
    audio.src = `Audio/${currentSong}.mp3`;
    audio.currentTime = 0;
    audio.play();
    updateNavBar();
}

function updateNavBar() {
    const song = order[currentSong - 1];

    if (!song || !navBar) return;

    const img = navBar.querySelector('img');
    const title = navBar.querySelector('.img-title-info');
    const desc = navBar.querySelector('.img-des-info');

    if (img) img.src = song.songImage;
    if (title) title.innerText = song.songName;
    if (desc) desc.innerText = song.songDes;
}

forward=document.getElementById('forward');
backward=document.getElementById('backward');

forward.addEventListener('click',() =>{
    playNextSong();
})

audio.addEventListener('ended', () => {
    playNextSong();
})

backward.addEventListener('click',() =>{
    playPrevSong();
})

function openSong(id){
    window.location.href=`song.html?id=${id}`;
}


