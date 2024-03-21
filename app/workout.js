import { useState } from "react";
import Exercise from "./exercise.js"
import Toolbar from "./toolbar.js";
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
            <form className="bg-gray-300 text-gray-800 py-8 px-12 
                             flex flex-wrap gap-4 justify-between items-center"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                {isEditing ?
                    <input type="text" value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="font-bold text-3xl px-4 py-2" />
                    : <h1 className="font-bold text-3xl">{title}</h1>
                }
                <div className="flex gap-6">
                    {isEditing &&
                        <button type="button"
                            onClick={() => onDelete(workoutId)}
                            className="hover:underline">
                            Delete Workout
                        </button>}
                    <button onClick={() => setIsEditing(!isEditing)}
                        className="hover:underline"
                        title={isEditing ? "Save changes to workout" : "Make changes to workout"}>
                        {isEditing ? "Finish Edits" : "Edit"}
                    </button>
                </div>
            </form>
            {!isEditing &&
                <Toolbar onIncrementAll={handleIncrementAll}
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
            <div className="flex flex-wrap gap-6">
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
            </div>
        </form>
    );
}

