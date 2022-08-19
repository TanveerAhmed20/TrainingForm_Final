import React, { useEffect, useMemo, useState } from "react";
import { Table, Button } from 'reactstrap';
import { TrainingType } from '../../types/types';
import Training from "../training/Training";
import { useSelector } from 'react-redux';
import { fetchTrainings, selectTrainings, selectLoading, clearTrainingFound, selectTrainingCount, fetchTrainingsWithPagination } from '../../store/trainings/trainingsSlice';
import SkeletonTable from "../skeleton/Skeleton";
import { useAppDispatch } from "../../store";
import DataTable, { Selector, TableColumn } from 'react-data-table-component';
import { useNavigate } from "react-router-dom";
import FilterComponent from "../filterComponent/FilterComponent";
import SkeletonDataTable from "../skeleton/SkeletonDataTable";
import { DotLoader } from "react-spinners";

const TrainingsDataTable = () => {
    const trainings = useSelector(selectTrainings);
    const loading = useSelector(selectLoading);
    const dispatch = useAppDispatch();
    const clearHandler = () => {
        dispatch(clearTrainingFound({}));
    }
    const navigate = useNavigate();
    // useEffect(() => {
    //     setTimeout(() => {
    //         dispatch(fetchTrainings());
    //     }, 300)

    // }, []);

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const filteredItems = trainings.filter(
        item => ((item.trainingId && item.trainingId.toLowerCase().includes(filterText.toLowerCase())) ||
            (item.trainerId && item.trainerId.toLowerCase().includes(filterText.toLowerCase())) ||
            (item.traineeId && item.traineeId.toLowerCase().includes(filterText.toLowerCase())) ||
            (item.trainingStartDate && item.trainingStartDate.toLowerCase().includes(filterText.toLowerCase())) ||
            (item.trainingEndDate && item.trainingEndDate.toLowerCase().includes(filterText.toLowerCase()))
        ),
    );

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);

    function dateDiffInDays(a: Date, b: Date) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        return Math.floor((utc2 - utc1) / _MS_PER_DAY) + " days";
    }
    // {
    //     name: string;
    //     selector: (row: TrainingType) => string | undefined;
    //     sortable: boolean;
    // }[]
    const columns: TableColumn<TrainingType>[] = [
            {
                name: 'TrainingId',
                selector: (row: TrainingType) => row.trainingId || '',
                sortable: true,
            },
            {
                name: 'TrainerId',
                selector: (row: TrainingType) => row.trainerId || '',
                sortable: true,
            },
            {
                name: 'Title',
                selector: (row: TrainingType) => row.title || '',
                sortable: true,
            },
            // {
            //     name: 'trainingStartDate',
            //     selector: (row: TrainingType) => row.trainingStartDate?.split('T')[0],
            //     sortable: true,
            // },
            // {
            //     name: 'trainingEndDate',
            //     selector: (row: TrainingType) => row.trainingEndDate?.split('T')[0],
            //     sortable: true,
            // },
            {
                name: 'Duration',
                selector: (row: TrainingType) => {
                    if (!row.trainingStartDate || !row.trainingEndDate) return "";
                    return dateDiffInDays(new Date(row.trainingStartDate), new Date(row.trainingEndDate))
                },
                sortable: true,
            },
        ];
    const trainingCount = useSelector(selectTrainingCount);
    const [loadingPage, setLoadingPage] = useState(false);
    const [perPage, setPerPage] = useState(5);

    const fetchUsers = async (page: number) => {
        setLoadingPage(true);
        dispatch(fetchTrainingsWithPagination({ page: page, limit: perPage })).then(() => setLoadingPage(false));
    };

    const handlePageChange = (page: number) => {
        fetchUsers(page);
    };

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setLoadingPage(true);
        dispatch(fetchTrainingsWithPagination({ page: page, limit: newPerPage })).then(() => {setPerPage(newPerPage);
        setLoadingPage(false);
        });
    };

    useEffect(() => {
        fetchUsers(1); // fetch page 1 of users		
    }, []);



    // if (loading == 'idle' || loading == 'pending') {
    //     return (<>
    //         {/* <SkeletonDataTable /> */}
    //         <div style={{height:'100vh',width:"100%",display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
    //          <DotLoader color="#8A8D8A" />
    //      </div>
    //     </>)
    // }
    return (
        <DataTable
            columns={columns}
            onRowClicked={(row, event) => { clearHandler(); navigate(`/Trainings/ViewTraining/${encodeURIComponent(row.trainingId!)}`) }}
            data={filteredItems}
            fixedHeader
            fixedHeaderScrollHeight="370px"
            highlightOnHover
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
            paginationResetDefaultPage={resetPaginationToggle}
            pointerOnHover
            responsive
            selectableRowsHighlight
            striped
            subHeaderWrap
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            paginationComponentOptions={{
                selectAllRowsItem: true
            }}
            progressPending={loadingPage}
            paginationServer
            paginationTotalRows={trainingCount}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}

        />
    );
}
// {/* {trainings.length ===0 && loading=='succeeded' ? (<h2>Database Empty</h2>) : trainings.map((training: TrainingType) => {
//     return <Training training={training} key={training.trainingId} details={false} editModalHandler={() => { }} />

// })} */}
export default TrainingsDataTable;