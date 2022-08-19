import React from 'react'
import { Table } from "reactstrap";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton';
import DataTable from 'react-data-table-component';
const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        width: "100% !important"
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);
export const SkeletonDataTable = () => {
    const skeletonArray = Array(10).fill('');
    const Rows = skeletonArray.map((item, index) => (
        <StyledTableRow key={index}>
            <StyledTableCell component="th" scope="row">
                <Skeleton />
            </StyledTableCell>
            <StyledTableCell align="right">
                <Skeleton />
            </StyledTableCell>
            <StyledTableCell align="right">
                <Skeleton />
            </StyledTableCell>
            <StyledTableCell align="right">
                <Skeleton />
            </StyledTableCell>
            <StyledTableCell align="right">
                <Skeleton />
            </StyledTableCell>
            <StyledTableCell align="right">
                <Skeleton />
            </StyledTableCell>
        </StyledTableRow>
    ))
    console.log(Rows)
    const Body = () => <tbody>{Rows}</tbody>;
    const columns = [
        {
            name: 'trainingId',
            selector: row => row.trainingId,
            sortable: true,
        },
        {
            name: 'trainerId',
            selector: row => row.trainerId,
            sortable: true,
        },
        {
            name: 'traineeId',
            selector: row => row.traineeId,
            sortable: true,
        },
        {
            name: 'trainingStartDate',
            selector: row => row.trainingStartDate?.split('T')[0],
            sortable: true,
        },
        {
            name: 'trainingEndDate',
            selector: row => row.trainingEndDate?.split('T')[0],
            sortable: true,
        },
    ];
    return (
        <DataTable
            columns={columns}
            data={[{}, {}]}
            fixedHeaderScrollHeight="300px"
            highlightOnHover
            responsive
            selectableRowsHighlight
            subHeader={true}
        />)
}

export default SkeletonDataTable;