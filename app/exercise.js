"use client";

import { useState } from "react";

export default function Exercise({ exercise, onDelete, isEditable }) {
    let [name, setName] = useState(exercise.name)
    let [weight, setWeight] = useState(exercise.weight)
    let [group, setGroup] = useState(exercise.group)

    return (
        <div className="bg-white text-gray-800 py-7 flex justify-between px-12">
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-8 items-center">
                <label >
                    <b>Exercise:</b>
                    {" "}
                    {isEditable ?
                        <input type="text"
                            value={name}
                            className="bg-gray-200 p-1 w-32"
                            onChange={(e) => {
                                setName(e.target.value);
                            }} />
                        : name
                    }
                </label>
                <label>
                    <b>Weight:</b>
                    {" "}
                    {isEditable ?
                        <input type="number"
                            value={weight}
                            className="bg-gray-200 p-1 w-16"
                            onChange={(e) => {
                                setWeight(Number(e.target.value));
                            }} />
                        : weight
                    }
                </label>
                <label >
                    <b>Group:</b>
                    {" "}
                    {isEditable ?
                        <input type="text"
                            value={group}
                            className="bg-gray-200 p-1 w-32"
                            onChange={(e) => {
                                setGroup(e.target.value);
                            }} />
                        : group
                    }
                </label>
            </form>

            {isEditable && <button onClick={() => onDelete(exercise.id)}>Delete</button>}
        </div>
    );
}
