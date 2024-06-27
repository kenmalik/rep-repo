import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Exercise from "./exercise.js";
import Toolbar from "./toolbar.js";

export default function Workout({
  name,
  exercises,
  setName,
  setExercises,
  onDelete,
  workoutId,
}) {
  let [isEditing, setIsEditing] = useState(false);

  function handleAddExercise(exercise) {
    setExercises(workoutId, [...exercises, exercise]);
  }

  function handleDeleteExercise(id) {
    setExercises(
      workoutId,
      exercises.filter((exercise) => exercise.id !== id),
    );
  }

  function handleIncrementAll(amount) {
    console.log(`Incrementing by ${amount}`);
    setExercises(
      workoutId,
      exercises.map((exercise) => {
        return {
          ...exercise,
          weight: exercise.weight + amount,
        };
      }),
    );
  }

  function handleIncrementGroup(amount, group) {
    setExercises(
      workoutId,
      exercises.map((exercise) => {
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
    setExercises(
      workoutId,
      exercises.map((exercise) => {
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
    setExercises(
      workoutId,
      exercises.map((exercise) => {
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
    setExercises(
      workoutId,
      exercises.map((exercise) => {
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
    <div className="med:mb-20 mb-12 overflow-hidden rounded-xl">
      <div className="bg-gray-300 px-12 py-8">
        <form
          className="mb-10 flex flex-wrap items-center justify-between gap-6 text-gray-800 sm:flex-nowrap"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {isEditing ? (
            <input
              name="workout-title"
              type="text"
              value={name}
              onChange={(e) => setName(workoutId, e.target.value)}
              className="w-full px-4 py-2 text-2xl font-bold sm:text-3xl"
            />
          ) : (
            <h1 className="text-2xl font-bold sm:text-3xl">{name}</h1>
          )}
          <div className="flex gap-8 sm:ml-2">
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
              onClick={() => {
                setIsEditing(!isEditing);
              }}
              className="hover:underline"
              title={
                isEditing
                  ? "Save changes to workout"
                  : "Make changes to workout"
              }
            >
              {isEditing ? "Finish" : "Edit"}
            </button>
          </div>
        </form>
        {isEditing ? (
          <AddExercise onAdd={handleAddExercise} />
        ) : (
          <Toolbar
            onIncrementAll={(amount) => {
              handleIncrementAll(amount);
            }}
            onIncrementGroup={(amount, group) => {
              handleIncrementGroup(amount, group);
            }}
            exercises={exercises}
          />
        )}
      </div>
      <div className="bg-white">
        {exercises.map((exercise) => (
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
      className="flex flex-wrap items-end gap-4 bg-gray-300 text-gray-800"
      onSubmit={(e) => {
        e.preventDefault();
        onAdd({
          name: name,
          weight: Number(weight),
          group: group,
          id: uuidv4(),
        });
        setName("");
        setWeight(0);
        setGroup("");
      }}
    >
      <h2 className="font-bold">Add Exercise:</h2>
      <ul className="flex flex-wrap items-end gap-6 sm:flex-nowrap">
        <li className="w-full">
          <label htmlFor="new-workout-name" className="block">
            Name:
          </label>
          <input
            id="new-workout-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full min-w-0"
          />
        </li>
        <li className="w-full">
          <label htmlFor="new-workout-weight" className="block">
            Weight:{" "}
          </label>
          <input
            id="new-workout-weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full min-w-0"
          />
        </li>
        <li className="w-full">
          <label htmlFor="new-workout-group" className="block">
            Group:{" "}
          </label>
          <input
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            id="new-workout-group"
            className="w-full min-w-0"
          />
        </li>
        <button
          type="submit"
          disabled={addButtonDisabled}
          title={
            addButtonDisabled
              ? "Please fill in exercise information"
              : "Add exercise"
          }
          className={addButtonDisabled ? "text-gray-500" : "hover:underline"}
        >
          <b>Add</b>
        </button>
      </ul>
    </form>
  );
}
