"use client";

import Header from "./header.js";
import Workout from "./workout.js";
import OrmCalculator from "./orm-calculator.js";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { doc, getFirestore, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation.js";

export default function Home() {
  let [workouts, setWorkouts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    try {
      const auth = getAuth();
      const uid = auth.currentUser.uid;
      if (!uid) {
        router.push("/");
      }
      loadWorkouts(uid);
    } catch (e) {
      router.push("/");
    }
  }, []);

  async function loadWorkouts(uid) {
    const firestore = getFirestore();
    const dbWorkouts = doc(firestore, `users/${uid}/data/workouts`);
    const snapshot = await getDoc(dbWorkouts);
    if (snapshot.exists()) {
      setWorkouts(snapshot.data().workouts);
    }
  }

  function saveWorkouts() {
    const auth = getAuth();
    const uid = auth.currentUser.uid;

    const firestore = getFirestore();
    const dbWorkouts = doc(firestore, `users/${uid}/data/workouts`);
    const docData = {
      user: uid,
      workouts: workouts,
    };
    setDoc(dbWorkouts, docData);
  }

  function handleAddWorkout() {
    console.log("Workouts", JSON.stringify(workouts));
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

  function handleEditWorkoutName(id, name) {
    setWorkouts(
      workouts.map((workout) => {
        if (workout.id === id) {
          return {
            ...workout,
            name: name,
          };
        } else {
          return workout;
        }
      }),
    );
  }

  function handleEditWorkoutExercises(id, exercises) {
    setWorkouts(
      workouts.map((workout) => {
        if (workout.id === id) {
          return {
            ...workout,
            exercises: exercises,
          };
        } else {
          return workout;
        }
      }),
    );
  }

  return (
    <>
      <Header />
      <main className="px-6 py-10 sm:px-10 md:px-32 md:py-20 lg:px-56">
        <button
          className="mb-12 w-full bg-slate-950 px-6 py-1 text-white active:bg-slate-600"
          onClick={saveWorkouts}
        >
          Save Changes
        </button>
        {workouts.map((workout) => (
          <Workout
            workoutId={workout.id}
            name={workout.name}
            key={workout.id}
            exercises={workout.exercises}
            setName={handleEditWorkoutName}
            setExercises={handleEditWorkoutExercises}
            onDelete={handleDeleteWorkout}
          />
        ))}
      </main>
      <AddWorkoutButton
        empty={workouts.length === 0}
        onClick={() => {
          handleAddWorkout();
        }}
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
