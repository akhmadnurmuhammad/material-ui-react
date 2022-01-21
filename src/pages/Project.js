// import { filter, orderBy } from 'lodash';
// import { icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
// import plusFill from '@iconify/icons-eva/plus-fill';
// import folderFill from '@iconify/icons-eva/folder-fill';
// import { Link as RouterLink } from 'react-router-dom';
// import moment from 'moment';
// // import { useSelector } from 'react-redux';
// // material

import {
//     Card,
//     Checkbox,
//     Table,
//     Stack,
//     FormControl,
//     FormLabel,
//     Box,
//     Select,
//     Grid,
//     MenuItem,
//     Alert,
//     LinearProgress,
//     Collapse,
//     IconButton,
//     Avatar,
//     Button,
//     TableRow,
//     TableBody,
//     TableCell,
//     Container,
    Typography,
//     TableContainer,
//     TablePagination,
//     Icon,
//     TextField
} from '@mui/material';

// components
// import Page from '../components/Page';
// import Scrollbar from '../components/Scrollbar';
// import SearchNotFound from '../components/SearchNotFound';
// import { UserListHead, UserMoreMenu } from '../components/_dashboard/user';

// const TABLE_HEAD = [
//     {id:'name', label:'Name', alignRight: false },
//     {id:'status', label:'Status', alignRight: false },
//     {id:'isActive', label:'Is Active', alignRight: false },
//     {id:'lastUpdated', label:'Last Updated', alignRight: false },
//     {id:'action', label:'Action', alignRight: true}
// ];

// function descendingComparator(a,b,orderBy) {
//     if (a[orderBy] < b[orderBy]) {
//         return -1;
//     }
//     if (a[orderBy] > b[orderBy]) {
//         return 1;
//     }
//     return 0
// }

// function getComparator(order, orderBy) {
//     return order === 'desc'
//     ? (a, b) => descendingComparator(a,b,orderBy)
//     : (a, b) => -descendingComparator(a,b,orderBy);
// }

// function applySortFilter(array, comparator, query) {
//     const stabilizedThis = array.map((el, index) => [el,index]);
//     stabilizedThis.sort((a,b) => {
//         const order = comparator(a[0]. b[0]);
//         if (order !== 0) return order;
//         return a[1] - b[1];
//     });

//     if(query) {
//         return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
//     }
//     return stabilizedThis.map((el) => el[0])
// }

// async function getProjects(parameter){
//     console.log(parameter);
//     const baseUrl = process.env.REACT_APP_GATEWAY_URL;
//     const url = new URL(`${baseUrl}/api/v1/member/project/fetch`);
//     url.search = new URLSearchParams(parameter).toString();
//     const request = await fetch(url,{
//         method: "get"
//     });
//     const response = await request.json();
//     return response;
// }

// async function postProjects(parameter){
//     const baseUrl = process.env.REACT_APP_GATEWAY_URL;
//     const url = new URL(`${baseUrl}/api/v1/member/project/store`);
//     const data = await fetch(url,{
//         method: "post",
//         data: JSON.stringify(parameter)
//     }).then(res => res.json()).catch(err => console.log(err));
//     return data;
// }

// async function updateProjects(parameter){
//     const baseUrl = process.env.REACT_APP_GATEWAY_URL;
//     const url = new URL(`${baseUrl}/api/v1/member/project/update`);
//     const data = await fetch(url,{
//         method: "put",
//         data: JSON.stringify(parameter)
//     }).then(res => res.json()).catch(err => console.log(err));
//     return data;
// }

// async function deleteProjects(projectId){
//     const baseUrl = process.env.REACT_APP_GATEWAY_URL;
//     const url = new URL(`${baseUrl}/api/v1/member/project/delete`);
//     const data = await fetch(url,{
//         method: "delete",
//         data: JSON.stringify({
//             ID: projectId
//         })
//     }).then(res => res.json()).catch(err => console.log(err));
//     return data;
// }


export default function Project() {
    // const [projects,setProjects] = useState({});
    const [init, setInit] = useState('');
    setInit('ada value');
    console.log(init);

    // paging
    // const [page, setPage] = useState(0);
    // const [filterName, setFilterName] = useState('');
    // const [order, setOrder] = useState('desc');
    // const [selected, setSelected] = useState([]);
    // const [orderBy, setOrderBy] = useState('updated_at');
    // const [rowsPerPage, setRowsPerPage] = useState(10);
    
    
    // const handleChangePage = (event, newPage) => {
    //     console.log(newPage);
    //     setPage(newPage);
    //     setInit(true);
    // };
    
    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(1);
    //   };

    // const [id, setId] = useState('');
    // const handleId = (event) => {
    //     setId(event.target.value);
    // }

    
    // used if b2b business process
    const [companyBaruNIhBeda, setCompanyBaruNIhBeda] = useState('');
    // const handleCompanyId = (companyId) => {
    //     setCompany(companyId);
    // }
    // const selector = useSelector(state => state.login);
    // handleCompanyId(selector.CompanyID);
    // const companyID = selector.CompanyID
    // console.log("ini selector",selector);
    // setCompanyBaruNIhBeda("ini yang baru");
    
    // console.log("ini beda",companyID);
    // setCompanyId(companyID);
    // handleCompanyId(selector.CompanyId);
    // if (selector.Role.Name.toLowerCase() != "superadmin") {
    // }
    
    // const [alert,setAlert] = useState('');
    // const handleAlert = (alert) => {
    //     setAlert(alert);
    // }
    
    // const getIcon = (name) => <Icon icon={name} width={22} height={22} />;
    // const [isForm,setIsForm] = useState(false);
    // const [isLoading,setIsLoading] = useState(false);

    // const [projectId,setProjectId] = useState('');
    // const handleProjectId = (projectId) => {
    //     setProjectId(projectId);
    // }
    
    // const [name,setName] = useState('');
    // const handleName = (name) => {
    //     setName(name);
    // }

    // const [projectName,setProjectName] = useState('');
    // const handleProjectName = (event) => {
    //     setProjectName(event.target.value);
    // }

    // // setProjectName("asasda");

    // const [status,setStatus] = useState('');
    // const handleStatus = (event) => {
    //     setStatus(event.target.value);
    // }

    // const [isActive,setIsActive] = useState(false);
    // const handleIsActive = (isActive) => {
    //     setIsActive(isActive);
    // }

    

    // const clearForm = () => {
    //     setIsButtonSaveDisabled(false);
    //     setId("")
    //     setName("")
    //     setStatus("")
    //     setIsActive(false)
    // }
    
    // const fillForm = (project) => {
    //     console.log(project);
    //     setId(project.ID)
    //     setName(project.ProjectName)
    //     setIsActive(project.IsActive)
    //     setStatus(project.Status)
    // }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setIsButtonSaveDisabled(true);
        
    //     // const selector = useSelector(state => state.login);
    //     // const companyID = selector.CompanyID
    //     const payloads = {
    //       ID: id,
    //       ProjectName: projectName,
    //       Status: status,
    //       IsActive: isActive,
    //     //   CompanyID: companyID,
    //     };

    //     if (id === "") {
    //       postProjects(payloads)
    //         .then(
    //             data => {
    //               setProjects(data)
    //               if (data.Status === 200) {
    //                   setInit(true);
    //                   clearForm();
    //                   setIsForm(false);
    //                   setIsAddButton(true);
    //               }else{
    //                 setAlert(data.Message);
    //                 setIsButtonSaveDisabled(false);
    //               }
    //             }
    //         )
    //       return
    //     }
    
    //     updateProjects(payloads)
    //     .then(
    //         data => {
    //           setProjects(data)
    //           if (data.Status === 200) {
    //               setInit(true);
    //               clearForm();
    //               setIsForm(false);
    //               setIsAddButton(true);
    //           }else{
    //             setAlert(data.Message);
    //             setIsButtonSaveDisabled(false);
    //           }
    //         }
    //     )
    // }
    

    // const handleAction = (projectId,type) => {
    //     switch(type){
    //         case "edit": {
    //         handleEdit(projectId);
    //         return
    //         }
    //         /* falls through */
    //         case "delete": {
    //         handleDelete(projectId);
    //         return
    //         }
    //         /* falls through */
    //         default : console.log("default");
    //     };
    // }
    
    // function handleEdit(projectId){
    //     clearForm();
    //     console.log(projectId);
    //     setIsForm(false);
    //     setIsAddButton(true);
    //     const params = {
    //         Page: page,
    //         SortBy: "updated_at",
    //         Sort: "desc",
    //         Limit: rowsPerPage,
    //         ID: projectId,
    //     }
    //     getProjects(params)
    //     .then(data => {
    //       if (data.Status === 200) {
    //         fillForm(data.Data.Items[0]);
    //         setIsForm(true);
    //         setIsAddButton(false);
    //       }else{
    //         console.log("error")
    //       }
    //     })
    // }

    // const handleDelete = (projectId) => {
    //     deleteProjects(projectId).then(
    //     data => {
    //         if (data.Status === 200) {
    //             setInit(true);
    //             clearForm();
    //             setIsForm(false);
    //             setIsAddButton(true);
    //         }else{
    //             setAlert(data.Message);
    //         }
    //     })
    // }

    // const handleAdd = () => {
    //     if (isForm) {
    //         setIsLoading(true);
    //         // timeout(2000);
    //         clearForm();
    //         setIsLoading(false);
    //     }
    //     setIsForm(!isForm);
    //     setIsAddButton(!isAddButton);
    // }

    // let numbering = (page) * rowsPerPage;
    // const incrementNumbering = () => {
    //     numbering += 1; 
    // }

    // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - projects?.Data?.Items?.length) : 0;
    // const [isButtonSaveDisabled, setIsButtonSaveDisabled] = useState(false);
    // const [isAddButton, setIsAddButton] = useState(true);
    // const isDataNotFound = projects?.Data?.Items?.length <= 0;
    // const params = {
    //     Page: 0,
    //     SortBy: "updated_at",
    //     Sort: "desc",
    //     Limit: 10
    // }
    
    // setProjects({});
    // getProjects(params).then((res) => (setProjects(res)));

    // useEffect(() => {
    //     console.log("ini init ",init);
    //     // console.log("ini company ",company);
    //     if(init) {
    //         setInit(false);
    //     }
    // },[init])
    
   
    return (
        <Typography variant="h4" gutterBottom>
            Project
        </Typography>
        // <Page title="Project | Minimal-UI">
        //     <Container>
        //         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        //             <Typography variant="h4" gutterBottom>
        //                 Project
        //             </Typography>
        //             {
        //                 isAddButton && (
        //                     <Button
        //                         onClick={() => {
        //                             handleAdd();
        //                         }}
        //                         variant="contained"
        //                         component={RouterLink}
        //                         to="#"
        //                         startIcon={<Icon icon={plusFill} />}
        //                     >
        //                         New Project
        //                     </Button>
        //                 )
        //             }
                    
        //         </Stack>
        //         {
        //             isLoading && (
        //                 <Grid>
        //                     <LinearProgress color="inherit"/>
        //                     <br />
        //                     <LinearProgress color="inherit"/>
        //                     <br />
        //                     <LinearProgress color="inherit"/>
        //                     <br />
        //                     <LinearProgress color="inherit"/>
        //                     <br />
        //                     <LinearProgress color="inherit"/>
        //                     <br />
        //                 </Grid>
        //             )
        //         }
        //         {
        //             isForm && (
        //                 <Box
        //                     boxShadow={3}
        //                     borderRadius={1}
        //                 >
        //                     <form>
        //                         <TextField
        //                             disabled
        //                             style={{display:"none"}}
        //                             id="id"
        //                             value={id}
        //                             // onSubmit={handleSubmit}
        //                         />
        //                         <Stack m={2} pt={3} pb={3}>
        //                             <Grid>
        //                                 <Stack direction="row" justifyContent="space-around">
        //                                     <Grid>
        //                                         {alert !== "" && (<Alert severity="error">{alert}</Alert>)}
        //                                         <Typography variant="h3">{getIcon(folderFill)} Form Project</Typography>
        //                                     </Grid>
        //                                     <Grid item xs>
        //                                         <Button onClick={() => {
        //                                             handleAdd();
        //                                         }} style={{display:"block",float:"right"}} variant="contained" color="error" >
        //                                             Cancel
        //                                         </Button>
        //                                     </Grid>
        //                                 </Stack>
        //                             </Grid>
        //                             <br />
        //                             <Grid
        //                                 container
        //                                 direction="row"
        //                                 justifyContent="center"
        //                                 alignItems="flex-start" 
        //                                 spacing={3}>
        //                                 <Grid item xs>
        //                                 <FormControl fullWidth>
        //                                     <FormLabel>Project Name </FormLabel>
        //                                     <TextField
        //                                     autoFocus={isForm}
        //                                     required
        //                                     id="name"
        //                                     fullWidth
        //                                     type="text"
        //                                     label="project name"
        //                                     variant="outlined"
        //                                     onChange={handleProjectName}
        //                                     value={projectName}
        //                                     />
        //                                 </FormControl>
        //                                 <br />
        //                                 </Grid>
        //                                 <Grid item xs>
        //                                 <FormControl fullWidth>
        //                                     <FormLabel>Status </FormLabel>
        //                                     <TextField
        //                                     autoFocus={isForm}
        //                                     required
        //                                     id="status"
        //                                     fullWidth
        //                                     type="text"
        //                                     label="project Status"
        //                                     variant="outlined"
        //                                     onChange={handleStatus}
        //                                     value={status}
        //                                     />
        //                                 </FormControl>
        //                                 <br />
        //                                 </Grid>
        //                                 <Grid alignContent="center" alignItems="center" item xs>
        //                                     Is Active?
        //                                     <Checkbox onChange={handleIsActive} id="active" defaultChecked={isActive} color="success" />
        //                                 <br />
        //                                 </Grid>
        //                             </Grid>
        //                             <br />
        //                             <FormControl fullWidth>
        //                                 <Button disabled={isButtonSaveDisabled} type="submit" variant="contained" color="primary">
        //                                 save
        //                                 </Button>
        //                             </FormControl>
        //                         </Stack>
        //                     </form>
        //                 </Box>
        //             )
        //         }
        //         <Card>
        //             <Scrollbar>
        //                 <TableContainer sx={{ minWidth: 800 }}>
        //                 <Table>
        //                     <UserListHead
        //                     order={order}
        //                     orderBy={orderBy}
        //                     headLabel={TABLE_HEAD}
        //                     rowCount={projects?.Data?.TotalRows > 0 ? projects?.Data?.TotalRows : 0 }
        //                     numSelected={selected.length}
        //                     />
        //                     <TableBody>
        //                     {
        //                         projects?.Data?.Items?.length > 0 &&
        //                         projects.Data.Items.map((row) => {
        //                         const isItemSelected = selected.indexOf(name) !== -1;
        //                         incrementNumbering();
        //                         return (
        //                             <TableRow>
        //                                 <TableCell alignItems="center">
        //                                     {numbering}
        //                                 </TableCell>
        //                                 <TableCell component="th" scope="row" padding="none">
        //                                     <Typography variant="subtitle2" noWrap>
        //                                         {row.ProjectName}
        //                                     </Typography>
        //                                 </TableCell>
        //                                 <TableCell align="left">{row.Status}</TableCell>
        //                                 <TableCell align="left">{row.IsActive ? 'Actived' : 'Not Active'}</TableCell>
        //                                 <TableCell align="left">{`${row.UpdatedBy} ${moment.utc(row.UpdatedAt).local().startOf('seconds').fromNow()}`}</TableCell>
        //                                 <TableCell align="right">
        //                                     <UserMoreMenu id={row.ID} handleAction={handleAction} />
        //                                 </TableCell>
        //                             </TableRow>
        //                         );
        //                         })}
        //                     {emptyRows > 0 && (
        //                         <TableRow style={{ height: 53 * emptyRows }}>
        //                         <TableCell colSpan={5} />
        //                         </TableRow>
        //                     )}
        //                     </TableBody>
        //                     {isDataNotFound && (
        //                     <TableBody>
        //                         <TableRow>
        //                         <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
        //                             <SearchNotFound searchQuery={filterName} />
        //                         </TableCell>
        //                         </TableRow>
        //                     </TableBody>
        //                     )}
        //                 </Table>
        //                 </TableContainer>
        //             </Scrollbar>

        //             <TablePagination
        //                 rowsPerPageOptions={[5, 10, 25]}
        //                 component="div"
        //                 count={projects?.Data?.TotalRows !== 0 ? projects?.Data?.TotalRows : 0}
        //                 rowsPerPage={rowsPerPage}
        //                 page={page}
        //                 onPageChange={handleChangePage}
        //                 onRowsPerPageChange={handleChangeRowsPerPage}
        //                 showFirstButton
        //                 showLastButton
        //             />
        //             </Card>
        //     </Container>
        // </Page>
    )
}