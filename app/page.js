"use client";

import Workout from "./workout.js";
import { data, mockWorkouts } from "./mock-data.js";
import { useState } from "react";

export default function Home() {
    let [workouts, setWorkouts] = useState(mockWorkouts);

    return (
        <>
            {workouts.map((workout) =>
                <Workout name={workout.name} key={workout.name} exercises={workout.exercises} />
            )}
        </>
    );
}
