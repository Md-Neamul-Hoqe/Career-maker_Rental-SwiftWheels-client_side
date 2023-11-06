import PropTypes from "prop-types";

const Search = (props) => {
  const handleSearch = (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const type = form.type.value;
    console.log(title, type);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white text-black join my-2 absolute right-0">
      <input
        name="title"
        className="input input-bordered join-item"
        placeholder="Service name"
        type="text"
      />{" "}
      <select
        name="type"
        className="select select-bordered w-full max-w-xs join-item">
        <option disabled selected>
          Select Type
        </option>
        <option value="cars">Car</option>
        <option value="bikes">Bike</option>
      </select>
      <button type="submit" className="btn join-item">
        search
      </button>
    </form>
  );
};

Search.propTypes = {};

export default Search;
