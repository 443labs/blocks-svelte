// Optimized Node.js script to generate sound files for the Blocks Game
// Run with: node create-sounds.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ES modules context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration object for all sounds - centralized and easier to maintain
const SOUNDS_CONFIG = {
	move: {
		description: '# Simple move sound\n1000 200 0.2 sine\n',
		params: { frequency: 1000, duration: 0.2, waveform: 'sine' },
	},
	rotate: {
		description: '# Simple rotate sound\n1000 400 0.1 sine 800\n',
		params: { frequency: 1000, duration: 0.1, waveform: 'sine', secondaryFreq: 800 },
	},
	drop: {
		description: '# Simple drop sound\n880 110 0.3 triangle\n',
		params: { frequency: 880, duration: 0.3, waveform: 'triangle' },
	},
	clear: {
		description: '# Simple line clear sound\n500 800 0.4 square\n',
		params: { frequency: 500, duration: 0.4, waveform: 'square', secondaryFreq: 800 },
	},
	levelup: {
		description: '# Level up sound\n262 523 0.5 square\n',
		params: { frequency: 262, duration: 0.5, waveform: 'square', secondaryFreq: 523 },
	},
	gameover: {
		description: '# Game over sound\n523 220 1.0 sawtooth\n',
		params: { frequency: 523, duration: 1.0, waveform: 'sawtooth', secondaryFreq: 220 },
	},
	theme: {
		description: '# Peaceful ambient background music\n',
		params: { duration: 8.0, isTheme: true },
	},
};

// Sound generation utilities
const AudioUtils = {
	// Sample rate for all audio (44.1kHz standard)
	SAMPLE_RATE: 44100,

	// Generate simple sound based on parameters
	generateBasicSound(params) {
		const { frequency, duration, waveform, secondaryFreq } = params;
		const bufferSize = Math.floor(this.SAMPLE_RATE * duration);
		const buffer = new Float32Array(bufferSize);

		// Simple envelope for smoother sound
		const attack = Math.min(0.1, duration / 4);
		const release = Math.min(0.1, duration / 4);

		for (let i = 0; i < bufferSize; i++) {
			const t = i / this.SAMPLE_RATE;

			// Apply envelope
			let envelope = 1.0;
			if (t < attack) {
				envelope = t / attack; // Attack phase
			} else if (t > duration - release) {
				envelope = (duration - t) / release; // Release phase
			}

			// Generate primary waveform
			let sample = this.generateWaveform(waveform, frequency, t);

			// Add secondary frequency if specified
			if (secondaryFreq) {
				sample += 0.5 * this.generateWaveform(waveform, secondaryFreq, t);
			}

			buffer[i] = sample * envelope * 0.7; // Prevent clipping
		}

		return buffer;
	},

	// Waveform generator
	generateWaveform(type, frequency, t) {
		switch (type) {
			case 'sine':
				return Math.sin(2 * Math.PI * frequency * t);
			case 'square':
				return Math.sign(Math.sin(2 * Math.PI * frequency * t));
			case 'sawtooth':
				return 2 * (t * frequency - Math.floor(0.5 + t * frequency));
			case 'triangle':
				return Math.abs(((t * frequency * 4) % 4) - 2) - 1;
			default:
				return Math.sin(2 * Math.PI * frequency * t); // Default to sine
		}
	},

	// Generate theme music
	generateThemeMusic(duration = 8) {
		const bufferSize = this.SAMPLE_RATE * duration;
		const buffer = new Float32Array(bufferSize);

		// For a peaceful ambient sound - use pentatonic scale for harmonious sound
		const baseFrequency = 220; // A3
		const pentatonic = [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3];

		// Chord progression - each lasting 2 seconds
		const chords = [
			[0, 2, 4], // A minor pentatonic
			[1, 3, 0], // B minor-ish pentatonic
			[2, 4, 1], // C major-ish pentatonic
			[3, 0, 2], // D pentatonic
		];

		// ADSR envelope parameters
		const attack = 0.2;
		const decay = 0.3;
		const sustain = 0.6;
		const release = 0.5;

		// Fill buffer with peaceful ambient sounds
		for (let i = 0; i < bufferSize; i++) {
			const time = i / this.SAMPLE_RATE;
			const chordIndex = Math.floor((time % duration) / 2) % chords.length;
			const chord = chords[chordIndex];

			// Calculate envelope for smooth transitions
			let envelope = 0;
			const chordTime = time % 2; // 2 seconds per chord

			if (chordTime < attack) {
				envelope = chordTime / attack;
			} else if (chordTime < attack + decay) {
				envelope = 1.0 - (1.0 - sustain) * ((chordTime - attack) / decay);
			} else if (chordTime < 2 - release) {
				envelope = sustain;
			} else {
				envelope = sustain * (1 - (chordTime - (2 - release)) / release);
			}

			// Mix the chord tones with some slow vibrato for peaceful effect
			let sample = 0;
			for (let j = 0; j < chord.length; j++) {
				const freqMultiplier = pentatonic[chord[j]];
				const frequency = baseFrequency * freqMultiplier;

				// Add slight vibrato for peaceful sound
				const vibrato = 1 + 0.005 * Math.sin(2 * Math.PI * 3 * time);

				// Use sine waves for smoother sound
				sample += 0.2 * Math.sin(2 * Math.PI * frequency * vibrato * time);

				// Add harmonics very quietly for richness
				sample += 0.05 * Math.sin(2 * Math.PI * frequency * 2 * vibrato * time);
			}

			// Apply envelope and add to buffer
			buffer[i] = sample * envelope * 0.3; // Overall volume reduction for peaceful effect
		}

		return buffer;
	},

	// Create WAV file data from audio buffer
	encodeWAV(buffer) {
		const arrayBuffer = new ArrayBuffer(44 + buffer.length * 2);
		const view = new DataView(arrayBuffer);

		// Write WAV header
		const writeString = (offset, string) => {
			for (let i = 0; i < string.length; i++) {
				view.setUint8(offset + i, string.charCodeAt(i));
			}
		};

		// RIFF identifier and chunk
		writeString(0, 'RIFF');
		view.setUint32(4, 36 + buffer.length * 2, true);
		writeString(8, 'WAVE');

		// Format chunk
		writeString(12, 'fmt ');
		view.setUint32(16, 16, true); // Chunk size
		view.setUint16(20, 1, true); // Format (1 = PCM)
		view.setUint16(22, 1, true); // Channels (1 = mono)
		view.setUint32(24, this.SAMPLE_RATE, true); // Sample rate
		view.setUint32(28, this.SAMPLE_RATE * 2, true); // Byte rate
		view.setUint16(32, 2, true); // Block align
		view.setUint16(34, 16, true); // Bits per sample

		// Data chunk
		writeString(36, 'data');
		view.setUint32(40, buffer.length * 2, true);

		// Write audio data
		for (let i = 0; i < buffer.length; i++) {
			const sample = Math.max(-1, Math.min(1, buffer[i]));
			view.setInt16(44 + i * 2, sample * 32767, true);
		}

		return Buffer.from(arrayBuffer);
	},
};

