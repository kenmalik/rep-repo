"use client";

import { useState } from "react";

export default function Exercise({ exercise, onDelete }) {
    let [weight, setWeight] = useState(exercise.weight)
    let [isEditing, setIsEditing] = useState(false)

    return (
        <div className="bg-white text-black py-3 flex justify-between px-12">
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-8 items-center">
                <label >
                    <b>Exercise:</b> {exercise.name}
                </label>
                <label>
                    <b>Weight:</b>
                    {" "}
                    {isEditing ?
                        <input type="number"
                            value={weight}
                            className="bg-gray-200 p-1 w-16"
                            onChange={(e) => {
                                setWeight(e.target.value);
                            }} />
                        : weight
                    }
                </label>
                <label >
                    <b>Group:</b> {exercise.group}
                </label>
            </form>

            <div className="flex gap-4">
                <button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Finish" : "Edit"}</button>
                <button onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
}
