import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Add() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [course, setCourse] = useState([]);
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");
    const [record, setRecord] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = () => {
        axios.post(`http://localhost:8000/crud`, {
            name: name,
            email: email,
            password: password,
            gender: gender,
            course: course,
            date: date,
            status: status
        })
            .then(res => {
                fetchrecord();
                setName("");
                setEmail("");
                setPassword("");
                setGender("");
                setCourse([]);
                setDate("");
                setStatus("");
                alert("Record successfully added.");
                navigate('/view');
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleCourse = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCourse([...course, value]);
        } else {
            setCourse(course.filter(c => c !== value));
        }
    };

    const fetchrecord = () => {
        axios.get(`http://localhost:8000/crud`)
            .then(res => {
                setRecord(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchrecord();
    }, []);

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h4>Add User</h4>
                    <Link to="/view"><button type='button' className="btn btn-primary">View Data</button></Link>
                </div>
                <div className="card-body">
                    <form className="row" onSubmit={handleSubmit}>
                        <div className='col-6'>
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control mb-2" id="name" placeholder="Enter name" onChange={(e) => setName(e.target.value)} value={name} />

                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control mb-2" id="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />

                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control mb-2" id="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} />

                            <label className="form-label">Gender</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="maleCheckbox" onChange={(e) => setGender(e.target.value)} value="Male" name="gender" />
                                <label className="form-check-label" htmlFor="maleCheckbox">
                                    Male
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="femaleCheckbox" onChange={(e) => setGender(e.target.value)} value="Female" name="gender" />
                                <label className="form-check-label" htmlFor="femaleCheckbox">
                                    Female
                                </label>
                            </div>
                        </div>

                        <div className='col-6'>
                            <label htmlFor="course" className="form-label">Course</label>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="course" id="courseHtml" onChange={handleCourse} value="Html" />
                                <label className="form-check-label" htmlFor="courseHtml">
                                    HTML
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="course" id="courseCss" onChange={handleCourse} value="Css" />
                                <label className="form-check-label" htmlFor="courseCss">
                                    CSS
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="course" id="courseJs" onChange={handleCourse} value="Javascript" />
                                <label className="form-check-label" htmlFor="courseJs">
                                    JavaScript
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="course" id="courseReact" onChange={handleCourse} value="React js" />
                                <label className="form-check-label" htmlFor="courseReact">
                                    React Js
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="course" id="courseNode" onChange={handleCourse} value="Node js" />
                                <label className="form-check-label" htmlFor="courseNode">
                                    Node Js
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="course" id="courseUx" onChange={handleCourse} value="Ui/Ux Design" />
                                <label className="form-check-label" htmlFor="courseUx">
                                    Ui/Ux Design
                                </label>
                            </div>

                            <div className="mt-2">
                                <label htmlFor="date" className="form-label">Date</label>
                                <input type="date" className="form-control" id="date" onChange={(e) => setDate(e.target.value)} value={date} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Status</label>
                                <select id="status" name="status" className="form-select" onChange={(e) => setStatus(e.target.value)} value={status}>
                                    <option value="">---select status---</option>
                                    <option value="Active">Active</option>
                                    <option value="Deactive">Deactive</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-12 mt-3">
                            <button type="button" className="btn btn-primary" onClick={()=>handleSubmit()}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Add;
