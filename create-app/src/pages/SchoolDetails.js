import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Nav from "../components/AdminNavBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Logout from "../components/Logout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import { useDropzone } from 'react-dropzone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import DropdownMenuItem from '@mui/material/MenuItem';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
import { visuallyHidden } from '@mui/utils';
import Checkbox from '@mui/material/Checkbox';
import * as XLSX from 'xlsx';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const BASE_URL = "http://healthworker.amritacreate.org/LeveledBooks/api/";

const validatePhoneNumber = (phone) => {
  const phonePattern = /^\d{10}$/;
  return phonePattern.test(phone);
};

const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const SchoolDetails = () => {
  const { schoolId } = useParams();
  const [schoolName, setSchoolName] = useState("");
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [openAddStudentModal, setOpenAddStudentModal] = useState(false);
  const [individualForm, setIndividualForm] = useState({
    name: '',
    username: '',
    password: '',
    parentMobile: '',
    parentEmail: ''
  });
  const [classId, setClassId] = useState(null);
  const [divisionId, setDivisionId] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const [uploadedStudents, setUploadedStudents] = useState([]);
  const [bulkUploadMessage, setBulkUploadMessage] = useState("");
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true); // State to control the Add Students button
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleOpenStudentModal = async (classId, divisionId) => {
    try {
      const studentResponse = await fetch(`${BASE_URL}getstudents/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ school_id: schoolId, class_id: classId, division_id: divisionId }),
      });
      if (!studentResponse.ok) {
        throw new Error(`Failed to fetch students: ${studentResponse.statusText}`);
      }
      const studentData = await studentResponse.json();
      setStudents(studentData.student_list || []);
      setOpenStudentModal(true);
    } catch (error) {
      console.error("Error fetching students:", error);
      setError(error.message);
    }
  };

  const handleCloseStudentModal = () => {
    setOpenStudentModal(false);
    setStudents([]);
    setSelected([]);
  };

  const handleOpenAddStudentModal = (classId, divisionId) => {
    setClassId(classId);
    setDivisionId(divisionId);
    setBulkUploadMessage(""); // Clear message on modal open
    setIsAddButtonDisabled(true); // Disable the Add Students button
    setOpenAddStudentModal(true);
  };

  const handleCloseAddStudentModal = () => {
    setOpenAddStudentModal(false);
    setIndividualForm({
      name: '',
      username: '',
      password: '',
      parentMobile: '',
      parentEmail: ''
    });
    setUploadedStudents([]);
    setBulkUploadMessage("");
    setIsAddButtonDisabled(true);
  };

  const handleIndividualFormChange = (event) => {
    const { name, value } = event.target;
    setIndividualForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = students.map((student) => student.student_id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const downloadTemplate = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([
      { name: '', username: '', password: '', parentMobile: '', parentEmail: '' }
    ]);
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "student_template.xlsx");
  };

  const handleFileUpload = (file) => {
    setBulkUploadMessage(""); // Clear message on new file selection
    setIsAddButtonDisabled(true); // Disable the Add Students button on new file selection
    processFile(file);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setBulkUploadMessage(""); // Clear message on new file selection
    setIsAddButtonDisabled(true); // Disable the Add Students button on new file selection
    if (acceptedFiles.length > 0) {
      processFile(acceptedFiles[0]);
    }
  }, []);

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

      // Client-side validation
      const validRows = [];
      const namesSet = new Set();
      const usernamesSet = new Set();

      for (const row of rows.slice(1)) {  // Skip the header row
        if (row.length < 5) {
          setBulkUploadMessage("Each row must contain name, username, password, parent mobile, and parent email.");
          return;
        }
        const [name, username, password, parentMobile, parentEmail] = row;
        if (!name || !username || !password || !parentMobile || !parentEmail) {
          setBulkUploadMessage("All fields are required.");
          return;
        }
        if (!validatePhoneNumber(parentMobile)) {
          setBulkUploadMessage("Invalid phone number. It should be 10 digits.");
          return;
        }
        if (!validateEmail(parentEmail)) {
          setBulkUploadMessage("Invalid email address.");
          return;
        }
        if (namesSet.has(name) || usernamesSet.has(username)) {
          setBulkUploadMessage("Duplicate name or username found.");
          return;
        }
        namesSet.add(name);
        usernamesSet.add(username);
        validRows.push({ name, username, password, parentMobile, parentEmail });
      }

      setUploadedStudents(validRows);
      setBulkUploadMessage("Verification is complete. You can now add the students.");
      setIsAddButtonDisabled(false); // Enable the Add Students button after successful validation
    };
    reader.readAsArrayBuffer(file);
  };

  const handleIndividualFormSubmitInternal = async (event) => {
    event.preventDefault();
    if (!validatePhoneNumber(individualForm.parentMobile)) {
      setBulkUploadMessage("Invalid phone number. It should be 10 digits.");
      return;
    }
    if (!validateEmail(individualForm.parentEmail)) {
      setBulkUploadMessage("Invalid email address.");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}addstudent/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: individualForm.name,
          username: individualForm.username,
          password: individualForm.password,
          role: 3,
          created_by: 2, // Assuming created_by is fixed; adjust as needed
          student_class: classId,
          division: divisionId,
          school: schoolId,
          mobile: individualForm.parentMobile,
          email: individualForm.parentEmail,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        if (result.message && result.message.includes("This username already in use!")) {
          setBulkUploadMessage("The username already exists. Please choose a different username.");
        } else {
          setBulkUploadMessage(result.message || 'Failed to add student');
        }
        throw new Error(result.message || 'Failed to add student');
      }
      setBulkUploadMessage('Student added successfully');
      setSnackbarMessage('Student added successfully');
      setSnackbarOpen(true);
      handleCloseAddStudentModal();
      handleOpenStudentModal(classId, divisionId); // Refresh the student list in the modal
    } catch (error) {
      console.error("Error adding student:", error);
      setBulkUploadMessage(error.message);
    }
  };

  const handleAddBulkStudentsInternal = async () => {
    let successfulAdds = 0;
    let failedAdds = [];

    for (const student of uploadedStudents) {
      try {
        const response = await fetch(`${BASE_URL}addstudent/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: student.name,
            username: student.username,
            password: student.password,
            role: 3,
            created_by: 2,  // Assuming created_by is fixed; adjust as needed
            student_class: classId,
            division: divisionId,
            school: schoolId,
            mobile: student.parentMobile,
            email: student.parentEmail,
          }),
        });
        const result = await response.json();
        if (response.ok) {
          if (result.message === "This username already in use!") {
            failedAdds.push({ username: student.username, message: result.message });
          } else {
            successfulAdds++;
            console.log(successfulAdds);
            console.log(result.message);
            console.log("Added student successfully");
          }
        } else {
          failedAdds.push({ username: student.username, message: result.message || 'Failed to add student' });
        }
      } catch (error) {
        console.error("Error adding student:", error);
        failedAdds.push({ username: student.username, message: error.message });
      }
    }

    if (failedAdds.length === 0) {
      setBulkUploadMessage('All students added successfully');
    } else if (successfulAdds === 0) {
      setBulkUploadMessage(`Failed to add all students. The following students already exist:\n${failedAdds.map(e => `${e.username}: ${e.message}`).join('\n')}`);
    } else if (successfulAdds > 0 && successfulAdds < uploadedStudents.length) {
      setBulkUploadMessage(`Successfully added ${successfulAdds} students. The following students already exist:\n${failedAdds.map(e => `${e.username}: ${e.message}`).join('\n')}`);
    } else {
      setBulkUploadMessage(`Successfully added ${successfulAdds} students. Failed to add the following students:\n${failedAdds.map(e => `${e.username}: ${e.message}`).join('\n')}`);
    }

    if (failedAdds.length > 0) {
      downloadFailedEntriesReport(failedAdds);
    }
  };

  const downloadFailedEntriesReport = (failedEntries) => {
    const ws = XLSX.utils.json_to_sheet(failedEntries);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "FailedEntries");
    XLSX.writeFile(wb, "failed_entries_report.xlsx");
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchSchoolDetails = async () => {
      try {
        const schoolResponse = await fetch(`${BASE_URL}getschools/`);
        if (!schoolResponse.ok) {
          throw new Error(`Failed to fetch schools: ${schoolResponse.statusText}`);
        }
        const schoolData = await schoolResponse.json();
        const selectedSchool = schoolData.schools.find(school => school.id === parseInt(schoolId));
        if (!selectedSchool) {
          throw new Error(`School with ID ${schoolId} not found.`);
        }
        setSchoolName(selectedSchool.school_name);

        const classResponse = await fetch(`${BASE_URL}getclasswithdivision/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ school_id: schoolId }),
        });
        if (!classResponse.ok) {
          throw new Error(`Failed to fetch classes: ${classResponse.statusText}`);
        }
        const classData = await classResponse.json();
        setClasses(classData.classes_divisions || []);

        const teacherResponse = await fetch(`${BASE_URL}getteachers/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ school_id: schoolId }),
        });
        if (!teacherResponse.ok) {
          throw new Error(`Failed to fetch teachers: ${teacherResponse.statusText}`);
        }
        const teacherData = await teacherResponse.json();
        setTeachers(teacherData.teacher_list || []);
      } catch (error) {
        console.error("Error fetching details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolDetails();
  }, [schoolId]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Fragment>
      <div id="wrapper">
        <Nav />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header />
            <div className="container-fluid">
              <h1 className="h3 mb-1 text-gray-800">{schoolName}</h1>

              <TeachersTable teachers={teachers} />

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow style={{ backgroundColor: '#37474f' }}>
                      <TableCell style={{ color: '#ffffff' }}>Class</TableCell>
                      <TableCell style={{ color: '#ffffff' }}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(classes) && classes.length > 0 ? (
                      classes.map((cls) => (
                        <Row key={cls.class_id} row={cls} handleOpenStudentModal={handleOpenStudentModal} handleOpenAddStudentModal={handleOpenAddStudentModal} />
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} align="center">
                          No classes found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <Logout />

      <StudentModal
        open={openStudentModal}
        handleClose={handleCloseStudentModal}
        students={students}
        order={order}
        orderBy={orderBy}
        page={page}
        rowsPerPage={rowsPerPage}
        selected={selected}
        handleRequestSort={handleRequestSort}
        handleSelectAllClick={handleSelectAllClick}
        handleClick={handleClick}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        isSelected={isSelected}
        bulkUploadMessage={bulkUploadMessage}
      />

      <AddStudentModal
        open={openAddStudentModal}
        handleClose={handleCloseAddStudentModal}
        individualForm={individualForm}
        handleIndividualFormChange={handleIndividualFormChange}
        handleIndividualFormSubmit={handleIndividualFormSubmitInternal}
        downloadTemplate={downloadTemplate}
        handleFileUpload={handleFileUpload}
        handleAddBulkStudents={handleAddBulkStudentsInternal}
        uploadedStudents={uploadedStudents}
        bulkUploadMessage={bulkUploadMessage}
        setBulkUploadMessage={setBulkUploadMessage}
        isAddButtonDisabled={isAddButtonDisabled}
        setIsAddButtonDisabled={setIsAddButtonDisabled}
        onDrop={onDrop}
        setIndividualForm={setIndividualForm} // Added here
        setUploadedStudents={setUploadedStudents} // Added here
        classId={classId}
        divisionId={divisionId}
        schoolId={schoolId}
      />

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Fragment>
  );
};

const TeachersTable = ({ teachers }) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box marginBottom={2}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Teachers</TableCell>
              <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box margin={1}>
                    <Table size="small" aria-label="teachers">
                      <TableHead>
                        <TableRow>
                          <TableCell>Teacher Name</TableCell>
                          <TableCell>Phone</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {teachers.length > 0 ? (
                          teachers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((teacher) => (
                            <TableRow key={teacher.teacher_id}>
                              <TableCell>{teacher.name}</TableCell>
                              <TableCell>{teacher.phone || "N/A"}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={2} align="center">
                              No teachers found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={teachers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

const Row = ({ row, handleOpenStudentModal, handleOpenAddStudentModal }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell style={{ color: '#00796b', fontWeight: 'bold' }}>{row.class_name}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="divisions">
                <TableHead>
                  <TableRow>
                    <TableCell>Division</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.divisions.length > 0 ? (
                    row.divisions.map((division) => (
                      <TableRow key={division.division_id}>
                        <TableCell>{division.division_name}</TableCell>
                        <TableCell>
                          <IconButton aria-label="more" onClick={handleMenuClick}>
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                          >
                            <DropdownMenuItem onClick={() => { handleOpenStudentModal(row.class_id, division.division_id); handleMenuClose(); }}>
                              <VisibilityIcon /> View Students
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { handleOpenAddStudentModal(row.class_id, division.division_id); handleMenuClose(); }}>
                              <AddIcon /> Add Students
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { /* handle edit students logic */ handleMenuClose(); }}>
                              <EditIcon /> Edit Students
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { /* handle delete students logic */ handleMenuClose(); }}>
                              <DeleteIcon /> Delete Students
                            </DropdownMenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        <Button variant="contained" size="small" onClick={() => handleOpenAddStudentModal(row.class_id, null)}>
                          Add Students
                        </Button>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const StudentModal = ({
  open,
  handleClose,
  students,
  order,
  orderBy,
  page,
  rowsPerPage,
  selected,
  handleRequestSort,
  handleSelectAllClick,
  handleClick,
  handleChangePage,
  handleChangeRowsPerPage,
  isSelected,
  bulkUploadMessage
}) => {
  const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'phone', numeric: false, disablePadding: false, label: 'Phone' },
    { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  ];

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            height: '80%',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            overflow: 'auto',
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <h2>Students</h2>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={selected.length > 0 && selected.length < students.length}
                      checked={students.length > 0 && selected.length === students.length}
                      onChange={handleSelectAllClick}
                      inputProps={{ 'aria-label': 'select all students' }}
                    />
                  </TableCell>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      padding={headCell.disablePadding ? 'none' : 'normal'}
                      sortDirection={orderBy === headCell.id ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={(event) => handleRequestSort(event, headCell.id)}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(students, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((student, index) => {
                    const isItemSelected = isSelected(student.student_id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, student.student_id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={student.student_id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {student.name}
                        </TableCell>
                        <TableCell align="left">{student.mobile}</TableCell>
                        <TableCell align="left">{student.username}</TableCell>
                        <TableCell align="left">{student.email}</TableCell>
                      </TableRow>
                    );
                  })}
                {students.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No students found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={students.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {bulkUploadMessage && <Alert severity="info" style={{ marginTop: '10px' }}>{bulkUploadMessage}</Alert>}
        </Box>
      </Fade>
    </Modal>
  );
};

const AddStudentModal = ({
  open,
  handleClose,
  individualForm,
  handleIndividualFormChange,
  handleIndividualFormSubmit,
  downloadTemplate,
  handleFileUpload,
  handleAddBulkStudents,
  uploadedStudents,
  bulkUploadMessage,
  setBulkUploadMessage,
  isAddButtonDisabled,
  setIsAddButtonDisabled,
  onDrop,
  classId,
  divisionId,
  schoolId,
  setIndividualForm,
  setUploadedStudents,
}) => {
  const [addOption, setAddOption] = useState(null);
  const [fileName, setFileName] = useState("");

  const resetModalState = useCallback(() => {
    setAddOption(null);
    setFileName("");
    setBulkUploadMessage("");
    setIsAddButtonDisabled(true);
    setIndividualForm({
      name: '',
      username: '',
      password: '',
      parentMobile: '',
      parentEmail: ''
    });
    setUploadedStudents([]);
  }, [setAddOption, setFileName, setBulkUploadMessage, setIsAddButtonDisabled, setIndividualForm, setUploadedStudents]);

  useEffect(() => {
    if (!open) {
      resetModalState();
    }
  }, [open, resetModalState]);

  const handleAddOptionChange = (event) => {
    setAddOption(event.target.value);
    setBulkUploadMessage("");
    setIsAddButtonDisabled(true);
    setFileName("");
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setBulkUploadMessage("");
      setIsAddButtonDisabled(true);
      if (acceptedFiles.length > 0) {
        handleFileUpload(acceptedFiles[0]);
        setFileName(acceptedFiles[0].name);
      }
    },
    accept: '.xlsx, .xls'
  });

  const handleFileUploadInternal = (event) => {
    setBulkUploadMessage("");
    setIsAddButtonDisabled(true);
    if (event.target.files.length > 0) {
      handleFileUpload(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <h2>Add Student</h2>
          <TextField
            select
            label="Select Add Option"
            value={addOption}
            onChange={handleAddOptionChange}
            fullWidth
            margin="normal"
          >
            <DropdownMenuItem value="individual">Individual</DropdownMenuItem>
            <DropdownMenuItem value="bulk">Bulk</DropdownMenuItem>
          </TextField>
          {addOption === "individual" && (
            <form onSubmit={handleIndividualFormSubmit}>
              <TextField
                label="Name"
                name="name"
                value={individualForm.name}
                onChange={handleIndividualFormChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Username"
                name="username"
                value={individualForm.username}
                onChange={handleIndividualFormChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Password"
                name="password"
                value={individualForm.password}
                onChange={handleIndividualFormChange}
                fullWidth
                margin="normal"
                type="password"
                required
              />
              <TextField
                label="Parent Mobile"
                name="parentMobile"
                value={individualForm.parentMobile}
                onChange={handleIndividualFormChange}
                fullWidth
                margin="normal"
                required
                error={!validatePhoneNumber(individualForm.parentMobile)}
                helperText={!validatePhoneNumber(individualForm.parentMobile) ? "Invalid phone number. It should be 10 digits." : ""}
              />
              <TextField
                label="Parent Email"
                name="parentEmail"
                value={individualForm.parentEmail}
                onChange={handleIndividualFormChange}
                fullWidth
                margin="normal"
                required
                error={!validateEmail(individualForm.parentEmail)}
                helperText={!validateEmail(individualForm.parentEmail) ? "Invalid email address." : ""}
              />
              {bulkUploadMessage && <Alert severity="error" style={{ marginTop: '10px' }}>{bulkUploadMessage}</Alert>}
              <Button type="submit" variant="contained" color="primary">
                Add Student
              </Button>
            </form>
          )}
          {addOption === "bulk" && (
            <div>
              <Button variant="contained" onClick={downloadTemplate}>
                Download Template
              </Button>
              <p>Upload the filled template:</p>
              <div {...getRootProps({ className: 'dropzone' })} style={{ border: '2px dashed #cccccc', padding: '20px', textAlign: 'center', marginTop: '10px' }}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop a file here, or click to select a file</p>
              </div>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUploadInternal}
                style={{ display: 'none' }}
                id="bulk-upload-input"
              />
              <label htmlFor="bulk-upload-input">
                <Button variant="contained" component="span" style={{ marginTop: '10px' }}>
                  Choose File
                </Button>
              </label>
              {fileName && <p>Chosen file: {fileName}</p>}
              {bulkUploadMessage && <Alert severity="info" style={{ marginTop: '10px' }}>{bulkUploadMessage}</Alert>}
              {uploadedStudents.length > 0 && (
                <Button variant="contained" color="primary" onClick={handleAddBulkStudents} disabled={isAddButtonDisabled} style={{ marginTop: '10px' }}>
                  Add Students
                </Button>
              )}
            </div>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default SchoolDetails;
