"use client";

import Workout from "./workout.js";
import { data } from "./mock-data.js";

export default function Home() {
    return (
        <>
            <Workout name={"Test"} exercises={data} />
        </>
    );
}
