"use client";

import { useState } from "react";

export default function Exercise({ exercise, onDelete, isEditable }) {
    let [name, setName] = useState(exercise.name);
    let [weight, setWeight] = useState(exercise.weight);
    let [group, setGroup] = useState(exercise.group);
    let [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white text-gray-800 py-7">
            <div className="flex justify-between px-12">
                <form onSubmit={(e) => e.preventDefault()} className="flex gap-8 items-center">
                    <button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? "^" : ">"}</button>
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
            <div className="ml-28 mt-6 text-gray-600">
                {isExpanded && <Dropdown weight={weight} />}
            </div>
        </div>
    );
}

function Dropdown({ weight }) {
    const percentages = [65, 60, 75, 80, 85, 90, 95]
    return (
        <div className="flex flex-col gap-4">
            <h2>Percentages</h2>
            <div className="flex flex-col ml-2 gap-2">
                {percentages.map((percentage) =>
                    <p>
                        <b>{percentage}:</b>
                        {" "}
                        {(percentage / parseFloat(100) * weight).toFixed(1)}
                    </p>)}
            </div>
        </div>
    );
}
