import React, { useState } from "react";
import "./viewTrainingCard.styles.css";
import { ViewTrainingProps } from "../../types/types";
import { deleteTrainingThunk ,editTrainingThunk} from "../../store/trainings/trainingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from 'reactstrap';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { BsHandThumbsUp, BsHandThumbsDown } from 'react-icons/all';

const ViewTrainingCard = ({ training, toggleEditModal }: ViewTrainingProps) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const {
    trainingId,
    trainerId,
    traineeId,
    title,
    description,
    trainingStartDate,
    trainingEndDate,
    techStack,
  } = training;
  const StartDate = trainingStartDate!.split("T")[0];
  const EndDate = trainingEndDate!.split("T")[0];
  const deleteHandler = () => {
    // deleteTraining(trainingId!).then(res => {alert("Deleted training with id:"+ trainingId!); w.location="/"});
    dispatch(deleteTrainingThunk(trainingId!)).then(() =>
      navigate("/Trainings")
    );
  };
  const [toggleValue, setToggleValue] = useState({
    modal: false
  })
  const toggleDeleteTrainingModal = () => {
    setToggleValue({
      modal: !toggleValue.modal
    })
  }

  return (
    <div className="view-training-container">
      <Modal centered isOpen={toggleValue.modal} toggle={toggleDeleteTrainingModal}>
        <ModalHeader>Delete Training {title}</ModalHeader>
        <ModalBody>
          <ButtonGroup style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div className="button-group">
            <button className="tag tag-red" onClick={deleteHandler} style={{width: '70px', height: '70px'}}>Yes  <BsHandThumbsUp/></button>
            <button className="tag tag-teal" onClick={toggleDeleteTrainingModal} style={{width: '70px', height: '70px'}}> No<BsHandThumbsDown/></button>
            </div>
          </ButtonGroup>
        </ModalBody>
      </Modal>
      <div className="card bg-secondary">
        <div className="card-body">
          {/* <span className="tag tag-teal">{techStack}</span> */}
          <div className="details-row">
            <h2>Title</h2>
            <span className="span-data"> {title}</span>
          </div>
          <div className="details-row">
            <h4>Training Id</h4>
            <span className="span-data"> {trainingId}</span>
          </div>
          <div className="details-row">
            <h4>Trainer Id</h4>
            <span className="span-data"> {trainerId}</span>
          </div>
          <div className="details-row">
            <h4>Training Start Date</h4>
            <span className="span-data"> {StartDate}</span>
          </div>

          <div className="details-row">
            <h4>Training End Date</h4>
            <span className="span-data"> {EndDate}</span>
          </div>

          <div className="details-row">
            <h4>Tech Stack</h4>
            <span className="span-data">{techStack}</span>
          </div>
          <hr className="seperator" />
          <div className="description-row">

            <h4 className="span-data">
              <u>
                Description
              </u>
            </h4>


            <p className="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum
            </p>
          </div>

          <div className="button-group">
            <h2 className="tag tag-teal">View Trainees</h2>
            <h2 className="tag tag-red" onClick={toggleDeleteTrainingModal}>DELETE Training</h2>
            <h2 className="tag tag-teal" onClick={() => toggleEditModal()}>EDIT Training</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTrainingCard;
