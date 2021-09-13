import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import ChallengeForm from './ChallengeForm';
import firebaseDb from '../../utils/firebase';
import Header from '../../partial/Header';

const Challenges = () => {
    const [challenges, setChallenges] = useState({});
    const [currentId, setCurrentId] = useState('');

    useEffect(()=>{
        firebaseDb.child('challenges').on('value',snapshot=>{
            if(snapshot.val()!=null){
                setChallenges({
                    ...snapshot.val()
                })
            } else {
                setChallenges({})
            }
        })
    },[]);

    const addOrEdit = obj => {
        if(currentId === '') {
            firebaseDb.child('challenges').push(
                obj,
                err => {
                    if(err) {
                        console.log(err);
                    } else {
                        setCurrentId('');
                        document.body.classList.remove('sidebar-open');
                    }
                }
            )
        } else {
            firebaseDb.child(`challenges/${currentId}`).set(
                obj,
                err => {
                    if(err) {
                        console.log(err);
                    } else {
                        setCurrentId('');
                        document.body.classList.remove('sidebar-open');

                    }
                }
            )
        }
        
    };

    const onDelete = key => {
        if(window.confirm("Are you sure to delete this challenge?")) {
            firebaseDb.child(`challenges/${key}`).remove(
                err => {
                    if(err) {
                        console.log(err);
                    } else {
                        setCurrentId('');
                    }
                }
            )
        }
    }

    const handleUpVote = key => {       
            firebaseDb.child(`challenges/${key}`).once('value')
            .then(snapshot => {
                // get the value of the item. NOTE: this is unsafe if the item 
                // does not exist
                let updatedWish = snapshot.val();
                // update the item's desired property to the desired value
                updatedWish.voteCount = updatedWish.voteCount + 1;
                // replace the item with `wish.id` with the `updatedWish`
                firebaseDb.child(`challenges/${key}`).set(updatedWish);
            });

    }
    
    const presentChallengeForm = (e) => {
        document.body.classList.add('sidebar-open');
    }
    return (
        <>
            <Header />
            <ChallengeForm {...({addOrEdit,currentId,challenges})} />
            <div className="app-layout">
                <div className="container">
                    <div className="toolbar d-flex justify-content-between flex-wrap pt-3 pb-3">
                        <div className="page-title d-flex flex-column py-1">
                            {/* begin::Title */}
                            <h1 className="d-flex align-items-center my-1">
                                <span className="text-dark">All Challenges</span>
                                {/* begin::Challenge Count */}
                                <small className="challenge-count text-muted ml-2">({Object.keys(challenges).length})</small>
                                {/* end::Challenge Count */}
                            </h1>
                            {/* end::Title */}
                        </div>
                        <div className="d-flex align-items-center text-right">
                            <button type="button" className="btn btn-primary" onClick={presentChallengeForm}><FontAwesomeIcon icon={faPlus} className="mr-1" /> Add Challenge</button>
                        </div>
                    </div>
                    {/* begin::Challenges */}
                    <div className="challenges">
                        {/* begin::Challenge */}
                        {
                            Object.keys(challenges).map(id=> {
                                return (
                                    <div className="challenge mb-3 p-3" key={id}>
                                        <div className="d-flex align-items-center mb-3">
                                            {/* begin::Title */}
                                            <h2 className="challenge-title -swatch-7 mb-0">{challenges[id].title}</h2>
                                            {/* end::Title */}
                                        </div>
                                        {/* begin::Description */}
                                        <div className="challenge-description -swatch-8 mb-3">{challenges[id].description}</div>
                                        {/* end::Description */}
                                        {/* begin::Foot */}
                                        <div className="d-flex justify-content-between flex-wrap">
                                            {/* begin::Date */}
                                            <div className="d-flex align-items-center py-1">
                                                <div className="datetime">
                                                    <span className="text-muted"><FontAwesomeIcon icon={faCalendarAlt} className="mr-1" /> {challenges[id].createdAt}</span>
                                                </div>
                                            </div>
                                            {/* end::Date */}
                                            {/* begin::Info */}
                                            <div className="d-flex align-items-center py-1">
                                                {/* begin::Tags */}
                                                {
                                                    challenges[id].tags[0].map(function(tag,index){
                                                      return( <span className="btn btn-sm btn-light px-4 mr-2 text-capitalize" key={index}>{tag.value.toLowerCase()}</span>);
                                                    })
                                                }
                                                {/* end::Tags */}
                                                {/* begin::Upvote */}
                                                <span onClick={()=>{handleUpVote(id)}} className="btn btn-sm btn-flex btn-light px-3  mr-2" data-bs-toggle="tooltip" title="Upvote this challenge" >{challenges[id].voteCount} 
                                                    {/* begin::Svg Icon | path: icons/duotune/arrows/arr062.svg */}
                                                    <span className="svg-icon svg-icon-7ms-2 me-0">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <path opacity="0.5" d="M13 9.59998V21C13 21.6 12.6 22 12 22C11.4 22 11 21.6 11 21V9.59998H13Z" fill="black" />
                                                            <path d="M5.7071 7.89291C5.07714 8.52288 5.52331 9.60002 6.41421 9.60002H17.5858C18.4767 9.60002 18.9229 8.52288 18.2929 7.89291L12.7 2.3C12.3 1.9 11.7 1.9 11.3 2.3L5.7071 7.89291Z" fill="black" />
                                                        </svg>
                                                    </span>
                                                    {/* end::Svg Icon--> */}
                                                </span>
                                                <span onClick={()=>{setCurrentId(id)}} className="btn btn-sm btn-flex btn-light px-3 mr-2" data-bs-toggle="tooltip" title="Edit this challenge" >Edit</span>
                                                <span onClick={()=>{onDelete(id)}} className="btn btn-sm btn-flex btn-danger px-3" data-bs-toggle="tooltip" title="Delete this challenge" >Delete</span>
                                                {/* end::Upvote--> */}
                                            </div>
                                            {/* end::Info */}
                                        </div>
                                        {/* end::Foot */}
                                    </div>
                                )
                            })
                        }
                        {/* end::Challenge */}
                    </div>
                    {/* end::Challenges */}
                </div>
            </div>
        </>
    )
}

export default Challenges;