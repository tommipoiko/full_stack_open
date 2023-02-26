interface TotalProps {
  amount: number;
}

const Total = (props: TotalProps) => {
  return (
    <div>
      <p>
        Number of exercises {props.amount}
      </p>
    </div>
  );
};

export default Total;