import React from 'react';

const Form = ({
  className,
  inputTitle,
  setInputTitle,
  inputDesc,
  setInputDesc,
  selectedDate,
  setSelectedDate,
  isEditItem,
  handleAdd,
  handleSubmit,
  handleClose,
}) => {
  return (
    <form className={`input-group col-12 p-2 ${className}`} onSubmit={handleSubmit}>
      <label htmlFor="title" className="mb-1">
        Enter Title
      </label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Task Title"
        className="w-100 form-control rounded mb-3 p-2"
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
      />

      <label className="mb-1" htmlFor="description">
        Enter Description
      </label>
      <textarea
        name="description"
        id="description"
        placeholder="Enter description"
        className="w-100 form-control rounded mb-3 p-2"
        value={inputDesc}
        onChange={(e) => setInputDesc(e.target.value)}
      />
      <label className="mb-1" htmlFor="dateAdded">
          Select Date
      </label>
      <input
        type="date"
        name="dateAdded"
        id="dateAdded"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="w-100 form-control rounded mb-3 p-2"
      />
      <div>
        <button type="submit" className="btn btn-primary my-2 me-1">
          {isEditItem !== null ? 'Update' : 'Save'}
        </button>
        <button type="reset" onClick={handleClose} className="btn btn-danger my-2 ms-1">
          Close
        </button>
      </div>

    </form>
  );
};

export default Form;