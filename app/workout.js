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

    function handleIncrementAll(amount) {
        setExerciseList(exerciseList.map((exercise) => {
            return {
                ...exercise,
                weight: exercise.weight + amount,
            }
        }));
    }

    function handleIncrementGroup(amount, group) {
        setExerciseList(exerciseList.map((exercise) => {
            if (exercise.group === group) {
                return {
                    ...exercise,
                    weight: exercise.weight + amount,
                };
            } else {
                return exercise;
            }
        }));
    }

    function handleSetWeight(id, weight) {
        setExerciseList(exerciseList.map((exercise) => {
            if (exercise.id === id) {
                return {
                    ...exercise,
                    weight: weight,
                };
            } else {
                return exercise;
            }
        }));
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
                    <button type="submit" onClick={() => setIsEditing(!isEditing)}
                        title={isEditing ? "Save changes to workout" : "Make changes to workout"}>
                        {isEditing ? "Finish Edits" : "Edit"}
                    </button>
                </div>
            </form>
            {!isEditing && <Toolbar onIncrementAll={handleIncrementAll}
                onIncrementGroup={handleIncrementGroup}
                exerciseList={exerciseList} />}
            {isEditing && <AddExercise onAdd={handleAddExercise} />}
            {exerciseList.map((exercise) =>
                <Exercise exercise={exercise} key={exercise.id} isEditable={isEditing} onDelete={handleDeleteExercise}
                    onWeightChange={handleSetWeight} />
            )}
        </div>
    );
}

function AddExercise({ onAdd }) {
    let [name, setName] = useState("");
    let [weight, setWeight] = useState(0);
    let [group, setGroup] = useState("");

    const addButtonDisabled = name === "" || weight < 0 || group === "";

    return (
        <form
            className="bg-gray-300 text-gray-800 pt-2 pb-8 flex flex-wrap gap-6 px-12"
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
            <label className="font-bold">Add Exercise:</label>
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

function Toolbar({ onIncrementAll, onIncrementGroup, exerciseList }) {
    let [selection, setSelection] = useState("")

    const empty = exerciseList.length === 0
    const activeButtonStyles = "py-1.5 px-4 rounded-xl hover:bg-gray-200 active:bg-neutral-800 active:text-gray-100 ";
    const disabledButtonStyles = "py-1.5 px-4 rounded-xl text-gray-500 ";

    return (
        <>
            <div className="bg-gray-300 text-gray-800 pb-6 flex gap-8 px-12 font-bold items-center">
                Actions:
                <ul className="flex gap-8 font-light">
                    <li><button title="Increment weight for all exercises"
                        onClick={() => onIncrementAll(5)}
                        disabled={empty}
                        className={empty ? disabledButtonStyles : activeButtonStyles}
                    >Increment All</button></li>
                    <li><button title="Increment weight by group"
                        onClick={() =>
                            setSelection((selection === "increment group") ? "" : "increment group")}
                        disabled={empty}
                        className={empty
                            ? disabledButtonStyles
                            : (activeButtonStyles
                                + (selection === "increment group" ? "bg-neutral-800 text-gray-100 hover:bg-gray-900" : ""))
                        }
                    >
                        Increment Group
                    </button></li>
                </ul>
            </div>
            {selection === "increment group"
                && <GroupSelector
                    groups={[...new Set(exerciseList.map((exercise) => exercise.group))]}
                    onIncrement={onIncrementGroup} />}
        </>
    );
}

function GroupSelector({ groups, onIncrement }) {
    let [incrementAmount, setIncrementAmount] = useState(0);

    const sectionStyle = "flex items-center gap-4";
    const activeButtonStyles = "py-1.5 px-3 rounded-xl hover:bg-gray-200 active:bg-neutral-800 active:text-gray-100 ";
    const disabledButtonStyles = "py-1.5 px-3 rounded-xl text-gray-500";
    const buttonsDisabled = incrementAmount <= 0;

    return (
        <div className="bg-gray-300 text-gray-700 pb-6 flex gap-12 px-12 font-semibold items-center">
            <form onSubmit={(e) => e.preventDefault()}>
                <label className={sectionStyle}>Amount:
                    <input type="number" min={0} value={incrementAmount} className="w-16 p-1 font-light"
                        onChange={(e) => setIncrementAmount(e.target.value)}
                    />
                </label>
            </form>
            <form onSubmit={(e) => e.preventDefault()} className={sectionStyle}>
                <label>Select Group to Increment:</label>
                <ul className="flex gap-4 font-light">
                    {groups.map((group) =>
                        <li key={uuidv4()}>
                            <button
                                onClick={(e) => {
                                    onIncrement(Number(incrementAmount), group)
                                    e.stopPropagation()
                                }}
                                className={buttonsDisabled ? disabledButtonStyles : activeButtonStyles}
                                disabled={buttonsDisabled}
                            >
                                {group}
                            </button>
                        </li>)
                    }
                </ul>
            </form>
        </div>
    );
}
