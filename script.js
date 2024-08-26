const song  = [
    {
        songname:'Aaj Ki Raat',
        url:'./songs/Aaj Ki Raat _ Stree 2.mp3',
        img:'./img/Aaj-Ki-Raat-Song-Stree-2.jpg',
        length:'3:02'
    },
    {
        songname:'Hanumankind-Big Dawgs',
        url:'./songs/Hanumankind-Big Dawgs.mp3',
        img:'./img/Hanumankind-Big Dawgs.jpg',
        length:'3:54'
    },
    {
        songname:'chuwa tune mere Dil ko',
        url:'./songs/chuwa tune mere Dil ko aag lagadi.mp3',
        img:'./img/chuwa tune mere Dil ko aag lagadi.jpg',
        length:'4:35'
    },
    {
        songname:'PAISA - Seven Hundred Fifty',
        url:'./songs/PAISA - Seven Hundred Fifty.mp3',
        img:'./img/PAISA - Seven Hundred Fifty.jpg',
        length:'3:02'
    },
    {
        songname:'Tumhare Hi Rahenge Hum',
        url:'./songs/Tumhare Hi Rahenge Hum -Stree2.mp3',
        img:'./img/Tumhare Hi Rahenge Hum -Stree2.jpg',
        length:'3:08'
    },
]


const allSongs = document.querySelector('.all-songs')
const poster = document.querySelector('.left')
const player = document.querySelector('.player')
const duration = document.getElementById('duration');

let audio = new Audio()
let selectedSong = 0
let isPlaying = false

const renderSong = ()=>{
    let songs =''
    song.forEach((elem, index)=>{
    songs += `
                <div id=${index} class="song-card">
                    <div class="part1">
                        <img src='${elem.img}' alt="">
                        <h2>${elem.songname}</h2>
                    </div>
                    <h6>${elem.length}</h6>
                </div>
    `
    })
    allSongs.innerHTML= songs 
    poster.style.backgroundImage=`url('${song[selectedSong].img}')` 

}
renderSong()

const selected = ()=>{
    audio.src = song[selectedSong].url
    poster.style.backgroundImage=`url('${song[selectedSong].img}')`
}

allSongs.addEventListener('click',(elem)=>{
    selectedSong=parseInt(elem.target.id)
    selected()
    audio.play()
    document.querySelector('.play').innerHTML=`<i class="ri-pause-line"></i>`
    isPlaying=true
})


player.addEventListener('click',(event)=>{
    if(event.target.classList.contains('play')){
        if(!isPlaying){
            document.querySelector('.play').innerHTML=`<i class="ri-pause-line"></i>` 
            selected()
            audio.play()
            isPlaying=true
        }
        else{
            document.querySelector('.play').innerHTML=`<i class="ri-play-fill"></i></i>`
            audio.pause()
            isPlaying=false   
        }      
        
    }
    if(event.target.classList.contains('backward')){
        document.querySelector('.play').innerHTML=`<i class="ri-pause-line"></i>`
        selectedSong = (selectedSong - 1 + song.length) % song.length;
        selected()
        audio.play()
        isPlaying=true
        
    }
    if(event.target.classList.contains('forward')){
        document.querySelector('.play').innerHTML=`<i class="ri-pause-line"></i>`
        selectedSong = (selectedSong + 1) % song.length
        selected()
        audio.play()
        isPlaying=true
    }
}) 



const progressBar = document.getElementById('progress-bar');

// Function to update progress bar
const updateProgressBar = () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
    duration.innerText = currentTime()
};

// Function to seek audio when clicking on the progress bar
const seekAudio = (event) => {
    const progressContainer = document.querySelector('.progress-container');
    const offsetX = event.offsetX;
    const totalWidth = progressContainer.clientWidth;
    const seekTime = (offsetX / totalWidth) * audio.duration;
    audio.currentTime = seekTime;
};

// Event listeners for progress bar
audio.addEventListener('timeupdate', updateProgressBar);
document.querySelector('.progress-container').addEventListener('click', seekAudio);



const currentTime =()=>{
    const currentTime = audio.currentTime; // This gives the time in seconds

const minutes = Math.floor(currentTime / 60); // Get the whole number of minutes
const seconds = Math.floor(currentTime % 60); // Get the remainder in seconds

// Format the time to display as "minutes:seconds"
const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
return formattedTime;
}

