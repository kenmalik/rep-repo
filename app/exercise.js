"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Exercise({ exercise, onDelete, isEditable, onWeightChange }) {
    let [name, setName] = useState(exercise.name);
    let [group, setGroup] = useState(exercise.group);
    let [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white text-gray-800 py-7">
            <div className="flex justify-between flex-wrap px-12">
                <form onSubmit={(e) => e.preventDefault()} className="flex">
                    <button onClick={() => setIsExpanded(!isExpanded)} className="w-4 mr-8">{isExpanded ? "^" : ">"}</button>
                    <div className="flex flex-wrap gap-8 gap-y-6 items-center">
                        <label>
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
                                    value={exercise.weight}
                                    className="bg-gray-200 p-1 w-16"
                                    onChange={(e) => {
                                        onWeightChange(exercise.id, Number(e.target.value));
                                    }} />
                                : exercise.weight
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
                    </div>
                </form>

                {isEditable && <button onClick={() => onDelete(exercise.id)}>Delete</button>}
            </div>
            <div className="ml-28 mt-6 text-gray-600">
                {isExpanded && <Dropdown weight={exercise.weight} />}
            </div>
        </div>
    );
}

function Dropdown({ weight }) {
    const percentages = [65, 60, 75, 80, 85, 90, 95]
    return (
        <div className="flex flex-col gap-4">
            <h2>Percentages</h2>
            <div className="flex ml-2 gap-10 flex-wrap">
                {percentages.map((percentage) =>
                    <p key={uuidv4()}>
                        <b>{percentage}:</b>
                        {" "}
                        {(percentage / parseFloat(100) * weight).toFixed(1)}
                    </p>)}
            </div>
        </div>
    );
}
