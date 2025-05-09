const ResultsCount = ({ showing, total }) => (
  <div className="flex lg:items-center lg:justify-between text-start py-2">
    <div className="text-sm text-text_color dark:text-gray-400">
      Showing <span className="...">{showing}</span> of{" "}
      <span className="...">{total}</span> complaints
    </div>
  </div>
);

export default ResultsCount;
