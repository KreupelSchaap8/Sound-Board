const hardcodedSounds = [
    { name: "a few moments later", src: "sounds/a-few-moments-later.mp3" },
    { name: "Huh", src: "sounds/Huh.mp3" },
    { name: "Punch", src: "sounds/punch.mp3" },
    { name: "Ooff", src: "sounds/Minecraft-Damage-Oof.mp3" },
    { name: "bruh", src: "sounds/bruh.mp3" },
    { name: "fart", src: "sounds/bankzitters-fart.mp3" },
    { name: "WOW", src: "sounds/Anime-WOW-Sound-Effect.mp3" }, 
    { name: "Error", src: "sounds/error.mp3" }, 
    { name: "running", src: "sounds/Cartoon-Running.mp3" },
    { name: "Crowd aww", src: "sounds/Crowd-Aww.mp3" },
    { name: "Emotional damage", src: "sounds/Emotional-Damage-Sound-Effect.mp3" },
    { name: "Sad violin", src: "sounds/sad-violin.mp3" },
    { name: "Apologies", src: "sounds/Apologies.mp3" },
    { name: "Boom", src: "sounds/Vine-boom.mp3" },
    { name: "Herinnering", src: "sounds/Voicy_Herinnering Aan.mp3" },
    { name: "Chapeau", src: "sounds/Voicy_Dus Chapeau.mp3" },
    { name: "Koekje", src: "sounds/watisdezekoekje.mp3" },
    { name: "Alarm", src: "sounds/alarm.mp3" },
    { name: "Joehoe", src: "sounds/joehoe.mp3" },
    { name: "Allemaal onvoldoende", src: "sounds/allemaal_onvoldoende.mp3" },
];
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.currentTime = 0; // Reset audio to start
    sound.play();
}
function saveSounds(sounds) {
    localStorage.setItem("soundboard", JSON.stringify(sounds));
}
function loadSounds() {
    const savedSounds = JSON.parse(localStorage.getItem("soundboard")) || [];
    savedSounds.forEach(({ name, base64 }) => {
        addSoundToBoard(name, base64, false);
    });
}
function removeSound(name) {
    let savedSounds = JSON.parse(localStorage.getItem("soundboard")) || [];
    savedSounds = savedSounds.filter(sound => sound.name !== name);
    saveSounds(savedSounds);
    document.getElementById(`btn-${name.replace(/\s+/g, '-')}`).remove();
    document.getElementById(`sound-${name.replace(/\s+/g, '-')}`).remove();
}
function addSoundToBoard(name, src, save = true, isDefault = false) {
    const soundId = `sound-${name.replace(/\s+/g, '-')}`;
    
    let soundElement = document.createElement("audio");
    soundElement.id = soundId;
    soundElement.src = src;
    document.body.appendChild(soundElement);

    const buttonContainer = document.createElement("div");
    buttonContainer.id = `btn-${name.replace(/\s+/g, '-')}`;

    const button = document.createElement("button");
    button.className = "sound-button";
    button.textContent = name;
    button.onclick = () => playSound(soundId);
    
    buttonContainer.appendChild(button);
    
    if (!isDefault) {
        const removeButton = document.createElement("button");
        removeButton.className = "remove-btn";
        removeButton.textContent = "X";
        removeButton.onclick = () => removeSound(name);
        buttonContainer.appendChild(removeButton);
    }
    
    document.getElementById(isDefault ? "defaultSoundboard" : "soundboard").appendChild(buttonContainer);

    if (save) {
        const savedSounds = JSON.parse(localStorage.getItem("soundboard")) || [];
        savedSounds.push({ name, base64: src });
        saveSounds(savedSounds);
    }
}
function addSound() {
    const soundName = document.getElementById("soundName").value;
    const soundFile = document.getElementById("soundFile").files[0];

    if (!soundName || !soundFile) {
        alert("Please enter a sound name and select a file.");
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(soundFile);
    reader.onload = function(event) {
        addSoundToBoard(soundName, event.target.result);
    };
}
document.addEventListener("DOMContentLoaded", () => {
    hardcodedSounds.forEach(({ name, src }) => {
        addSoundToBoard(name, src, false, true);
    });
    loadSounds();
});