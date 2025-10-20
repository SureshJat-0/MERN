import React from 'react'

export default function NewLesson() {
    const [newLessonFields, setNewLessonFields] = ({
        title: "",
        description: "",
      });
  return (
    <>
        <h1>Add Lesson</h1>
      <div className="">
        <input
          name="title"
          type="text"
          placeholder="Lesson title..."
          value={editFields.name}
          required
          onChange={(e) =>
            setEditFields({ ...editFields, [e.target.name]: e.target.value })
          }
        />
        <input
          name="description"
          type="text"
          placeholder="Lesson description..."
          value={editFields.name}
          required
          onChange={(e) =>
            setEditFields({ ...editFields, [e.target.name]: e.target.value })
          }
        />
        <button onClick={addNewLesson}>Add Lesson</button>
      </div>
    </>
  )
}
