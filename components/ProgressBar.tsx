export const ProgressBar = (
  props: React.PropsWithChildren<{
    current: number;
    total: number;
  }>
) => {
  const percentage = (props.current / props.total) * 100;

  return (
    <div className="w-full bg-white rounded-full dark:bg-gray-700">
      <div
        className="text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
        style={{ width: `${percentage}%`, background: "#FFB803" }}
      >{`${percentage.toFixed(2)}%`}</div>
    </div>
  );
};
