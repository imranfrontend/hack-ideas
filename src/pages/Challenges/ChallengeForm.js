import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MultiSelect } from "react-multi-select-component";

const options = [
    { label: "Feature", value: "feature" },
    { label: "Tech", value: "tech" },
    { label: "Javascript", value: "javascript" },
    { label: "ReactJs", value: "react js" },
    { label: "Angular", value: "angular" }
  ];

const ChallengeForm = (props) => {
    const initialFieldValues = {
        title: '',
        description: '',
        tags: [],
        voteCount: 0,
        createdAt: new Date().toLocaleDateString(),
    }

    const [values, setValues] = useState(initialFieldValues);
    const [selectedTags, setSelectedTags] = useState([]);
    const handleInputChange = (e) => {
        var {name, value} = e.target;
        setValues({
            ...values,
            [name] : value
        });
    }

    useEffect(() => {
        setSelectedTags([]);
        if(props.currentId === '') {
            setValues({
                ...initialFieldValues
            })
        } else {
            setValues({
                ...props.challenges[props.currentId],
            })
            setSelectedTags(props.challenges[props.currentId].tags[0])
            document.body.classList.add('sidebar-open');    
        } 
    },[props.currentId, props.challenges])

    const handleChallengeSubmit = (e) => {
        e.preventDefault();
        values.tags.push(selectedTags);
        props.addOrEdit(values);
    }

    const hideAddEditForm = (e) => {
        e.preventDefault();
        document.body.classList.remove('sidebar-open');
    }

    return (
        <>
            <div className="sidebar sidebar-fixed">
                <div className="sidebar-backdrop" onClick={hideAddEditForm}></div>
                <div className="sidebar-panel">
                    <div className="sidebar-panel-heading bg-primary d-flex align-items-center justify-content-between py-2 px-3">
                        <h3 className="panel-title mb-0">{props.currentId === '' ? "Add": "Edit"} Challenge</h3>
                        <div className="sidebar-action">
                            <button type="button" className="btn btn-icon btn-sm ms-2" onClick={hideAddEditForm}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                    </div>
                    <div className="sidebar-panel-content">
                        <form autoComplete="off" onSubmit={handleChallengeSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" name="title" id="title" value={values.title} onChange={handleInputChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea name="description" id="description" value={values.description} onChange={handleInputChange} rows="3" cols="10" className="form-control textarea no-resize"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="mSelect">Select Tags</label>
                                <MultiSelect
                                    id="mSelect"
                                    options={options}
                                    value={selectedTags}
                                    onChange={setSelectedTags}
                                    labelledBy="Select tags"
                                />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block">{props.currentId === '' ? "Save": "Update"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChallengeForm;