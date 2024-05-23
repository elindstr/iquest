import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTriviaApiInputs } from '../actions/actions';

const QuizSettings = () => {
    const dispatch = useDispatch();
    const apiInputs = useSelector((state) => state.game.apiInputs);
    const [settings, setSettings] = useState(apiInputs);
  
    useEffect(() => {
      dispatch(setTriviaApiInputs(settings));
    }, [settings, dispatch]);

    const categories = [
        { value: 'any', label: 'Any Category' },
        { value: '9', label: 'General Knowledge' },
        { value: '10', label: 'Entertainment: Books' },
        { value: '11', label: 'Entertainment: Film' },
        { value: '12', label: 'Entertainment: Music' },
        { value: '13', label: 'Entertainment: Musicals & Theatres' },
        { value: '14', label: 'Entertainment: Television' },
        { value: '15', label: 'Entertainment: Video Games' },
        { value: '16', label: 'Entertainment: Board Games' },
        { value: '17', label: 'Science & Nature' },
        { value: '18', label: 'Science: Computers' },
        { value: '19', label: 'Science: Mathematics' },
        { value: '20', label: 'Mythology' },
        { value: '21', label: 'Sports' },
        { value: '22', label: 'Geography' },
        { value: '23', label: 'History' },
        { value: '24', label: 'Politics' },
        { value: '25', label: 'Art' },
        { value: '26', label: 'Celebrities' },
        { value: '27', label: 'Animals' },
        { value: '28', label: 'Vehicles' },
        { value: '29', label: 'Entertainment: Comics' },
        { value: '30', label: 'Science: Gadgets' },
        { value: '31', label: 'Entertainment: Japanese Anime & Manga' },
        { value: '32', label: 'Entertainment: Cartoon & Animations' }
    ];

    const difficulties = [
        { value: 'any', label: 'Any Difficulty' },
        { value: 'easy', label: 'Easy' },
        { value: 'medium', label: 'Medium' },
        { value: 'hard', label: 'Hard' }
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSettings((prevSettings) => ({
          ...prevSettings,
          [name]: value
        }));
      };

  return (
    <div>
      <div>
        <label>
          Number of Questions:
          <input
            type="number"
            name="amount"
            value={settings.amount}
            min="1"
            max="50"
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label>
          Category:
          <select name="category" value={settings.category} onChange={handleChange}>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Difficulty:
          <select name="difficulty" value={settings.difficulty} onChange={handleChange}>
            {difficulties.map((difficulty) => (
              <option key={difficulty.value} value={difficulty.value}>
                {difficulty.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default QuizSettings;
