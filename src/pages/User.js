import { filter } from 'lodash';
import { Icon } from '@iconify/react';
// import { sentenceCase } from 'change-case';
import React, { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// material
import {
  Card,
  Table,
  Stack,
  FormControl,
  FormLabel,
  Box,
  Select,
  Grid,
  MenuItem,
  Alert,
  LinearProgress,
  Collapse,
  IconButton,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TextField
} from '@mui/material';

// components
import Page from '../components/Page';
// import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
import USERLIST from '../_mocks_/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'action', label: 'Action', alignRight: true }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (a[orderBy] < b[orderBy]) {
    return -1;
  }
  if (a[orderBy] > b[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

async function getUsers(page, rowsPerPage, orderBy, order, id = "") {
  const baseUrl = process.env.REACT_APP_GATEWAY_URL;
  const url = new URL(`${baseUrl}/api/v1/member/employee/fetch`);
  const params = {
    Page: page + 1,
    Limit: rowsPerPage,
    SortBy: orderBy,
    Sort: order,
    ID: id,
  };
  url.search = new URLSearchParams(params).toString();
  const request = await fetch(url, {
    method: 'get'
  });
  const response = await request.json();
  return response;
}

async function getRoles() {
  const baseUrl = process.env.REACT_APP_GATEWAY_URL;
  const url = new URL(`${baseUrl}/api/v1/member/role/fetch`);
  const params = {
    Page: 1,
    Limit: 100
  };
  url.search = new URLSearchParams(params).toString();
  const request = await fetch(url, {
    method: 'get'
  });
  const response = await request.json();
  return response;
}

function postEmployee(args) {
  const baseUrl = process.env.REACT_APP_GATEWAY_URL;
  const url = new URL(`${baseUrl}/api/v1/member/employee/store`);

  const request = fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(args)
  }).then(res => res.json())
  .catch(err => console.log(err));
  return request;
}

function updateEmployee(args) {
  const baseUrl = process.env.REACT_APP_GATEWAY_URL;
  const url = new URL(`${baseUrl}/api/v1/member/employee/update`);

  const request = fetch(url, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(args)
  }).then(res => res.json())
  .catch(err => console.log(err));
  return request;
}

function deleteEmployee(employeeId) {
  const baseUrl = process.env.REACT_APP_GATEWAY_URL;
  const url = new URL(`${baseUrl}/api/v1/member/employee/delete`);

  const request = fetch(url, {
    method: 'delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ID: employeeId
    })
  }).then(res => res.json())
  .catch(err => console.log(err));
  return request;
}

export default function User() {
  const [page, setPage] = useState(0);
  const [init, setInit] = useState(true);
  const [order, setOrder] = useState('desc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('updated_at');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState({});
  const [roles, setRoles] = useState({});
  const [isForm, setIsForm] = useState(false);
  const [isAddButton, setIsAddButton] = useState(true);
  const [isButtonSaveDisabled, setIsButtonSaveDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState('');
  
  // form
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [IdNumber, setIdNumber] = useState('');
  const [departement, setDepartement] = useState('');
  const [position, setPosition] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRequired, setPasswordRequired] = useState(true);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordConfirmationRequired, setPasswordConfirmationRequired] = useState(true);
  
  // data process
  const [employee, setEmployee] = useState({});
  let numbering = (page) * rowsPerPage;
  const incrementNumbering = () => {
    numbering += 1; 
  }

  // icon
  const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

  useEffect(() => {
    if (init) {
      getUsers(page, rowsPerPage, orderBy, order).then((dataUsers) => setUsers(dataUsers));
      getRoles().then((dataRoles) => setRoles(dataRoles));
      setInit(false);
    }
  });

  const selector = useSelector(state => state.login);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsButtonSaveDisabled(true);
  
    const payloads = {
      ID: id,
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Department: departement,
      Position: position,
      IDNumber: IdNumber,
      Phone: phone,
      RoleID: role,
      Password: password,
      PasswordConfirmation: passwordConfirmation,
      CompanyID: selector.CompanyID,
    };
    if (id === "") {
      postEmployee(payloads)
        .then(
            data => {
              setEmployee(data)
              if (data.Status === 200) {
                  setInit(true);
                  clearForm();
                  setIsForm(false);
                  setIsAddButton(true);
              }else{
                setAlert(data.Message);
                setIsButtonSaveDisabled(false);
              }
            }
        )
      return
    }

    updateEmployee(payloads)
    .then(
        data => {
          setEmployee(data)
          if (data.Status === 200) {
              setInit(true);
              clearForm();
              setIsForm(false);
              setIsAddButton(true);
          }else{
            setAlert(data.Message);
            setIsButtonSaveDisabled(false);
          }
        }
    )
  }

  const handleDelete = (employeeId) => {
    deleteEmployee(employeeId).then(
      data => {
        if (data.Status === 200) {
            setInit(true);
            clearForm();
            setIsForm(false);
            setIsAddButton(true);
        }else{
          setAlert(data.Message);
        }
      }
    )
  }
  
  const clearForm = () => {
    setIsButtonSaveDisabled(false);
    setPasswordRequired(true);
    setPasswordConfirmationRequired(true);
    setAlert("");
    setId("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setIdNumber("");
    setRole("");
    setPassword("");
    setPasswordConfirmation("");
    setDepartement("");
    setPosition("");
  }

  const fillForm = (employee) => {
    setId(employee.ID)
    setFirstName(employee.FirstName)
    setLastName(employee.LastName)
    setPhone(employee.Phone)
    setEmail(employee.Account.Email)
    setIdNumber(employee.IdNumber)
    setRole(employee.RoleID)
    setPassword(employee.Password)
    setPasswordConfirmation(employee.PasswordConfirmation)
    setDepartement(employee.Departement)
    setPosition(employee.Position)
  }

  const handleId = (event) => {
    setId(event.target.value);
  };

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastname = (event) => {
    setLastName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePhone = (event) => {
    setPhone(event.target.value);
  };

  const handleRole = (event) => {
    setRole(event.target.value);
  };

  const handleIdNumber = (event) => {
    setIdNumber(event.target.value);
  };

  const handleDepartement = (event) => {
    setDepartement(event.target.value);
  };

  const handlePosition = (event) => {
    setPosition(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    console.log("masuk change page");
    console.log(newPage);
    setPage(newPage);
    // getUsers(page, rowsPerPage,orderBy,order).then((data) => setUsers(data));
    setInit(true);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleClickAdd = () => {
    if (isForm) {
      clearForm()
    }
    setIsForm(!isForm);
    setIsAddButton(!isAddButton);
  }

  const handleAction = (employeeId,type) => {
    switch(type){
      case "edit": {
        handleEdit(employeeId);
        return
      }
      /* falls through */
      case "delete": {
        handleDelete(employeeId);
        return
      }
      /* falls through */
      default : console.log("default");
    };
  }
  
  function handleEdit(employeeId){
    clearForm();

    setPasswordRequired(false)
    setPasswordConfirmationRequired(false)
    setIsForm(false);
    setIsAddButton(true);
    getUsers(0, 1, "updated_at", "desc", employeeId)
    .then(data => {
      if (data.Status === 200) {
        fillForm(data.Data.Items[0]);
        setIsForm(true);
        setIsAddButton(false);
      }else{
        console.log("error")
      }
    })
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Employee
          </Typography>
          { isAddButton && <Button
            onClick={handleClickAdd}
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New User
          </Button>}
        </Stack>

        {isLoading && (
          <Grid>
            <LinearProgress color="inherit" />
            <br />
            <LinearProgress color="inherit" />
            <br />
            <LinearProgress color="inherit" />
            <br />
            <LinearProgress color="inherit" />
            <br />
            <LinearProgress color="inherit" />
            <br />
          </Grid>
        )}
        {
          isForm && (
            <Box sx={{ 
              boxShadow: 3,
              borderRadius: 1 }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  id="id"
                  style={{display:"none"}}
                  type="text"
                  onChange={handleId}
                  value={id}
                />
                <Stack m={2} pt={3} pb={3}>
                  <Grid>
                    <Stack direction="row" alignItems="flex-end" justifyContent="space-around">
                      <Grid item xs>
                        {alert !== "" && (<Alert severity="error">{alert}</Alert>)}
                        <Typography variant="h3">{getIcon(peopleFill)} Form Employee</Typography>
                      </Grid>
                      <Grid item xs>
                        <Button style={{display:"block",float:"right"}} variant="contained" color="error" onClick={handleClickAdd}>
                          Cancel
                        </Button>
                      </Grid>
                    </Stack>
                  </Grid>
                  <br />
                  <Grid 
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="flex-start" 
                      spacing={3}>
                    <Grid item xs>
                      <FormControl fullWidth>
                        <FormLabel>Firstname </FormLabel>
                        <TextField
                          autoFocus={isForm}
                          required
                          id="FirstName"
                          fullWidth
                          type="text"
                          label="your firstname"
                          variant="outlined"
                          onChange={handleFirstName}
                          value={firstName}
                        />
                      </FormControl>
                      <br />
                      <FormControl fullWidth>
                        <FormLabel>Email</FormLabel>
                        <TextField
                          required
                          id="Email"
                          fullWidth
                          type="email"
                          label="your Email"
                          variant="outlined"
                          onChange={handleEmail}
                          value={email}
                        />
                      </FormControl>
                      <br />
                      <FormControl fullWidth>
                        <FormLabel>Phone</FormLabel>
                        <TextField
                          id="Phone"
                          fullWidth
                          type="text"
                          label="your Phone"
                          variant="outlined"
                          onChange={handlePhone}
                          value={phone}
                        />
                      </FormControl>
                      <br />
                      <FormControl fullWidth>
                        <FormLabel>Role</FormLabel>
                        <Select
                          required
                          onChange={handleRole}
                          defaultValue=""
                          labelId="demo-simple-select-label"
                          id="role"
                          value={role}
                        > 
                        <MenuItem value="">Please Select</MenuItem>
                        {
                          roles?.Data?.Items?.length > 0 && 
                          roles.Data.Items.map((row) => (
                              <MenuItem key={row.ID} value={row.ID}>{row.Name}</MenuItem>
                            )
                          )
                        }
                        </Select>
                      </FormControl>
                      <br />
                      <FormControl fullWidth>
                        <FormLabel>Password</FormLabel>
                        <TextField
                          required = {passwordRequired}
                          id="Password"
                          fullWidth
                          type="password"
                          label="your password"
                          variant="outlined"
                          onChange={handlePassword}
                          value={password}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs>
                      <FormControl fullWidth>
                        <FormLabel>Lastname</FormLabel>
                        <TextField
                          required
                          id="Lastname"
                          fullWidth
                          type="text"
                          label="your Lastname"
                          variant="outlined"
                          onChange={handleLastname}
                          value={lastName}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <FormLabel>ID Number</FormLabel>
                        <TextField
                          id="IDNumber"
                          fullWidth
                          type="text"
                          label="your ID Number"
                          variant="outlined"
                          onChange={handleIdNumber}
                          value={IdNumber}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <FormLabel>Departement</FormLabel>
                        <TextField
                          id="Departement"
                          fullWidth
                          type="text"
                          label="your Departement"
                          variant="outlined"
                          onChange={handleDepartement}
                          value={departement}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <FormLabel>Position</FormLabel>
                        <TextField
                          id="Position"
                          fullWidth
                          type="text"
                          label="your Position"
                          variant="outlined"
                          onChange={handlePosition}
                          value={position}
                        />
                      </FormControl>
                      <br />
                      <FormControl fullWidth>
                        <FormLabel>Confirm Password</FormLabel>
                        <TextField
                          required = {passwordConfirmationRequired}
                          id="ConfirmPassword"
                          fullWidth
                          type="password"
                          label="Confirm Password"
                          variant="outlined"
                          onChange={handleConfirmPassword}
                          value={passwordConfirmation}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <br />
                  <FormControl fullWidth>
                    <Button disabled={isButtonSaveDisabled} type="submit" variant="contained" color="primary">
                      save
                    </Button>
                  </FormControl>
                </Stack>
              </form>
            </Box>
          )
        }
        {
          employee.Message !== "" || employee.Message !== "undefined" && (
            <Box sx={{ width: '100%' }}>
              <Collapse in>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                    >
                      {/* <CloseIcon fontSize="inherit" /> */}
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  {employee.Message}
                </Alert>
              </Collapse>
            </Box>
          )
        }
        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={users?.Data?.Items?.length > 0 ? users?.Data?.Items?.length : 0 }
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {
                    users?.Data?.Items?.length > 0 &&
                    users.Data.Items.map((row) => {
                      const id = row.ID;
                      const name = row.FirstName;
                      const role = row.Role.Name;
                      const status = row.Account.Status;
                      const companyName = row.Company.Name;
                      const phone = row.Phone;
                      const isItemSelected = selected.indexOf(name) !== -1;
                      incrementNumbering();
                      return (
                        <TableRow>
                          <TableCell alignItems="center">
                            {numbering}
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src="" />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{companyName}</TableCell>
                          <TableCell align="left">{role}</TableCell>
                          <TableCell align="left">{phone}</TableCell>
                          <TableCell align="left">{status ? 'Actived' : 'Not Active'}</TableCell>
                          <TableCell align="right">
                            <UserMoreMenu employeeId={id} handleAction={handleAction} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={5} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users?.Data?.TotalRows !== 0 ? users?.Data?.TotalRows : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            showFirstButton
            showLastButton
          />
        </Card>
      </Container>
    </Page>
  );
}
