"use client";

import Header from "./header.js";
import Workout from "./workout.js";
import { data, mockWorkouts } from "./mock-data.js";
import { useState } from "react";

export default function Home() {
    let [workouts, setWorkouts] = useState(mockWorkouts);

    return (
        <>
            <Header />
            <main className="px-64 py-20">
                {workouts.map((workout) =>
                    <Workout name={workout.name} key={workout.name} exercises={workout.exercises} />
                )}
            </main>
        </>
    );
}
