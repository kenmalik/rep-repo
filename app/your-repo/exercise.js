"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ToggleButton } from "./toggle-button";

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
    <div className="px-12 py-8 text-gray-800">
      <div className="flex items-center">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mr-6 h-4 w-4 flex-shrink-0"
        >
          {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </button>
        <div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-grow flex-wrap justify-between gap-4"
          >
            <div className="flex flex-wrap items-center gap-8 gap-y-6">
              <div>
                <b>Exercise:</b>{" "}
                {isEditable ? (
                  <input
                    name="exercise-name"
                    type="text"
                    value={exercise.name}
                    maxLength={32}
                    className="w-32 bg-gray-200 p-1"
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
                    className="w-16 bg-gray-200 p-1"
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
                    className="w-32 bg-gray-200 p-1"
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
                className="py-2 text-rose-500 hover:underline"
              >
                Delete
              </button>
            )}
          </form>
        </div>
      </div>
      {isExpanded && <Dropdown weight={exercise.weight} />}
    </div>
  );
}

function Dropdown({ weight }) {
  const [roundInterval, setRoundInterval] = useState(-1);
  const [isBarbell, setIsBarbell] = useState(false);

  const percentages = [
    5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
    100,
  ];

  function handleRoundChange(value) {
    if (value === "None") {
      setRoundInterval(-1);
    } else {
      setRoundInterval(value);
    }
  }

  function getPercentage(amount) {
    let percent = (amount / parseFloat(100)) * weight;

    if (isBarbell) {
      percent = (percent - 45) / 2;
    }

    if (roundInterval > 0) {
      percent = round(percent, roundInterval);
    }

    return percent > 0 ? percent : 0;
  }

  function round(n, interval) {
    return Math.ceil(n / interval) * interval;
  }

  return (
    <div className="mt-8 text-gray-600">
      <div className="mb-6 flex items-center justify-between gap-2">
        <label htmlFor="round-amount">
          Round to
          <select
            onChange={(e) => handleRoundChange(e.target.value)}
            className="ml-2 p-1"
            id="round-amount"
            name="round-amount"
          >
            <option>None</option>
            <option>2.5</option>
            <option>5</option>
            <option>10</option>
          </select>
        </label>
        <ToggleButton
          isToggled={isBarbell}
          activeTitle="Doing a barbell workout?"
          onClick={(e) => {
            setIsBarbell(!isBarbell);
            e.stopPropagation();
          }}
        >
          Barbell
        </ToggleButton>
      </div>
      <h2 className="mb-4">Percentages</h2>
      <div className="flex flex-wrap gap-10">
        {percentages.map((percentage) => (
          <p key={uuidv4()}>
            <b>{percentage}:</b>
            {" " + getPercentage(percentage).toFixed(1)}
          </p>
        ))}
      </div>
    </div>
  );
}
