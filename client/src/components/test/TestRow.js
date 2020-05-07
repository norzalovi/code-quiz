import React, { useState } from 'react'
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  makeStyles,
  Grid,
  Tooltip,
  Button

} from '@material-ui/core'
import MaterialTable from 'material-table'

import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  GroupAddTwoTone as GroupAddIcon,
  AssignmentTwoTone as Assignment,
  Delete as DeleteIcon
} from '@material-ui/icons'

import TestInviteDialog from './TestInviteDialog'
import ConfirmationDialog from '../shared-dialogs/ConfirmationDialog'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  },
  nameContainer: {
    width: '55%'
  },
  inviteIcon: {
    marginRight: theme.spacing(2)
  },
  circle: {
    background: 'none repeat scroll 0 0 #fff',
    border: '1px solid #cbcbcb',
    borderRadius: '100%',
    color: theme.palette.secondary.main,
    verticalAlign: 'middle',
    marginRight: '10px',
    padding: '6px 12px'
  },
  divider: {
    width: '1px',
    height: '5em',
    marginLeft: '3rem',
    boxShadow: '2px 2px 5px grey',
    /* color: red; */
    backgroundColor: 'rgba(224, 224, 224, 1)'
  }
}))

function GroupRow ({ row }) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const [state, setState] = useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Email', field: 'email' }
    ],
    users: [
      { name: 'Name', email: 'name@mail.com' },
      { name: 'Name', email: 'name@mail.com' }
    ]
  })

  const [inviteModalIsOpen, setInviteModalIsOpen] = useState(false)
  const [confirmationDialogIsOpen, setConfirmationDialogIsOpen] = useState(false)

  const handleConfirmationDialogOpen = () => {
    setConfirmationDialogIsOpen(true)
  }
  const handleConfirmationDialogClose = () => {
    setConfirmationDialogIsOpen(false)
  }

  const handleInviteModalOpen = () => {
    setInviteModalIsOpen(true)
  }

  const handleInviteModalClose = () => {
    setInviteModalIsOpen(false)
  }

  return (
    <>
      <TestInviteDialog
        open={inviteModalIsOpen}
        onClose={handleInviteModalClose}
        aria-labelledby='form-dialog-title'
      />
      <ConfirmationDialog
        open={confirmationDialogIsOpen}
        onClose={handleConfirmationDialogClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      />
      <TableRow
        className={classes.tableRow}
        hover
      >
        <TableCell>
          <Grid
            container
            direction='row'
            alignItems='center'
          >
            <Tooltip className={classes.inviteIcon} title='Invite Candidate'>
              <IconButton onClick={handleInviteModalOpen} aria-label='invite'>
                <GroupAddIcon fontSize='large' />
              </IconButton>
            </Tooltip>
            <Grid
              container
              direction='column'
              className={classes.nameContainer}
            >
              <Typography variant='body1'>SQL sample test</Typography>
              <Typography variant='body2' color='secondary'>Duration: 50 minutes , No. of problems: 3</Typography>
            </Grid>
            <Tooltip title='View Reports'>
              <IconButton onClick={() => setOpen(!open)} aria-label='report'>
                <Assignment fontSize='large' />
              </IconButton>
            </Tooltip>
            <Typography variant='body1'>Reports</Typography>
            <div className={classes.divider} />
          </Grid>

        </TableCell>

        <TableCell>
          <Grid
            container
            direction='row'
            alignItems='center'
          >
            <span className={classes.circle}>2</span>
            <Typography variant='body1'>Completed</Typography>
          </Grid>
        </TableCell>
        <TableCell>
          <Grid
            container
            direction='row'
            alignItems='center'
          >
            <span className={classes.circle}>2</span>
            <Typography variant='body1'>Incomplete</Typography>
          </Grid>
        </TableCell>
        <TableCell>
          <Grid
            container
            direction='row'
            alignItems='center'
          >
            <span className={classes.circle}>2</span>
            <Typography variant='body1'>Invited</Typography>
          </Grid>
        </TableCell>
        <TableCell>
          <Button onClick={handleConfirmationDialogOpen} variant='contained' color='secondary'>
            <DeleteIcon />
                    delete
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <MaterialTable
                title='Users who submited'
                columns={state.columns}
                data={state.users}
                actions={[
                  {
                    icon: 'launch',
                    tooltip: 'Open The Report List',
                    onClick: (event, rowData) => {
                      // Do save operation
                    }
                  }
                ]}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default GroupRow