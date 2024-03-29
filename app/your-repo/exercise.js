"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Exercise({
  exercise,
  onDelete,
  isEditable,
  onNameChange,
  onWeightChange,
  onGroupChange,
}) {
  let [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white text-gray-800 py-8 px-12">
      <div className="flex">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-6 w-8 mr-6"
        >
          {isExpanded ? "^" : ">"}
        </button>
        <div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-wrap justify-between gap-4 flex-grow"
          >
            <div className="flex flex-wrap gap-8 gap-y-6 items-center">
              <div>
                <b>Exercise:</b>{" "}
                {isEditable ? (
                  <input
                    name="exercise-name"
                    type="text"
                    value={exercise.name}
                    maxLength={32}
                    className="bg-gray-200 p-1 w-32"
                    onChange={(e) => {
                      onNameChange(exercise.id, e.target.value);
                      e.stopPropagation();
                    }}
                  />
                ) : (
                  exercise.name
                )}
              </div>
              <div>
                <b>Weight:</b>{" "}
                {isEditable ? (
                  <input
                    name="exercise-weight"
                    type="number"
                    value={exercise.weight}
                    maxLength={4}
                    className="bg-gray-200 p-1 w-16"
                    onChange={(e) => {
                      onWeightChange(exercise.id, Number(e.target.value));
                      e.stopPropagation();
                    }}
                  />
                ) : (
                  exercise.weight
                )}
              </div>
              <div>
                <b>Group:</b>{" "}
                {isEditable ? (
                  <input
                    name="exercise-group"
                    type="text"
                    value={exercise.group}
                    maxLength={32}
                    className="bg-gray-200 p-1 w-32"
                    onChange={(e) => {
                      onGroupChange(exercise.id, e.target.value);
                      e.stopPropagation();
                    }}
                  />
                ) : (
                  exercise.group
                )}
              </div>
            </div>
            {isEditable && (
              <button
                onClick={() => onDelete(exercise.id)}
                title="Delete exercise"
                className="text-rose-500 hover:underline py-2"
              >
                Delete
              </button>
            )}
          </form>
          {isExpanded && <Dropdown weight={exercise.weight} />}
        </div>
      </div>
    </div>
  );
}

function Dropdown({ weight }) {
  const percentages = [60, 65, 75, 80, 85, 90, 95];
  return (
    <div className="sm:ml-4 md:ml-8 mt-8 text-gray-600">
      <h2 className="mb-4">Percentages</h2>
      <div className="flex gap-10 flex-wrap">
        {percentages.map((percentage) => (
          <p key={uuidv4()}>
            <b>{percentage}:</b>{" "}
            {((percentage / parseFloat(100)) * weight).toFixed(1)}
          </p>
        ))}
      </div>
    </div>
  );
}
