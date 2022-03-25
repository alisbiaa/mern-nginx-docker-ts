import React, {useState} from 'react';
import TutorialDataService from "../services/tutorial";


const AddTutorial = () => {


    // const [id, setId] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    // const [published, setPublished] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const newTutorial = () => {
        // setId(null);
        setTitle('');
        setDescription('');
        // setPublished(false);
        setSubmitted(false);
    }
    const saveTutorial = () => {
        TutorialDataService.create({
            title,description
        })
            .then(response => {
                // setId(response.data.id);
                setTitle(response.data.title);
                setDescription(response.data.description);
                // setPublished(response.data.description);
                setSubmitted(true);
                // for debugging
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newTutorial}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            name="title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            name="description"
                        />
                    </div>

                    <button onClick={saveTutorial} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddTutorial;
