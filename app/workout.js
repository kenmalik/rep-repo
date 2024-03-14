"use client";

import { useState } from "react";
import Exercise from "./exercise.js"
import { v4 as uuidv4 } from "uuid"

export default function Workout({ name, exercises }) {
    let [exerciseList, setExerciseList] = useState(exercises);
    let [isEditing, setIsEditing] = useState(false);
    let [title, setTitle] = useState(name);

    function handleAdd(exercise) {
        setExerciseList([
            ...exerciseList,
            exercise
        ]);
    }

    function handleDelete(id) {
        setExerciseList(exerciseList.filter((exercise) =>
            exercise.id !== id
        ));
    }

    return (
        <>
            <form
                className="bg-gray-300 text-black py-6 px-12 flex justify-between items-center"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                {isEditing ?
                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} className="font-bold text-3xl px-3 py-1" />
                    : <h1 className="font-bold text-3xl">{title}</h1>
                }
                <button type="submit" onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Finish Edits" : "Edit"}</button>
            </form>
            {isEditing && <AddExercise onAdd={handleAdd} />}
            {exerciseList.map((exercise) =>
                <Exercise exercise={exercise} key={exercise.id} isEditable={isEditing} onDelete={handleDelete} />
            )}
        </>
    );
}

export function AddExercise({ onAdd }) {
    let [name, setName] = useState("");
    let [weight, setWeight] = useState(0);
    let [group, setGroup] = useState("");

    return (
        <form
            className="bg-gray-300 text-black py-3 flex gap-6 px-12"
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
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </label>
            <label>
                Group:
                {" "}
                <input value={group} onChange={(e) => setGroup(e.target.value)} />
            </label>
            <button type="submit">Add</button>
        </form>
    );
}
