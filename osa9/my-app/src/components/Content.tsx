interface ContentProps {
  name: string;
  exerciseCount: number;
}

const Content = ({ courseParts }: { courseParts: ContentProps[] }) => {
  return (
    <div>
      {courseParts.map(c => {
        return <p key={c.name}>{c.name} {c.exerciseCount}</p>
      })}
    </div>
  );
};

export default Content;