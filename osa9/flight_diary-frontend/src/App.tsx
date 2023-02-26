import { useEffect, useState } from "react";
import { Diary } from "./types";
import diaryService from './services/diaries';
import DiaryEntries from "./components/DiaryEntries";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    const fetchPatientList = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
    void fetchPatientList();
  }, []);

  return (
    <div>
      <DiaryEntries diaryEntries={diaries}/>
    </div>
  );
};

export default App;