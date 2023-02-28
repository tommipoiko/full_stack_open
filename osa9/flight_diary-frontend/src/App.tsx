import { useEffect, useState } from "react";
import { Diary } from "./types";
import diaryService from './services/diaries';
import DiaryEntries from "./components/DiaryEntries";
import AddNewEntry from "./components/AddNewEntry";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    const fetchDiaryList = async () => {
      const response = await diaryService.getAll();
      setDiaries(response.data);
    };
    void fetchDiaryList();
  }, []);

  return (
    <div>
      <AddNewEntry diaryEntries={diaries} setDiaries={setDiaries}/>
      <DiaryEntries diaryEntries={diaries}/>
    </div>
  );
};

export default App;