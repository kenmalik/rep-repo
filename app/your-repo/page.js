"use client";

import Header from "./header.js";
import Workout from "./workout.js";
import OrmCalculator from "./orm-calculator.js";
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
      <main className="px-6 py-10 sm:px-10 md:px-32 md:py-20 lg:px-56">
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
      <OrmCalculator />
    </>
  );
}

export function AddWorkoutButton({ empty, onClick }) {
  return (
    <div
      className="fixed bottom-4 right-4 flex items-center
                        gap-4 text-green-100 sm:bottom-8 sm:right-8 md:bottom-8 md:right-12"
    >
      {empty && (
        <p className="animate-pulse italic">
          Click here to add a workout -&gt;
        </p>
      )}
      <button
        title="Add a workout"
        className="flex h-16 w-16 justify-center 
                       rounded-full bg-green-600 text-6xl hover:bg-green-700 
                       sm:transition sm:duration-75 sm:ease-in-out sm:hover:scale-105"
        onClick={onClick}
      >
        +
      </button>
    </div>
  );
}
