"use client";

import { useState } from "react";
import Exercise from "./exercise.js"

export default function Workout({ name, exercises }) {
    let [exerciseList, setExerciseList] = useState(exercises);

    function handleAdd(exercise) {
        setExerciseList([
            ...exerciseList,
            exercise
        ]);
    }

    return (
        <>
            <div className="bg-gray-300 text-black py-3 px-12">
                <h1 className="font-bold text-3xl">{name}</h1>
            </div>
            <AddExercise onAdd={handleAdd} />
            {exerciseList.map((exercise) =>
                <Exercise exercise={exercise} key={exercise.id} />
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
                    name: name, weight: weight, group: group
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
