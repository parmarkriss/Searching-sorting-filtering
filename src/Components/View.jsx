import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

function Viewpage() {
    const [record, setRecord] = useState([]);
    const [status, setStatus] = useState('');
    const [nameQuery, setNameQuery] = useState('');
    const [sortdata, setSortdata] = useState('');
    const [selectedRecords, setSelectedRecords] = useState([]);

    const fetchRecords = () => {
        axios.get('http://localhost:8000/crud')
            .then(res => {
                setRecord(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/crud/${id}`)
            .then(res => {
                fetchRecords();
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleMultipleDelete = () => {
        selectedRecords.forEach(id => {
            axios.delete(`http://localhost:8000/crud/${id}`)
                .then(res => {
                    fetchRecords();
                    setSelectedRecords([]);
                })
                .catch(err => {
                    console.log(err);
                });
        });
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleNameSearchChange = (e) => {
        setNameQuery(e.target.value);
    };

    const handleSort = (e) => {
        setSortdata(e.target.value);
    };

    const handleReset = () => {
        setStatus("");
        setNameQuery("");
        setSortdata("");
    };

    const handleCheckboxChange = (id) => {
        if (selectedRecords.includes(id)) {
            setSelectedRecords(selectedRecords.filter(recordId => recordId !== id));
        } else {
            setSelectedRecords([...selectedRecords, id]);
        }
    };

    const filteredRecords = record.filter(val => {
        if (status && val.status !== status) {
            return false;
        }
        if (nameQuery && !val.name.toLowerCase().includes(nameQuery.toLowerCase())) {
            return false;
        }
        return true;
    });

    const StatusChange = (id, newStatus) => {
        axios.patch(`http://localhost:8000/crud/${id}`, { status: newStatus })
            .then(res => {
                fetchRecords();
            })
            .catch(err => {
                console.log(err);
            });
    };


    useEffect(() => {
        fetchRecords();
    }, []);

    useEffect(() => {
        let datasorted = [...record];
        if (sortdata === "A-Z") {
            datasorted.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortdata === "Z-A") {
            datasorted.sort((a, b) => b.name.localeCompare(a.name));
        }
        setRecord(datasorted);
    }, [sortdata]);

    return (
        <div className="container mt-5">
            <form className='row'>
                <div className="col-md-4">
                    <select id="status" name="status" className="form-select" value={status} onChange={handleStatusChange}>
                        <option value="">---select status---</option>
                        <option value="Active">Active</option>
                        <option value="Deactive">Deactive</option>
                    </select>
                </div>

                <div className="col-md-4">
                    <input type="text" className="form-control mb-2" id="name" placeholder="Name search" value={nameQuery} onChange={handleNameSearchChange} />
                </div>

                <div className="col-md-4 d-flex align-items-center">
                    <select id="sort" name="sort" className="form-select me-2" onChange={handleSort} value={sortdata}>
                        <option value="">---select sort---</option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </select>
                    <button type="button" className="btn btn-dark" onClick={handleReset}>Reset</button>
                </div>
            </form>

            <div className="card mt-5">
                <div className="card-header">
                    <h4>View Records</h4>
                    <Link to="/"><button className='btn btn-primary'>Add New Record</button></Link>
                    {selectedRecords.length > 0 && (
                        <button className='btn btn-danger ms-3' onClick={handleMultipleDelete}>Delete Selected</button>
                    )}
                </div>
                
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Course</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.map(val => (
                                <tr key={val.id}>
                                    <td>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={selectedRecords.includes(val.id)}
                                                onChange={() => handleCheckboxChange(val.id)}
                                            />
                                        </div>
                                    </td>
                                    <td>{val.id}</td>
                                    <td>{val.name}</td>
                                    <td>{val.email}</td>
                                    <td>{val.gender}</td>
                                    <td>{val.course.join(', ')}</td>
                                    <td>{val.date}</td>
                                    <td>
                                        <button className={`btn ${val.status === 'Active' ? 'btn-success' : 'btn-warning'}`} onClick={() => StatusChange(val.id, val.status === 'Active' ? 'Deactive' : 'Active')}>
                                            {val.status}
                                        </button>
                                    </td>
                                    <td>
                                        <button className='btn btn-danger me-1' onClick={() => handleDelete(val.id)}>Delete</button>
                                        <Link to={`/editdata/${val.id}`}><button className='btn btn-secondary'>Edit</button></Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Viewpage;