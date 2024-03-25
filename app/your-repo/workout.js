import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Exercise from "./exercise.js";
import Toolbar from "./toolbar.js";

export default function Workout({ name, exercises, onDelete, workoutId }) {
  let [exerciseList, setExerciseList] = useState(exercises);
  let [isEditing, setIsEditing] = useState(true);
  let [title, setTitle] = useState(name);

  function handleAddExercise(exercise) {
    setExerciseList([...exerciseList, exercise]);
  }

  function handleDeleteExercise(id) {
    setExerciseList(exerciseList.filter((exercise) => exercise.id !== id));
  }

  function handleIncrementAll(amount) {
    setExerciseList(
      exerciseList.map((exercise) => {
        return {
          ...exercise,
          weight: exercise.weight + amount,
        };
      }),
    );
  }

  function handleIncrementGroup(amount, group) {
    setExerciseList(
      exerciseList.map((exercise) => {
        if (exercise.group === group) {
          return {
            ...exercise,
            weight: exercise.weight + amount,
          };
        } else {
          return exercise;
        }
      }),
    );
  }

  function handleSetName(id, name) {
    setExerciseList(
      exerciseList.map((exercise) => {
        if (exercise.id === id) {
          return {
            ...exercise,
            name: name,
          };
        } else {
          return exercise;
        }
      }),
    );
  }

  function handleSetWeight(id, weight) {
    setExerciseList(
      exerciseList.map((exercise) => {
        if (exercise.id === id) {
          return {
            ...exercise,
            weight: Number(weight),
          };
        } else {
          return exercise;
        }
      }),
    );
  }

  function handleSetGroup(id, group) {
    setExerciseList(
      exerciseList.map((exercise) => {
        if (exercise.id === id) {
          return {
            ...exercise,
            group: group,
          };
        } else {
          return exercise;
        }
      }),
    );
  }

  return (
    <div className="mb-12 med:mb-20 rounded-xl overflow-hidden">
      <form
        className="bg-gray-300 text-gray-800 pt-8 pb-6 px-12 flex flex-wrap gap-4 justify-between items-center "
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {" "}
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="font-bold text-2xl sm:text-3xl px-4 py-2 min-w-0"
          />
        ) : (
          <h1 className="font-bold text-2xl sm:text-3xl">{title}</h1>
        )}
        <div className="flex gap-8">
          {isEditing && (
            <button
              type="button"
              title="Delete workout"
              onClick={() => onDelete(workoutId)}
              className="text-rose-500 hover:underline"
            >
              Delete
            </button>
          )}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="hover:underline"
            title={
              isEditing ? "Save changes to workout" : "Make changes to workout"
            }
          >
            {isEditing ? "Finish" : "Edit"}
          </button>
        </div>
      </form>
      {!isEditing && (
        <Toolbar
          onIncrementAll={handleIncrementAll}
          onIncrementGroup={handleIncrementGroup}
          exerciseList={exerciseList}
        />
      )}
      {isEditing && <AddExercise onAdd={handleAddExercise} />}
      {exerciseList.map((exercise) => (
        <Exercise
          key={exercise.id}
          isEditable={isEditing}
          onDelete={handleDeleteExercise}
          exercise={exercise}
          onNameChange={handleSetName}
          onWeightChange={handleSetWeight}
          onGroupChange={handleSetGroup}
        />
      ))}
    </div>
  );
}

function AddExercise({ onAdd }) {
  let [name, setName] = useState("");
  let [weight, setWeight] = useState(0);
  let [group, setGroup] = useState("");

  const addButtonDisabled =
    name === "" || weight === "" || weight < 0 || group === "";

  return (
    <form
      className="bg-gray-300 text-gray-800 pt-2 pb-8 flex flex-wrap gap-6 px-12 items-end"
      onSubmit={(e) => {
        e.preventDefault();
        onAdd({
          name: name,
          weight: Number(weight),
          group: group,
          isEditable: false,
          id: uuidv4(),
        });
        setName("");
        setWeight(0);
        setGroup("");
      }}
    >
      <label className="font-bold">Add Exercise:</label>
      <div className="flex flex-wrap gap-6 items-end">
        <div>
          <label htmlFor="new-workout-name" className="block w-8">
            Name:
          </label>
          <input
            id="new-workout-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="new-workout-weight" className="block w-8">
            Weight:{" "}
          </label>
          <input
            id="new-workout-weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="new-workout-group" className="block w-8">
            Group:{" "}
          </label>
          <input
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            id="new-workout-group"
          />
        </div>
        <button
          type="submit"
          disabled={addButtonDisabled}
          title={
            addButtonDisabled
              ? "Please fill in exercise information"
              : "Add exercise"
          }
          className={
            "px-4 " + (addButtonDisabled ? "text-gray-500" : "hover:underline")
          }
        >
          <b>Add</b>
        </button>
      </div>
    </form>
  );
}
