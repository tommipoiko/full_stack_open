
import ErrorMessage from "./ErrorMessage";
import { SyntheticEvent, useState } from "react";
import { Diary } from "../types";
import diaryService from "../services/diaries";
import axios from "axios";

const AddNewEntry = ({diaryEntries, setDiaries}: {diaryEntries: Diary[], setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>}) => {
  const d = new Date()
  const [date, setDate] = useState(d.toISOString().split('T')[0])
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const clear = () => {
    setComment('')
  }

  const addDiary = async (event: SyntheticEvent) => {
    event?.preventDefault()
    const newDiary = {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment
    }
    try {
      const newD = await diaryService.createDiary(newDiary)
      setDiaries(diaryEntries.concat(newD))
      clear()
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          setErrorMessage(message);
        } else {
          setErrorMessage("Unrecognized axios error");
        }
      } else {
        setErrorMessage("Unknown error");
      }
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
  }

  return (
    <div>
      <h1>Add new entry</h1>
      <ErrorMessage errorMessage={errorMessage} />
      <form onSubmit={addDiary}>
        <div>
          date: 
          <input type="date" id="flightDate" name="flightDate"
            value={date} onChange={(e) => setDate(e?.target.value)} />
        </div>
        <div>
          visibility: great
          <input type="radio" name="visibility"
            onChange={() => setVisibility('great')} />
          good
          <input type="radio" name="visibility"
            onChange={() => setVisibility('good')} />
          ok
          <input type="radio" name="visibility"
            onChange={() => setVisibility('ok')}/>
          poor
          <input type="radio" name="visibility"
            onChange={() => setVisibility('poor')} />
        </div>
        <div>
          weather: sunny
          <input type="radio" name="weather"
            onChange={() => setWeather('sunny')} />
          rainy
          <input type="radio" name="weather"
            onChange={() => setWeather('rainy')} />
          cloudy
          <input type="radio" name="weather"
            onChange={() => setWeather('cloudy')}/>
          stormy
          <input type="radio" name="weather"
            onChange={() => setWeather('stormy')} />
          windy
          <input type="radio" name="weather"
            onChange={() => setWeather('windy')} />
        </div>
        <div>
          comment:
          <input type="text" name="comment"
            value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewEntry;