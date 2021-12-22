const Filter = ({ handleNewFilter }) => {
  return (
    <div>
      filter shown with <input onChange={handleNewFilter} />
    </div>
  );
};
export default Filter;
