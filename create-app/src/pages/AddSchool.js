import React, { Fragment, useState, useEffect } from "react";
import Nav from "../components/NavBar";
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

const BASE_URL = "http://healthworker.amritacreate.org/LeveledBooks/api/";

function AddSchool() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    school_name: "",
    principal_name: "",
    phone: "",
    email_official: "",
    email_alp: "",
    address: "",
  });
  const [schools, setSchools] = useState([]);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await fetch(`${BASE_URL}/getschools/`);
      if (response.ok) {
        const data = await response.json();
        setSchools(data.schools); // Assuming the API response has a 'schools' property
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
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/addnewschool/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage("School added successfully!");
        setTimeout(() => {
          setSubmitMessage("");
        }, 3000);
        setOpen(false);
        fetchSchools(); // Refresh schools data
      } else {
        setSubmitMessage("Failed to add school.");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage("Failed to add school.");
    }
  };

  return (
    <Fragment>
      <div id="wrapper">
        <Nav></Nav>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header></Header>
            <div className="container-fluid">
              <h1 className="h3 mb-1 text-gray-800">ALP Schools</h1>
              <div style={{ marginTop: "-10px" }}>
                <Button
                  variant="contained"
                  onClick={handleOpen}
                  style={{ float: "right", marginTop: '20px', marginBottom: '20px' }} // Add marginBottom here
                >
                  Add School
                </Button>
              </div>
              {submitMessage && <p style={{ color: "green", marginTop: 40 }}>{submitMessage}</p>}
              <TableContainer component={Paper} style={{ marginBottom: '0px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow style={{ backgroundColor: "#e0e0e0" }}>
                      <TableCell style={{ color: "#333333", fontWeight: "bold" }}>School Name</TableCell>
                      <TableCell style={{ color: "#333333", fontWeight: "bold" }}>Principal Name</TableCell>
                      <TableCell style={{ color: "#333333", fontWeight: "bold" }}>Phone</TableCell>
                      <TableCell style={{ color: "#333333", fontWeight: "bold" }}>Official Email</TableCell>
                      <TableCell style={{ color: "#333333", fontWeight: "bold" }}>ALP Email</TableCell>
                      <TableCell style={{ color: "#333333", fontWeight: "bold" }}>Address</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(schools) &&
                      schools.map((school) => (
                        <TableRow key={school.id}>
                          <TableCell>{school.school_name}</TableCell>
                          <TableCell>{school.principal_name}</TableCell>
                          <TableCell>{school.phone}</TableCell>
                          <TableCell>{school.email_official}</TableCell>
                          <TableCell>{school.email_alp}</TableCell>
                          <TableCell>{school.address}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
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
            <h2>Add School</h2>
            <Button variant="outlined" onClick={handleClose}>Close</Button>
          </div>
          <form onSubmit={handleSubmit}>
            <TextField
              label="School Name"
              fullWidth
              name="school_name"
              value={formData.school_name}
              onChange={handleChange}
            />
            <TextField
              label="Principal Name"
              fullWidth
              name="principal_name"
              value={formData.principal_name}
              onChange={handleChange}
            />
            <TextField
              label="Phone"
              fullWidth
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              label="Official Email"
              fullWidth
              name="email_official"
              value={formData.email_official}
              onChange={handleChange}
            />
            <TextField
              label="ALP Email"
              fullWidth
              name="email_alp"
              value={formData.email_alp}
              onChange={handleChange}
            />
            <TextField
              label="Address"
              fullWidth
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
              Save
            </Button>
          </form>
        </div>
      </Modal>
    </Fragment>
  );
  
}

export default AddSchool;
