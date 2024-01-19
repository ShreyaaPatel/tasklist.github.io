import React, { useState,useEffect } from 'react';
import ReactDragListView from 'react-drag-listview'
import Form from './Form';


const Todo = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [inputDesc, setInputDesc] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem('tasks')) || []
  });
  const [isEditItem, setIsEditItem] = useState(null);
  const [filter, setFilter] = useState(0);
  const [showForm, setShowForm] = useState(false);
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(items));
    console.log('Items saved to local storage:', items);
  }, [items]);

  const handleAdd = () => {
    if (!inputTitle || !inputDesc || !selectedDate) {
      alert("Fill in both title, description, and select a date");
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: inputTitle,
      desc: inputDesc,
      status: false,
      dateAdded: selectedDate,
    };

    setItems([...items, newItem]);

    setInputTitle('');
    setInputDesc('');
    setSelectedDate('');
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((elem) => elem.id !== id);
    setItems(updatedItems);
  };

  const handleEdit = (id) => {
    const editItem = items.find((elem) => elem.id === id);
    setInputTitle(editItem.name);
    setSelectedDate(editItem.dateAdded);
    setInputDesc(editItem.desc);
    setIsEditItem(id);
    setShowForm(true);
  };

  const handleMarkCompleted = (id) => {
    setItems((prevItems) =>
      prevItems.map((elem) =>
        elem.id === id ? { ...elem, status: !elem.status } : elem
      )
    );
  };

  const handleClose = () => {
    setShowForm(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputTitle || !inputDesc || !selectedDate) {
      alert("Fill in both title, description, and select a date");
      return;
    }

    if (isEditItem !== null) {
      setItems((prevItems) =>
        prevItems.map((elem) =>
          elem.id === isEditItem
            ? { ...elem, name: inputTitle, desc: inputDesc, dateAdded: selectedDate }
            : elem
        )
      );
      setIsEditItem(null);
    } else {
      handleAdd();
    }

    setInputTitle('');
    setInputDesc('');
    setSelectedDate('');
    setShowForm(false);
  };

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const newItemList = items.slice()
      const item = newItemList.splice(fromIndex, 1)[0];
      newItemList.splice(toIndex, 0, item);
      setItems(newItemList)
    },
    nodeSelector: '#item',
    handleSelector: '#handle'
  };

  return (
    <main className='bg-info'>
      <div className="container bg-info-subtle justify-content-center shadow p-3" style={{ minHeight:'100vh' }}>
        <div className="row my-4">
          <div className="text-center">
            <h2 className='fw-semibold'>Task Manager</h2>
          </div>
        </div>     
        
        <Form
          className={`mb-2  ${showForm ? '':'d-none'}`}
          inputTitle={inputTitle}
          setInputTitle={setInputTitle}
          inputDesc={inputDesc}
          setInputDesc={setInputDesc}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          isEditItem={isEditItem}
          handleAdd={handleAdd}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
        /> 

        <div className="row justify-content-between mb-4 px-0">
          <div className={`col-md-auto ms-1 mb-2 mb-md-0 ${showForm ? 'd-none':''}` }>
            <button className='btn btn-primary' onClick={() => setShowForm(true)}>Add Task</button>
          </div>
          <div className="col-md-auto me-1 text-end ms-auto">
            <div className="btn-group" role="group">
              <input type="radio" className="btn-check" name="btnradio" id="btnradio1" onClick={() => setFilter(0)} checked={filter === 0}/>
              <label className="btn btn-outline-primary" for="btnradio1">All</label>

              <input type="radio" className="btn-check" name="btnradio" id="btnradio2" onClick={() => setFilter(1)} checked={filter === 1} />
              <label className="btn btn btn-outline-success" for="btnradio2">Completed</label>

              <input type="radio" className="btn-check" name="btnradio" id="btnradio3" onClick={() => setFilter(-1)} checked={filter === -1} />
              <label className="btn btn-outline-warning" for="btnradio3">Incomplete</label>
            </div>
          </div>
        </div>

        <ReactDragListView {...dragProps}>
        {items.map((elem) => (
          <div id="item"
            className={`d-flex rounded shadow-sm border mx-1 p-3 ps-2 mb-3 bg-gradient rounded bg-body
              ${elem.status ? 'completed bg-secondary-subtle' : 'bg-body-subtle'}
              ${(filter === 1) && !elem.status ? ' d-none':''} 
              ${(filter === -1) && elem.status ? ' d-none':''}`
            }
            key={elem.id}
          >
            <div className='col-auto d-flex align-items-center me-2' id="handle">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#808080" className="bi bi-grip-vertical" viewBox="0 0 16 16">
                <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
              </svg>
            </div>
            <div className="col">
              <div className='row'>
                <div className='fs-4'>{elem.name}</div>
                <div className='mb-2'>{elem.desc}</div>
              </div>
              <div className="row justify-content-between align-items-center">
                <div className='col-md mb-3 mb-md-0'>
                  <span className=''>Date Added:</span> {elem.dateAdded}
                </div>
                <div className='col-md text-end'>
                  <button
                    className={`btn btn-sm ${elem.status ? 'btn-warning' : 'btn-success'}`}
                    onClick={() => handleMarkCompleted(elem.id)}
                  >
                    {elem.status ? 'Mark Incomplete' : 'Mark Completed'}
                  </button>
                  <button
                    className="btn btn-sm btn-primary mx-2"
                    onClick={() => handleEdit(elem.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(elem.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        </ReactDragListView>
      </div>
    </main>
  );
};

export default Todo;

