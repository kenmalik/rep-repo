"use client";

import { useState } from "react";
import Exercise from "./exercise.js"
import { v4 as uuidv4 } from "uuid"

export default function Workout({ name, exercises, onDelete, workoutId }) {
    let [exerciseList, setExerciseList] = useState(exercises);
    let [isEditing, setIsEditing] = useState(true);
    let [title, setTitle] = useState(name);

    function handleAddExercise(exercise) {
        setExerciseList([
            ...exerciseList,
            exercise
        ]);
    }

    function handleDeleteExercise(id) {
        setExerciseList(exerciseList.filter((exercise) =>
            exercise.id !== id
        ));
    }

    return (
        <div className="mb-20 rounded-xl overflow-hidden">
            <form
                className="bg-gray-300 text-gray-800 py-8 px-12 flex justify-between items-center"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                {isEditing ?
                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} className="font-bold text-3xl px-4 py-2" />
                    : <h1 className="font-bold text-3xl">{title}</h1>
                }
                <div className="flex gap-6">
                    {isEditing && <button type="button" onClick={() => onDelete(workoutId)}>Delete Workout</button>}
                    <button type="submit" onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Finish Edits" : "Edit"}</button>
                </div>
            </form>
            {isEditing && <AddExercise onAdd={handleAddExercise} />}
            {exerciseList.map((exercise) =>
                <Exercise exercise={exercise} key={exercise.id} isEditable={isEditing} onDelete={handleDeleteExercise} />
            )}
        </div>
    );
}

export function AddExercise({ onAdd }) {
    let [name, setName] = useState("");
    let [weight, setWeight] = useState(0);
    let [group, setGroup] = useState("");

    const addButtonDisabled = name === "" || weight === 0 || group === "";

    return (
        <form
            className="bg-gray-300 text-gray-800 pt-2 pb-8 flex gap-6 px-12"
            onSubmit={(e) => {
                e.preventDefault();
                onAdd({
                    name: name, weight: weight, group: group, isEditable: false, id: uuidv4()
                })
                setName("");
                setWeight(0);
                setGroup("");
            }}
        >
            <label>Add Exercise:</label>
            <label>
                Name:
                {" "}
                <input value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Weight:
                {" "}
                <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
            </label>
            <label>
                Group:
                {" "}
                <input value={group} onChange={(e) => setGroup(e.target.value)} />
            </label>
            <button type="submit" className={addButtonDisabled ? "text-gray-500" : ""}
                disabled={addButtonDisabled}><b>Add</b></button>
        </form>
    );
}