// File System utilities
const FileUtils = {
	// Create text file
	writeTextFile(filename, content) {
		fs.writeFileSync(path.join(__dirname, filename), content, 'utf8');
		console.log(`Created ${filename}`);
	},

	// Create WAV sound file
	createSoundFile(name, params) {
		let buffer;

		if (params.isTheme) {
			buffer = AudioUtils.generateThemeMusic(params.duration);
		} else {
			buffer = AudioUtils.generateBasicSound(params);
		}

		const wavData = AudioUtils.encodeWAV(buffer);
		fs.writeFileSync(path.join(__dirname, `${name}.wav`), wavData);
		console.log(`Created ${name}.wav`);
	},

	// Create README file
	createReadme() {
		const content = `# Blocks Game Sound Effects

This directory contains the following sound files used by the game:

${Object.keys(SOUNDS_CONFIG)
	.map((sound) => `- ${sound}.wav - ${this.getSoundDescription(sound)}`)
	.join('\n')}

## Creating Your Own Sounds

You can create your own sound files by:

1. Use the 'generate-sounds.html' file in this directory to generate and download WAV files
2. Replace any of the files above with your own WAV files
3. Ensure the filenames match exactly what the game expects

Remember to keep the file sizes small for better performance.
`;

		this.writeTextFile('README.md', content);
	},

	// Get user-friendly sound descriptions for README
	getSoundDescription(sound) {
		const descriptions = {
			move: 'Played when a piece is moved left/right',
			rotate: 'Played when a piece is rotated',
			drop: 'Played when a piece is hard-dropped or placed',
			clear: 'Played when lines are cleared',
			levelup: 'Played when level increases',
			gameover: 'Played when the game is over',
			theme: 'Theme music played during gameplay',
		};

		return descriptions[sound] || '';
	},
};

// Main execution
async function main() {
	console.log('Generating sound files for Blocks Game...');

	try {
		// Create all sound text description files
		Object.entries(SOUNDS_CONFIG).forEach(([name, config]) => {
			FileUtils.writeTextFile(`${name}.txt`, config.description);
		});

		// Create README file
		FileUtils.createReadme();

		// Create all sound WAV files
		Object.entries(SOUNDS_CONFIG).forEach(([name, config]) => {
			FileUtils.createSoundFile(name, config.params);
		});

		console.log('\nSound files created successfully!');
		console.log('\nNow open the generate-sounds.html file in your browser to create proper sound files if needed.');
	} catch (error) {
		console.error('Error generating sound files:', error);
	}
}

// Execute the script
main();
