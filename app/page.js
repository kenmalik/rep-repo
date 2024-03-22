"use client";

import Header from "./header.js";
import Workout from "./workout.js";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
    setWorkouts(workouts.filter((workout) => workout.id !== id));
  }

  return (
    <>
      <Header />
      <main className="px-4 lg:px-56 md:px-32 sm:px-10 py-10 md:py-20">
        {workouts.map((workout) => (
          <Workout
            workoutId={workout.id}
            name={workout.name}
            key={workout.id}
            exercises={workout.exercises}
            onDelete={handleDeleteWorkout}
          />
        ))}
      </main>
      <AddWorkoutButton
        empty={workouts.length === 0}
        onClick={handleAddWorkout}
      />
    </>
  );
}

export function AddWorkoutButton({ empty, onClick }) {
  return (
    <div
      className="flex items-center gap-4 fixed text-green-100
                        right-2 bottom-4 sm:right-8 sm:bottom-8 md:right-12 md:bottom-8"
    >
      {empty && (
        <p className="italic animate-pulse">
          Click here to add a workout -&gt;
        </p>
      )}
      <button
        className="text-6xl bg-green-600 
                rounded-full flex justify-center w-16 h-16 hover:bg-green-700"
        onClick={onClick}
      >
        +
      </button>
    </div>
  );
}
