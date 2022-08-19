import { FormEvent, FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { editTraining } from "../server";
import { EditTrainingProps, TrainingType } from '../../types/types';
import { ChangeEvent } from "react";
import './EditTraining.css'
import { editTrainingThunk } from "../../store/trainings/trainingsSlice";
import { useAppDispatch } from "../../store";

function dateDiffInDays(a: Date, b: Date) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return Math.floor((utc2 - utc1) / _MS_PER_DAY) + " days";
  }
const EditTraining = ({ toggleEditModal, trainingData }: EditTrainingProps) => {
    //YYYY-MM-DD
    const DateToHTML = (dateString: string) => {
        const date = new Date(dateString);
        const [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDate()];
        var hTMLDate = ""+year;
        if(month < 10) 
            hTMLDate += "-0"+month
        else 
            hTMLDate += "-"+month
        if(day < 10) 
            hTMLDate += "-0"+day
        else 
            hTMLDate += "-"+day
        return hTMLDate;
    }
    const training: TrainingType = {
        trainingId: trainingData.trainingId,
        title: trainingData.title,
        description: trainingData.description,
        trainingStartDate: (trainingData.trainingStartDate && DateToHTML(trainingData.trainingStartDate)),
        trainingEndDate: (trainingData.trainingEndDate && DateToHTML(trainingData.trainingEndDate)),
        techStack: trainingData.techStack
    };
    console.log(training)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const editTrainingHandler = (training: TrainingType) => {
        console.log(training)
        dispatch<any>(editTrainingThunk(training)).then(() => {
            toggleEditModal();
            alert("Edited training");
            navigate(`/Trainings/ViewTraining/${encodeURIComponent(training.trainingId!)}`)
        });
    
    }
    return (
        <Formik
            initialValues={training}
            validate={values => {
                const errors: any = {};
                if (!values.title) {
                    errors.title = 'Title is Required';
                }
                if((/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/).test(values.title!)
                    || (/.[0-9]./).test(values.title!)
                ){
                    errors.title = 'Title Cannot contain special characters or numbers'
                }
                if (!values.description) {
                    errors.description= 'Description is Required';
                }
                if (!values.trainingStartDate) {
                    errors.trainingStartDate = 'Training Start Date is Required';
                }
                if (!values.trainingEndDate) {
                    errors.description= 'Training End Date is Required';
                }
                if (!values.techStack) {
                    errors.techStack = 'Tech Stack is Required';
                }
                if (
                    parseInt(
                      dateDiffInDays(
                        new Date(values.trainingStartDate!),
                        new Date(values.trainingEndDate!)
                      )
                    ) < 0
                  ) {
                    errors.trainingEndDate =
                      "Ending Date must be greater than starting Date";
                  }
            
                return errors;

            }}

            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                console.log(values)
                editTrainingHandler(values);
            }}

        >

            {({ isSubmitting, isValid, errors, touched }) => (
                <Form className="form">
                      <div className="form-group row py-sm-2 px-sm-3"> 
                    <label htmlFor="trainingEndDate" className="col-sm-3 col-form-label ">Training Id</label> 
                    <div className="col-sm-9">
                    <Field className={`form-control ${touched.trainingId && errors.trainingId ? "is-invalid" : ""
                        }`} type="text" name="trainingId" placeholder="trainingId" disabled/>
                      </div>
                    </div>
                      <div className="form-group row py-sm-2 px-sm-3"> 
                    <label htmlFor="trainingEndDate" className="col-sm-3 col-form-label ">Title</label> 
                    <div className="col-sm-9">
                    <Field className={`form-control ${touched.title && errors.title ? "is-invalid" : ""
                        }`} type="text" name="title" placeholder="title" />

                    <ErrorMessage name="title" component="span" className="invalid-feedback" />
                    </div>
                    </div>
                    <div className="form-group row py-sm-2 px-sm-3"> 
                    <label htmlFor="trainingEndDate" className="col-sm-3 col-form-label ">Tech Stacks</label> 
                    <div className="col-sm-9">
                    <Field className={`form-control ${touched.techStack && errors.techStack ? "is-invalid" : ""
                        }`} type="text" name="techStack" placeholder="techStack" />

                    <ErrorMessage name="techStack" component="div" className="invalid-feedback"/>
                    </div>
                    </div>

                    <div className="form-group row py-sm-2 px-sm-3"> 
                    <label htmlFor="trainingEndDate" className="col-sm-3 col-form-label ">Description</label> 
                    <div className="col-sm-9">
                    <Field className={`form-control ${touched.description && errors.description ? "is-invalid" : ""
                        }`} type="text" component="textarea" name="description" rows ="4" placeholder="description" />

                    <ErrorMessage name="description" component="div" className="invalid-feedback" />
                    </div>
                    </div>
                    <div className="form-group row py-sm-2 mx-sm-1"> 
                    <label htmlFor="trainingStartDate" className="col-sm-3 col-form-label">Start Date:</label> 
                    <div className="col-sm-7">
                    <Field className={`form-control ${touched.trainingStartDate && errors.trainingStartDate ? "is-invalid" : ""
                        }`} type="date" name="trainingStartDate" placeholder="training Start Date" />

                    <ErrorMessage name="trainingStartDate" component="div" className="invalid-feedback"/>
                    </div>
                    </div>

                    <div className="form-group row py-sm-2 mx-sm-1"> 
                    <label htmlFor="trainingEndDate" className="col-sm-3 col-form-label ">End Date:</label> 
                    <div className="col-sm-7">
                    <Field className={`form-control ${touched.trainingEndDate && errors.trainingEndDate ? "is-invalid" : ""
                        }`} type="date" name="trainingEndDate" placeholder="training End Date" />

                    <ErrorMessage name="trainingEndDate" component="div" className="invalid-feedback"/>
                    </div>
                    </div>
                    <button type="submit" className="btn" disabled={isSubmitting} style={{ backgroundColor: "rgba(37, 117, 252, 1)", color: "white" }}>
                        Submit
                    </button>

                </Form>

            )}

        </Formik>
    )
}

export default EditTraining;