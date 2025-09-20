
const soundUrls = {
  click: 'https://cdn.jsdelivr.net/gh/dev-kasun/button-click-sound-effect/click.mp3',
  correct: 'https://actions.google.com/sounds/v1/positive/success.ogg',
  incorrect: 'https://actions.google.com/sounds/v1/negative/failure.ogg',
  win: 'https://actions.google.com/sounds/v1/cartoon/magic_chime.ogg',
};

type SoundName = keyof typeof soundUrls;

// A cache to hold the created Audio elements
const audioCache: Partial<Record<SoundName, HTMLAudioElement>> = {};

/**
 * Creates and preloads an HTMLAudioElement.
 * @param src The source URL of the audio file.
 * @returns The created HTMLAudioElement.
 */
const createAudio = (src: string): HTMLAudioElement => {
  const audio = new Audio(src);
  audio.preload = 'auto';
  audio.load();
  return audio;
};

// Pre-load all sounds into the cache when the module is loaded.
// This helps prevent delays when the sound is first played.
(Object.keys(soundUrls) as SoundName[]).forEach(name => {
  audioCache[name] = createAudio(soundUrls[name]);
});

/**
 * Plays a sound from the pre-loaded cache.
 * @param soundName The name of the sound to play.
 */
export const playSound = (soundName: SoundName) => {
  const sound = audioCache[soundName];
  if (sound) {
    // Resetting currentTime allows the sound to be played again quickly,
    // even if it's already playing.
    sound.currentTime = 0;
    sound.play().catch(error => {
      // Autoplay is often restricted by browsers until the user interacts with the page.
      // This is usually not an issue here since sounds are triggered by user actions.
      console.error(`Error playing sound "${soundName}":`, error);
    });
  }
};
