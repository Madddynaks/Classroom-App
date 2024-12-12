import React, { useState, useEffect } from "react";
import { getSubjectsByTeacher, addAnnouncement } from "../actions/apis";
import TeacherSubject from "../components/DataGrid";
import { DialogContent, DialogTitle, Modal, ModalClose, ModalDialog } from "@mui/joy";


function AddAnnouncement() {
  const [announcement, setAnnouncement] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);
  const [openSelectSubjectModal, setOpenSelectSubjectModal] = useState(false);

  useEffect(() => {
    const assignSubjects = async () => {
      const sub = await getSubjectsByTeacher();
      setSubjects(sub.subjects);
      const transformedRows = sub.subjects.map((data) => ({
        _id: data._id,
        name: data.name,
        semester: data.semester,
        branch: data.branch,
      }));
      setRows(transformedRows);
    };
    assignSubjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate selected subjects and announcement text
    if (!selectedSubjects || selectedSubjects.length === 0) {
      alert("Please select at least one subject.");
      return;
    }
    if (!announcement.trim()) {
      alert("Announcement text cannot be empty.");
      return;
    }
  
    const newAnnouncement = {
      semesters: selectedSubjects, // Ensure this is an array of valid semester IDs
      announcementText: announcement.trim(), // Trim whitespace from the announcement text
    };
  
    try {
      const result = await addAnnouncement(newAnnouncement);
      console.log(result)
      // Check if the announcement was successfully added
      if (result.message==="Announcements added successfully") {
        setAnnouncement(""); // Reset the announcement input
        alert("Announcement added successfully!");
      } else {
        alert(`Failed to add announcement: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error adding announcement:", error);
      alert("An error occurred while adding the announcement. Please try again.");
    }
  };
  

  useEffect(() => {
    const changeIds = () => {
      const selectedIds = selectedSubjects.map((subject) => {
        return subject._id;
      });
      setSelectedSubjectIds(selectedIds);
      console.log(selectedIds);
    };

    if (!openSelectSubjectModal) {
      changeIds();
    }
  }, [openSelectSubjectModal]);

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "name", headerName: "Subject Name", width: 200 },
    { field: "semester", headerName: "Semester", width: 200 },
    { field: "branch", headerName: "Branch", width: 200 },
  ];

  const addSelectedSubjects = () => {
    const selected = rows.filter((row) => selectedSubjectIds.includes(row._id));
    setSelectedSubjects(selected);
    setOpenSelectSubjectModal(false);
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Add Announcement</h1>
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter announcement text"
            required
          />
          <button
            type="button"
            onClick={() => setOpenSelectSubjectModal(true)}
            className="mt-2 px-4 gap-2 py-2 bg-blue-500 text-white rounded mr-2"
          >
            Select Subjects
          </button>
          <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
            Add Announcement
          </button>
        </form>
      </div>
      <Modal open={openSelectSubjectModal} onClose={() => setOpenSelectSubjectModal(false)}>
        <ModalDialog size="lg">
          <ModalClose style={{ zIndex: "10" }} />
          <DialogTitle>Select Subjects</DialogTitle>
          <DialogContent className="h-fit">
            <TeacherSubject
              changeState={setSelectedSubjectIds}
              state={selectedSubjectIds}
              columns={columns}
              rows={rows}
              selectedIds={selectedSubjectIds}
            />
            <button
              onClick={addSelectedSubjects}
              className="mt-2 px-4 gap-2 py-2 bg-blue-500 text-white rounded mr-2"
            >
              Confirm
            </button>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default AddAnnouncement;
