const ResultsCount = ({ showing, total }) => (
  <div className="flex items-center justify-between py-2">
    <div className="text-sm text-gray-500 dark:text-gray-400">
      Showing <span className="...">{showing}</span> of{" "}
      <span className="...">{total}</span> complaints
    </div>
  </div>
);

export default ResultsCount;
