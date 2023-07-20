import { useState, useEffect } from 'react';

import icon from '../src/assets/play.png';
import './App.css';

function App() {
	const [speechText, setSpeechText] = useState('');
	const [voiceSelect, setVoiceSelect] = useState('');
	const [voices, setVoices] = useState([]);
	const [filteredVoices, setFilteredVoices] = useState([]);

	// Add your custom voice names here
	const customVoiceList = [
		'Daniel',
		'Rocko (English (US))',
		'Rocko (English (UK))',
		'Samantha',
		'Google US English',
		'Google UK English Female',
		'Google UK English Male',
		'Google Nederlands',
		'Google español',
		'Tessa',
		'Zarvox',
	];
	const limit = customVoiceList.length;

	// Adjust parameters
	const [voiceRate, setVoiceRate] = useState(0.8);
	const [voiceVolume, setVoiceVolume] = useState(0.8);
	const [voicePitch, setVoicePitch] = useState(1.2);

	const handleListen = () => {
		const speech = new SpeechSynthesisUtterance();
		speech.text = speechText;
		speech.voice = voices.find((voice) => voice.name === voiceSelect);
		speech.rate = voiceRate; // Adjust the rate (0.5 to 1.5)
		speech.volume = voiceVolume; // Adjust the volume (0.0 to 1.0)
		speech.pitch = voicePitch; // Adjust the pitch (0.0 to 2.0)
		window.speechSynthesis.speak(speech);
	};

	useEffect(() => {
		const fetchVoices = () => {
			const allVoices = window.speechSynthesis.getVoices();
			setVoices(allVoices);
		};

		// Fetch voices when the component mounts
		fetchVoices();

		// Listen for the 'voiceschanged' event to update the voices
		window.speechSynthesis.addEventListener('voiceschanged', fetchVoices);

		// Clean up the event listener when the component unmounts
		return () => {
			window.speechSynthesis.removeEventListener('voiceschanged', fetchVoices);
		};
	}, []);

	useEffect(() => {
		// Apply the filter to limit the displayed voices to the custom list
		const filtered = voices
			.filter((voice) => customVoiceList.includes(voice.name))
			.slice(0, limit);
		setFilteredVoices(filtered);
		setVoiceSelect(filtered[0]?.name || '');
	}, [voices, limit]);

	const handleChange = (event) => {
		setSpeechText(event.target.value);
	};

	const handleVoiceChange = (event) => {
		setVoiceSelect(event.target.value);
	};

	const handleVoiceRate = (event) => {
		setVoiceRate(event.target.value);
	};

	const handleVoiceVolume = (event) => {
		setVoiceVolume(event.target.value);
	};

	const handleVoicePitch = (event) => {
		setVoicePitch(event.target.value);
	};

	return (
		<div className="hero">
			<h1>
				Text To Speech <span>Converter</span>
			</h1>
			<textarea
				onChange={handleChange}
				placeholder="Write something here..."
			></textarea>
			<div className="row-container-2">
				<span>VOICE:</span>
				<label>
					Rate:
					<select
						id="voice-rate"
						name="voiceRate"
						onChange={handleVoiceRate}
						value={voiceRate}
					>
						<option value="0.4">0.4</option>
						<option value="0.5">0.5</option>
						<option value="0.6">0.6</option>
						<option value="0.7">0.7</option>
						<option value="0.8">0.8</option>
						<option value="0.9">0.9</option>
						<option value="1">1</option>
						<option value="1.1">1.1</option>
						<option value="1.2">1.2</option>
					</select>
				</label>
				<label>
					Volume:
					<select
						id="voice-volume"
						name="voiceVolume"
						onChange={handleVoiceVolume}
						value={voiceVolume}
					>
						<option value="0.4">0.4</option>
						<option value="0.5">0.5</option>
						<option value="0.6">0.6</option>
						<option value="0.7">0.7</option>
						<option value="0.8">0.8</option>
						<option value="0.9">0.9</option>
						<option value="1">1</option>
					</select>
				</label>
				<label>
					Pitch:
					<select
						id="voice-pitch"
						name="voicePitch"
						onChange={handleVoicePitch}
						value={voicePitch}
					>
						<option value="0">0</option>
						<option value="0.2">0.2</option>
						<option value="0.4">0.4</option>
						<option value="0.6">0.6</option>
						<option value="0.8">0.8</option>
						<option value="1">1</option>
						<option value="1.2">1.2</option>
						<option value="1.4">1.4</option>
						<option value="1.6">1.6</option>
						<option value="1.8">1.8</option>
						<option value="2">2</option>
					</select>
				</label>
			</div>
			<div className="row-container">
				<select
					className="voice-selector"
					value={voiceSelect}
					onChange={handleVoiceChange}
				>
					{filteredVoices.map((voice, i) => (
						<option key={i} value={voice.name}>
							{voice.name}
						</option>
					))}
				</select>
				<button className="btn-listen" onClick={handleListen}>
					<img src={icon} alt="Play" />
					Listen
				</button>
			</div>
		</div>
	);
}

export default App;
