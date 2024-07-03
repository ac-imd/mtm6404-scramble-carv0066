function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

//Array of Words
const spaceWords = [
  "Cosmos",
  "Universe",
  "Galaxy",
  "Expanse",
  "Void",
  "Aether",
  "Sky",
  "Outerspace",
  "Celestial",
  "Astrosphere",
  "Milky Way",
  "Nebula",
  "Astral",
  "Starlit",
  "Cosmic",
  "Astronomical",
  "Interstellar"
];

//Storing all information from game in local storage
function MyGameInfo () {
  const [points, setPoints] = React.useState('');
  const [strikes, setStrikes] = React.useState('');
  const [passesRemaining, setPassesRemaining] = React.useState('');

}

function handleGameInfo () {
  localStorage.setItem('Points', points);
  localStorage.setItem('Strikes', strikes);
  localStorage.setItem('Passes Remaining', passesRemaining);
}


// Creating Points
function MyPoints({ points }) {
  return (
    <div className="points-container">
      <div className="points-content">
        <h3>{points}</h3>
        <p>POINTS</p>
      </div>
    </div>
  );
}

// Creating Strikes
function MyStrikes({ strikes }) {
  return (
    <div className="points-container">
      <div className="points-content">
        <h3>{strikes}</h3>
        <p>STRIKES</p>
      </div>
    </div>
  );
}

//Creating an input component
function MyWordInput({ onGuess }) {
  const [inputValue, setInputValue] = React.useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onGuess(inputValue.trim());
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="form"
        value={inputValue}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// Passes Remaining Component
function MyPassesRemaining({ passesRemaining }) {
  return (
    <div>
      <p>{passesRemaining} Passes Remaining</p>
    </div>
  );
}

// app.js
const App = () => {
  const [words, setWords] = React.useState([...spaceWords]);
  const [currentWord, setCurrentWord] = React.useState('');
  const [scrambledWord, setScrambledWord] = React.useState('');
  const [points, setPoints] = React.useState(0);
  const [strikes, setStrikes] = React.useState(0);
  const [passesRemaining, setPassesRemaining] = React.useState(3);
  const [gameOver, setGameOver] = React.useState(false);

    // Function to scramble a word
    const shuffleWord = (word) => {
      return shuffle(word);
    };

     //Scramble new word
  const scrambleNewWord = () => {
    if (words.length === 0) {
      setGameOver(true);
      return;
    }
    const randomIndex = Math.floor(Math.random() * words.length);
    const chosenWord = words[randomIndex];
    setCurrentWord(chosenWord);
    setScrambledWord(shuffleWord(chosenWord));
  };

    // Function to handle guess of words
    const handleGuessInput = (guess) => {
      if (guess.toLowerCase() === currentWord.toLowerCase()) {
        setPoints(points + 1);
        removeWord(currentWord);
        scrambleNewWord();
      } else {
        setStrikes(strikes + 1);
      }
    };

      // Function to handle passes button 
  const handlePasses = () => {
    if (passesRemaining > 0) {
      setPassesRemaining(passesRemaining - 1);
      scrambleNewWord();
    }
  };

   // Function to remove word from list after guessing or passing
  const removeWord = (wordToRemove) => {
    const updatedWords = words.filter(word => word !== wordToRemove);
    setWords(updatedWords);
  };

  // useEffect to start the game on initial render
  React.useEffect(() => {
    scrambleNewWord();
  }, []);

  return (
    <div>
      <div className="space-header">
        <h1>Welcome to Space Scramble!</h1>
        <p>This is a scramble game for people who like space!</p>
      </div>
      <div className="points-section">
        <MyPoints points={points} />
        <MyStrikes strikes={strikes} />
      </div>
      <div className="input-section">
        <p className="scrambled-word">{scrambledWord}</p>
        <MyWordInput onGuess={handleGuessInput} />
        <MyPassesRemaining passesRemaining={passesRemaining} />
      </div>
    </div>
  );
};

// Create React root and render the App component into the root div
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
