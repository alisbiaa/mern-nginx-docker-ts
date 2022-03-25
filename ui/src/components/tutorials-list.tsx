import React, {useEffect, useState} from 'react';
import TutorialDataService from "../services/tutorial";
import { Link } from "react-router-dom";
import {ITutorial} from "./tutorial";

const TutorialsList = () => {
    const [currentTutorial, setCurrentTutorial] = useState<ITutorial | null>();
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [searchTitle, setSearchTitle] = useState<string>("");
    const [tutorials, setTutorials] = useState<ITutorial[]>([]);

    const queryTitle = () => {
        setCurrentTutorial(null);
        setCurrentIndex(-1);
        TutorialDataService.findByTitle(searchTitle)
            .then(response => {
                setTutorials(response.data);
                console.log(response.data);
            })
            .catch(e => console.log(e));
    }

    const setActiveTutorial = (tutorial: ITutorial, index: number) => {
        setCurrentTutorial(tutorial);
        setCurrentIndex(index);
    };

    const removeAllTutorials = () => {
        TutorialDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveTutorials();
        setCurrentTutorial(null);
        setCurrentIndex(-1);
    }

    useEffect(() => {
        refreshList();
    },[]);

    const retrieveTutorials =() => {
        TutorialDataService.getAll()
            .then(response => {
                setTutorials(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={e => setSearchTitle(e.target.value)}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={queryTitle}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Tutorials List</h4>

                <ul className="list-group">
                    {tutorials &&
                        tutorials.map((tutorial, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveTutorial(tutorial, index)}
                                key={index}
                            >
                                {tutorial.title}
                            </li>
                        ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllTutorials}
                >
                    Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentTutorial ? (
                    <div>
                        <h4>Tutorial</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentTutorial.title}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentTutorial.description}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentTutorial.published ? "Published" : "Pending"}
                        </div>

                        <Link
                            to={"/tutorials/" + currentTutorial.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Please click on a Tutorial...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TutorialsList;
