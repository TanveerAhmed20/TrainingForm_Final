export type TrainingType ={
    trainingId?:string, 
    trainerId?:string,
    traineeId?:string,
    trainingStartDate?:string,
    trainingEndDate?:string,
    title?:string,
    description?:string,
    techStack?: string,
    isDeleted?:boolean,
    trainingDuration?:string,
    totalTrainees?:number
}
export type EditTrainingProps = {
    toggleEditModal: () => void, 
    trainingData: TrainingType
}
export type TrainingProps = {
    training: TrainingType,
    details: Boolean,
    editModalHandler: Function 
}

export type ViewTrainingProps ={
    training: TrainingType,
    toggleEditModal: Function
}