import React, { Fragment, useState, useEffect } from "react";
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
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Pagination from "@mui/material/Pagination";

const BASE_URL = "http://healthworker.amritacreate.org/LeveledBooks/api/";

const SchoolForm = ({
  formData,
  handleChange,
  handleSubmit,
  handleClose,
  states,
  districts,
  subDistricts,
  handleStateChange,
  handleDistrictChange,
  editMode,
  selectedSchool,
}) => (
  <form onSubmit={handleSubmit}>
    <TextField
      label="School Name"
      fullWidth
      name="school_name"
      value={formData.school_name}
      onChange={handleChange}
      required
    />
    <TextField
      label="Principal Name"
      fullWidth
      name="principal_name"
      value={formData.principal_name}
      onChange={handleChange}
      required
    />
    <TextField
      label="Phone"
      fullWidth
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      required
    />
    <TextField
      label="Official Email"
      fullWidth
      name="email_official"
      value={formData.email_official}
      onChange={handleChange}
      type="email"
      required
    />
    <TextField
      label="ALP Email"
      fullWidth
      name="email_alp"
      value={formData.email_alp}
      onChange={handleChange}
      type="email"
      required
    />
    <TextField
      label="Street Name"
      fullWidth
      name="street_name"
      value={formData.street_name}
      onChange={handleChange}
      required
    />
    <TextField
      label="Locality Area"
      fullWidth
      name="locality_area"
      value={formData.locality_area}
      onChange={handleChange}
      required
    />
    {editMode && selectedSchool && (
      <>
        <p>Existing State: {selectedSchool.state_name}</p>
        <p>Existing District: {selectedSchool.district_name}</p>
        <p>Existing Sub-District: {selectedSchool.sub_district_name}</p>
      </>
    )}
    <FormControl fullWidth>
      <InputLabel>State</InputLabel>
      <Select
        name="state"
        value={formData.state || ""}
        onChange={handleStateChange}
      >
        {states && states.map((state) => (
          <MenuItem key={state.state_code} value={state.state_code}>
            {state.state_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl fullWidth disabled={!formData.state}>
      <InputLabel>District</InputLabel>
      <Select
        name="district"
        value={formData.district || ""}
        onChange={handleDistrictChange}
      >
        {districts && districts.map((district) => (
          <MenuItem key={district.district_code} value={district.district_code}>
            {district.district_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl fullWidth disabled={!formData.district}>
      <InputLabel>Sub-District</InputLabel>
      <Select
        name="sub_district"
        value={formData.sub_district || ""}
        onChange={handleChange}
      >
        {subDistricts && subDistricts.map((subDistrict) => (
          <MenuItem key={subDistrict.sub_district_code} value={subDistrict.sub_district_code}>
            {subDistrict.sub_district_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <TextField
      label="PIN"
      fullWidth
      name="pin"
      value={formData.pin}
      onChange={handleChange}
      required
    />
    <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
      Save
    </Button>
  </form>
);

function AddSchool() {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    school_name: "",
    principal_name: "",
    phone: "",
    email_official: "",
    email_alp: "",
    street_name: "",
    locality_area: "",
    sub_district: "",
    district: "",
    state: "",
    pin: "",
  });
  const [schools, setSchools] = useState([]);
  const [submitMessage, setSubmitMessage] = useState("");
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchSchools();
    fetchStates();
  }, []);

  const fetchSchools = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${BASE_URL}/getschools/`);
      if (response.ok) {
        const data = await response.json();
        setSchools(data.schools);
      } else {
        setError("Failed to fetch schools.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error fetching schools.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStates = async () => {
    try {
      const response = await fetch(`${BASE_URL}/getstates/`);
      if (response.ok) {
        const data = await response.json();
        setStates(data.state_list);
      } else {
        console.error("Failed to fetch states.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchDistricts = async (stateId) => {
    try {
      const response = await fetch(`${BASE_URL}/getdistricts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ state_code: stateId }),
      });
      if (response.ok) {
        const data = await response.json();
        setDistricts(data.district_list);
      } else {
        console.error("Failed to fetch districts.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchSubDistricts = async (districtId) => {
    try {
      const response = await fetch(`${BASE_URL}/getsubdistricts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ district_code: districtId }),
      });
      if (response.ok) {
        const data = await response.json();
        setSubDistricts(data.sub_district_list);
      } else {
        console.error("Failed to fetch sub-districts.");
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
    setEditMode(false);
    setFormData({
      id: "",
      school_name: "",
      principal_name: "",
      phone: "",
      email_official: "",
      email_alp: "",
      street_name: "",
      locality_area: "",
      sub_district: "",
      district: "",
      state: "",
      pin: "",
    });
    setDistricts([]);
    setSubDistricts([]);
    setSelectedSchool(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setFormData({ ...formData, state: stateId, district: "", sub_district: "" });
    setDistricts([]);
    setSubDistricts([]);
    fetchDistricts(stateId);
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setFormData({ ...formData, district: districtId, sub_district: "" });
    setSubDistricts([]);
    fetchSubDistricts(districtId);
  };

  const addSchool = async (schoolData) => {
    try {
      const response = await fetch(`${BASE_URL}/addnewschool/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(schoolData),
      });

      if (response.ok) {
        setSubmitMessage("School added successfully!");
        setTimeout(() => {
          setSubmitMessage("");
        }, 3000);
        await fetchSchools();
        return true;
      } else {
        setSubmitMessage("Failed to add school.");
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage("Failed to add school.");
      return false;
    }
  };

  const updateSchool = async (schoolData) => {
    try {
      const response = await fetch(`${BASE_URL}/updateschools/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(schoolData),
      });

      if (response.ok) {
        setSubmitMessage("School updated successfully!");
        setTimeout(() => {
          setSubmitMessage("");
        }, 3000);
        await fetchSchools();
        return true;
      } else {
        setSubmitMessage("Failed to update school.");
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage("Failed to update school.");
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      id,
      school_name,
      principal_name,
      phone,
      email_official,
      email_alp,
      street_name,
      locality_area,
      sub_district,
      district,
      state,
      pin,
    } = formData;

    let success = false;

    if (editMode) {
      const schoolData = {
        school_id: id,
        school_name,
        principal_name,
        phone,
        email_official,
        email_alp,
        street_name,
        locality_area,
        sub_district,
        district,
        state,
        pin,
      };

      success = await updateSchool(schoolData);
    } else {
      const schoolData = {
        school_name,
        principal_name,
        phone,
        email_official,
        email_alp,
        street_name,
        locality_area,
        sub_district,
        district,
        state,
        pin,
      };

      success = await addSchool(schoolData);
    }

    if (success) {
      handleClose();
    }
  };

  const handleMenuOpen = (event, school) => {
    setAnchorEl(event.currentTarget);
    setSelectedSchool(school);
    setFormData({
      id: school.id,
      school_name: school.school_name,
      principal_name: school.principal_name,
      phone: school.phone,
      email_official: school.email_official,
      email_alp: school.email_alp,
      street_name: school.street_name || "",
      locality_area: school.locality_area || "",
      sub_district: school.sub_district_code || "",
      district: school.district_code || "",
      state: school.state_code || "",
      pin: school.pin || "",
    });
    fetchDistricts(school.state_code);
    fetchSubDistricts(school.district_code);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSchool(null);
  };

  const handleEdit = () => {
    setOpen(true);
    setEditMode(true);
    handleMenuClose();
  };

  const handleDelete = async () => {
    if (!selectedSchool || !selectedSchool.id) {
      setSubmitMessage("Failed to delete school.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/deleteschool/${selectedSchool.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchSchools();
        setSubmitMessage("School deleted successfully!");
      } else {
        setSubmitMessage("Failed to delete school.");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage("Failed to delete school.");
    } finally {
      handleMenuClose();
    }
  };

  // Pagination calculations
  const indexOfLastSchool = currentPage * itemsPerPage;
  const indexOfFirstSchool = indexOfLastSchool - itemsPerPage;
  const currentSchools = schools.slice(indexOfFirstSchool, indexOfLastSchool);
  const totalPages = Math.ceil(schools.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Fragment>
      <div id="wrapper">
        <Nav />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header />
            <div className="container-fluid">
              <h1 className="h3 mb-1 text-gray-800">ALP Schools</h1>
              <div style={{ marginTop: "-10px" }}>
                <Button
                  variant="contained"
                  onClick={handleOpen}
                  style={{ float: "right", marginTop: '20px', marginBottom: '20px' }}
                >
                  Add School
                </Button>
              </div>
              {submitMessage && <Alert severity="success" style={{ marginTop: 20 }}>{submitMessage}</Alert>}
              {error && <Alert severity="error" style={{ marginTop: 20 }}>{error}</Alert>}
              {loading ? (
                <CircularProgress style={{ margin: 'auto', display: 'block' }} />
              ) : (
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
                        <TableCell style={{ color: "#333333", fontWeight: "bold" }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Array.isArray(currentSchools) &&
                        currentSchools.map((school) => (
                          <TableRow key={school.id}>
                            <TableCell>{school.school_name}</TableCell>
                            <TableCell>{school.principal_name}</TableCell>
                            <TableCell>{school.phone}</TableCell>
                            <TableCell>{school.email_official}</TableCell>
                            <TableCell>{school.email_alp}</TableCell>
                            <TableCell>{school.address}</TableCell>
                            <TableCell>
                              <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={(e) => handleMenuOpen(e, school)}
                              >
                                <MoreVertIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                style={{ marginTop: 20, display: 'flex', justifyContent: 'left' }}
              />
            </div>
          </div>
        </div>
      </div>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
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
            <h2>{editMode ? "Edit School" : "Add School"}</h2>
            <Button variant="outlined" onClick={handleClose}>Close</Button>
          </div>
          <SchoolForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleClose={handleClose}
            states={states}
            districts={districts}
            subDistricts={subDistricts}
            handleStateChange={handleStateChange}
            handleDistrictChange={handleDistrictChange}
            editMode={editMode}
            selectedSchool={selectedSchool}
          />
        </div>
      </Modal>
      <Logout />
    </Fragment>
  );
}

export default AddSchool;
