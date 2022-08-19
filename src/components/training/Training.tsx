import { ButtonGroup, Modal, ModalBody, ModalHeader } from "reactstrap";
import EditTraining from "../editTraining/EditTraining";
import { deleteTraining } from "../server";
import { TrainingProps } from "../../types/types";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearTrainingFound, deleteTrainingThunk, selectTraining } from '../../store/trainings/trainingsSlice'
import { useAppDispatch } from "../../store";
import { useEffect } from "react";
const Training = ({ training, details, editModalHandler }: TrainingProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        trainingId,
        trainerId,
        trainingStartDate,
        trainingEndDate,
        title,
        totalTrainees="1, 2, 3"

    } = training;
    var duration;
    function dateDiffInDays(a: Date, b: Date) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY)+" days";
    }
    if (!trainingStartDate || !trainingEndDate) {
        duration = "NA"
    }
    else duration = dateDiffInDays(new Date(trainingStartDate), new Date(trainingEndDate))
    return (
        <>
            {training.trainingId &&
                <tr>
                    <td>{trainingId}</td>
                    <td>{trainerId}</td>
                    <td>{title}</td>
                    <td>{duration}</td>
                    <td>{totalTrainees.toString()}</td>
                    <td><button className="btn btn-outline-info" onClick={() => navigate(`/Trainings/ViewTraining/${encodeURIComponent(training.trainingId!)}`)}>Details</button></td>

                </tr>
            }
        </>
    )
}

export default Training;