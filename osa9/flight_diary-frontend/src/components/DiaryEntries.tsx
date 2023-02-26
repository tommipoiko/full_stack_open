import { Diary } from "../types";

const DiaryEntries = ({diaryEntries}: {diaryEntries: Diary[]}) => {
  return (
    <div>
      <h1>Diary entries</h1>
      {diaryEntries.map(d => {
        return (
          <div key={d.id}>
            <b>{d.date}</b>
            <p>visibility: {d.visibility}</p>
            <p>weather: {d.weather}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DiaryEntries;