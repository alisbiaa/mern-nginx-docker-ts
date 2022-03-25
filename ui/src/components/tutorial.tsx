import React, {useState} from 'react';
import TutorialDataService from '../services/tutorial';
import {useNavigate} from "react-router-dom";

export interface ITutorial {
    id: string;
    title: string;
    description: string;
    published: boolean;
}

const Tutorial = () => {

    let navigate = useNavigate();


    const [currentTutorial, setCurrentTutorial] = useState<ITutorial | null>(null);
    const [message, setMessage] = useState<string>("");

    const getTutorial = (id:string) => {
        TutorialDataService.get(id)
            .then(response => {
                setCurrentTutorial(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const updatePublished = (status:boolean) => {
        if(currentTutorial !== null){
            const data : ITutorial= { ...currentTutorial, published: status};
            TutorialDataService.update(currentTutorial.id, data)
                .then(response => {
                    setCurrentTutorial(data)
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
        else
            return 0;
    }

    const updateTutorial = () => {
        if (currentTutorial !== null) {

            TutorialDataService.update(
                currentTutorial.id,
                currentTutorial
            )
                .then(response => {
                    console.log(response.data);
                    setMessage("The tutorial was updated successfully!");
                })
                .catch(e => {
                    console.log(e);
                });
        }

    }

    const deleteTutorial = () => {
        if (currentTutorial !== null) {
            TutorialDataService.delete(currentTutorial.id)
                .then(response => {
                    console.log(response.data);
                    navigate('/tutorials', {replace: true});
                })
                .catch(e => {
                    console.log(e);
                });
        }
        else return 0;
    }


    return (
        <div>
            {currentTutorial ? (
                <div className="edit-form">
                    <h4>Tutorial</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={currentTutorial.title}
                                onChange={(e) => setCurrentTutorial({...currentTutorial, title: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                value={currentTutorial.description}
                                onChange={(e) => setCurrentTutorial({...currentTutorial, description: e.target.value})}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentTutorial.published ? "Published" : "Pending"}
                        </div>
                    </form>

                    {currentTutorial.published ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updatePublished(false)}
                        >
                            UnPublish
                        </button>
                    ) : (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updatePublished(true)}
                        >
                            Publish
                        </button>
                    )}

                    <button
                        className="badge badge-danger mr-2"
                        onClick={deleteTutorial}
                    >
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateTutorial}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br/>
                    <p>Please click on a Tutorial...</p>
                </div>
            )}
        </div>
    );
};

export default Tutorial;
