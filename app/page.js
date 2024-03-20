"use client";

import Header from "./header.js";
import Workout from "./workout.js";
import { data, mockWorkouts } from "./mock-data.js";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid"

export default function Home() {
    let [workouts, setWorkouts] = useState([]);

    function handleAddWorkout() {
        setWorkouts([
            ...workouts,
            {
                id: uuidv4(),
                name: "New workout",
                exercises: [],
            },
        ]);
    }

    function handleDeleteWorkout(id) {
        setWorkouts(workouts.filter((workout) =>
            workout.id !== id
        ));
    }

    return (
        <>
            <Header />
            <main className="px-64 py-20">
                {workouts.map((workout) =>
                    <Workout workoutId={workout.id} name={workout.name} key={workout.id} exercises={workout.exercises} onDelete={handleDeleteWorkout} />
                )}
            </main>
            <AddWorkoutButton empty={workouts.length === 0} onClick={handleAddWorkout} />
        </>
    );
}

export function AddWorkoutButton({ empty, onClick }) {
    return (
        <div className="flex items-center gap-4 fixed right-12 bottom-8">
            {empty && <p className="italic animate-pulse">Click here to add a workout -&gt;</p>}
            <button className="text-6xl bg-green-600 
                rounded-full flex justify-center w-16 h-16 hover:bg-green-700"
                onClick={onClick}>
                +
            </button>
        </div>
    );
}
