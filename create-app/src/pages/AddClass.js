import React, { Fragment, useState, useEffect } from "react";
import Nav from "../components/TeacherNavBar";
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
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Pagination from "@mui/material/Pagination";

const BASE_URL = "http://healthworker.amritacreate.org/LeveledBooks/api";

function AddClass() {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    phone: "",
    school: "",
  });
  const [teachers, setTeachers] = useState([]);
  const [schools, setSchools] = useState([]);
  const [submitMessage, setSubmitMessage] = useState("");
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [errors, setErrors] = useState({});
  const teachersPerPage = 10;

  useEffect(() => {
    fetchTeachers();
    fetchSchools();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/getallteachers/`);
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Teachers:", data.teacher_list);
        setTeachers(data.teacher_list);
      } else {
        console.error("Failed to fetch teachers.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchSchools = async () => {
    try {
      const response = await fetch(`${BASE_URL}/getschools/`);
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Schools:", data);
        setSchools(data.schools);
      } else {
        console.error("Failed to fetch schools.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.username) tempErrors.username = "Username is required";
    if (!editMode && !formData.password) tempErrors.password = "Password is required";
    if (!formData.phone) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      tempErrors.phone = "Phone number must be 10 digits";
    }
    if (!formData.school) tempErrors.school = "School is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const addTeacher = async (teacherData) => {
    try {
      const response = await fetch(`${BASE_URL}/addnewteacher/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teacherData),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok && data.success === 1) {
        console.log("Teacher added successfully:", data);
        setSubmitMessage("Teacher added successfully!");
        setTimeout(() => {
          setSubmitMessage("");
        }, 3000);
        resetForm();
        setOpen(false);
        fetchTeachers();
      } else {
        console.error("Failed to add teacher:", data);
        setSubmitMessage(data.message || "Failed to add teacher.");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage("Failed to add teacher.");
    }
  };

  const updateTeacher = async (teacherData) => {
    try {
      const response = await fetch(`${BASE_URL}/updateteacher/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teacherData),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok && data.success === 1) {
        console.log("Teacher updated successfully:", data);
        setSubmitMessage("Teacher updated successfully!");
        setTimeout(() => {
          setSubmitMessage("");
        }, 3000);
        resetForm();
        setOpen(false);
        fetchTeachers();
      } else {
        console.error("Failed to update teacher:", data);
        setSubmitMessage(data.message || "Failed to update teacher.");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage("Failed to update teacher.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { name, username, password, phone, school } = formData;

    const schoolId = schools.find((schoolItem) => schoolItem.school_name === school)?.id;

    if (!schoolId) {
      setSubmitMessage("Please select a valid school.");
      console.log("Invalid school:", school);
      return;
    }

    if (editMode) {
      const teacherData = {
        user_id: selectedTeacher.teacher_id,
        name: name,
        username: username,
        school_id: schoolId,
        phone: phone,
        ...(password && { password }), // Include password only if it is provided
      };
      console.log("Updating teacher with data:", JSON.stringify(teacherData, null, 2));
      await updateTeacher(teacherData);
    } else {
      const teacherData = {
        name: name,
        username: username,
        password: password,
        phone: phone,
        role: 2,
        created_by: 1,
        school_id: schoolId,
      };
      console.log("Adding new teacher with data:", JSON.stringify(teacherData, null, 2));
      await addTeacher(teacherData);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleMenuOpen = (event, teacher) => {
    setAnchorEl(event.currentTarget);
    setSelectedTeacher(teacher);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setFormData({
      name: selectedTeacher.name,
      username: selectedTeacher.username,
      password: "",
      phone: selectedTeacher.phone,
      school: selectedTeacher.school_name,
    });
    setEditMode(true);
    handleOpen();
    handleMenuClose();
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/deleteteacher/${selectedTeacher.teacher_id}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Teacher deleted successfully.");
        setSubmitMessage("Teacher deleted successfully!");
        setTimeout(() => {
          setSubmitMessage("");
        }, 3000);
        fetchTeachers();
      } else {
        console.error("Failed to delete teacher.");
        setSubmitMessage("Failed to delete teacher.");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage("Failed to delete teacher.");
    }
    handleMenuClose();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      username: "",
      password: "",
      phone: "",
      school: "",
    });
    setErrors({});
    setEditMode(false);
    setSelectedTeacher(null);
  };

  const indexOfLastTeacher = page * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = teachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

  return (
    <Fragment>
      <div id="wrapper">
        <Nav />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header />
            <div className="container-fluid">
              <h1 className="h3 mb-1 text-gray-800">ALP Teachers</h1>
              <div style={{ marginTop: "-10px" }}>
                <Button
                  variant="contained"
                  onClick={handleOpen}
                  style={{ float: "right", marginTop: "20px", marginBottom: "20px" }}
                >
                  Add Teacher
                </Button>
              </div>
              {submitMessage && <p style={{ color: "green", marginTop: 40 }}>{submitMessage}</p>}
              <TableContainer component={Paper} style={{ marginBottom: "0px" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow style={{ backgroundColor: "#e0e0e0" }}>
                      <TableCell style={{ color: "#333333", fontWeight: "bold" }}>Name</TableCell>
                      <TableCell style={{ color: "#333333", fontWeight: "bold" }}>School Name</TableCell>
                      <TableCell style={{ color: "#333333", fontWeight: "bold" }}>Phone</TableCell>
                      <TableCell style={{ color: "#333333", fontWeight: "bold" }}>Username</TableCell>
                      <TableCell style={{ color: "#333333", fontWeight: "bold" }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentTeachers.map((teacher) => (
                      <TableRow key={teacher.teacher_id}>
                        <TableCell>{teacher.name}</TableCell>
                        <TableCell>{teacher.school_name}</TableCell>
                        <TableCell>{teacher.phone}</TableCell>
                        <TableCell>{teacher.username}</TableCell>
                        <TableCell>
                          <IconButton onClick={(event) => handleMenuOpen(event, teacher)}>
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                          >
                            <MenuItem onClick={handleEdit}>Edit</MenuItem>
                            <MenuItem onClick={handleDelete}>Delete</MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination
                count={Math.ceil(teachers.length / teachersPerPage)}
                page={page}
                onChange={handlePageChange}
                style={{ marginTop: 20 }}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: 8, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>{editMode ? "Edit Teacher" : "Add Teacher"}</h2>
            <Button variant="outlined" onClick={handleClose}>Close</Button>
          </div>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Username"
              fullWidth
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              label="Password"
              fullWidth
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={!editMode}
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              label="Phone"
              fullWidth
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              error={!!errors.phone}
              helperText={errors.phone}
              inputProps={{ maxLength: 10, pattern: "[0-9]*" }} // Enforce number-only input
            />
            <FormControl fullWidth style={{ marginTop: 10 }} required error={!!errors.school}>
              <InputLabel>School</InputLabel>
              <Select
                name="school"
                value={formData.school}
                onChange={handleChange}
                label="School"
                required
              >
                {schools.map((school) => (
                  <MenuItem key={school.id} value={school.school_name}>
                    {school.school_name}
                  </MenuItem>
                ))}
              </Select>
              {errors.school && <p style={{ color: 'red' }}>{errors.school}</p>}
            </FormControl>
            <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
              {editMode ? "Save Changes" : "Save"}
            </Button>
          </form>
          {submitMessage && <p style={{ color: "red", marginTop: 20 }}>{submitMessage}</p>}
        </div>
      </Modal>
      <Logout />
    </Fragment>
  );
}

export default AddClass;
