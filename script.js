function playSound(soundFile) {
    var audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.src = soundFile;
    audioPlayer.play();
}