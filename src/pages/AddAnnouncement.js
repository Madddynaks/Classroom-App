import React, { useState, useEffect } from "react";
import { getSubjectsByTeacher } from "../actions/apis";
import TeacherSubject from "../components/TeacherSubject";
import { DialogContent, DialogTitle, Modal, ModalClose, ModalDialog } from "@mui/joy";

function AddAnnouncement({ addAnnouncement }) {
  const [announcement, setAnnouncement] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [openSelectSubject, setOpenSelectSubject] = useState(false);

  // useEffect(() => {
  //   setSubjects(getSubjectsByTeacher());
  //   console.log(subjects);
  // },[])
  useEffect(() => {
    const assignSubjects = async () => {
      const sub = await getSubjectsByTeacher();
      setSubjects(sub);
      console.log(sub)
    }
    assignSubjects();
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAnnouncement = {
      id: Date.now(),
      text: announcement,
    };

    addAnnouncement(newAnnouncement);
    setAnnouncement("");
    alert("Announcement added!");
  };
  const addSelectedSubjects=()=>{

  }
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
            onClick={() => {
              setOpenSelectSubject(true);
            }}
            className="mt-2 px-4 gap-2 py-2 bg-blue-500 text-white rounded mr-2"
          >
            Select Subjects
          </button>
          <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
            Add Announcement
          </button>
        </form>
      </div>
      <Modal
        open={openSelectSubject}
        onClose={() => {
          setOpenSelectSubject(false);
        }}
      >
        <ModalDialog size="lg">
          <ModalClose style={{ zIndex: "10" }} />
          <DialogTitle className="">Movement Confirmation</DialogTitle>
          <DialogContent className="h-fit">
            <TeacherSubject />
            <button
            onClick={() => {
              addSelectedSubjects();
            }}
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
