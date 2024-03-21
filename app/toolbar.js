import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export default function Toolbar({ onIncrementAll, onIncrementGroup, exerciseList }) {
    let [selection, setSelection] = useState("")

    const empty = exerciseList.length === 0
    const activeButtonStyles = "py-1.5 px-4 rounded-xl hover:bg-gray-200 active:bg-neutral-800 active:text-gray-100 ";
    const disabledButtonStyles = "py-1.5 px-4 rounded-xl text-gray-500 ";

    return (
        <>
            <div className="bg-gray-300 text-gray-800 pb-6 flex gap-8 px-12 font-bold items-center">
                Actions:
                <ul className="flex flex-wrap gap-8 gap-y-2 font-light">
                    <li><button title={empty ? "Add an exercise to perform actions" : "Increment weight for all exercises"}
                        onClick={(e) => {
                            setSelection((selection === "increment all") ? "" : "increment all");
                            e.stopPropagation();
                        }}
                        disabled={empty}
                        className={empty
                            ? disabledButtonStyles
                            : (activeButtonStyles
                                + (selection === "increment all" ? "bg-neutral-800 text-gray-100 hover:bg-gray-900" : undefined))}
                    >Increment All</button></li>
                    <li><button title={empty ? "Add an exercise to perform actions" : "Increment weight by group"}
                        onClick={(e) => {
                            setSelection((selection === "increment group") ? "" : "increment group");
                            e.stopPropagation();
                        }}
                        disabled={empty}
                        className={empty
                            ? disabledButtonStyles
                            : (activeButtonStyles
                                + (selection === "increment group" ? "bg-neutral-800 text-gray-100 hover:bg-gray-900" : undefined))
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
            {selection === "increment all"
                && <IncrementAll
                    onIncrement={onIncrementAll} />}
        </>
    );
}

function IncrementAll({ onIncrement }) {
    let [incrementAmount, setIncrementAmount] = useState(0);

    const sectionStyle = "flex items-center gap-4";
    const activeButtonStyles = "py-1.5 px-3 rounded-xl hover:bg-gray-200 active:bg-neutral-800 active:text-gray-100 ";
    const disabledButtonStyles = "py-1.5 px-3 rounded-xl text-gray-500";
    const buttonsDisabled = incrementAmount <= 0;

    return (
        <div className="bg-gray-300 text-gray-700 pb-6 flex flex-wrap gap-12 gap-y-4 px-12 font-semibold items-center">
            <form onSubmit={(e) => e.preventDefault()}>
                <label className={sectionStyle}>Amount:
                    <input type="number" min={0} value={incrementAmount} className="w-16 p-1 font-light"
                        onChange={(e) => setIncrementAmount(e.target.value)}
                    />
                </label>
            </form>
            <form onSubmit={(e) => e.preventDefault()}>
                <button
                    className={buttonsDisabled ? disabledButtonStyles : activeButtonStyles}
                    onClick={(e) => {
                        onIncrement(Number(incrementAmount));
                        e.stopPropagation();
                    }}>
                    Apply
                </button>
            </form>
        </div>
    );
}

function GroupSelector({ groups, onIncrement }) {
    let [incrementAmount, setIncrementAmount] = useState(0);

    const sectionStyle = "flex items-center gap-4";
    const activeButtonStyles = "py-1.5 px-3 rounded-xl hover:bg-gray-200 active:bg-neutral-800 active:text-gray-100 ";
    const disabledButtonStyles = "py-1.5 px-3 rounded-xl text-gray-500";
    const buttonsDisabled = incrementAmount <= 0;

    return (
        <div className="bg-gray-300 text-gray-700 pb-6 flex flex-wrap gap-12 gap-y-4 px-12 font-semibold items-center">
            <form onSubmit={(e) => e.preventDefault()}>
                <label className={sectionStyle}>Amount:
                    <input type="number" min={0} value={incrementAmount} className="w-16 p-1 font-light"
                        onChange={(e) => setIncrementAmount(e.target.value)}
                    />
                </label>
            </form>
            <form onSubmit={(e) => e.preventDefault()} className={sectionStyle}>
                <label>Select Group to Increment:</label>
                <ul className="flex flex-wrap gap-4 gap-y-2 font-light">
                    {groups.map((group) =>
                        <li key={uuidv4()}>
                            <button
                                onClick={(e) => {
                                    onIncrement(Number(incrementAmount), group);
                                    e.stopPropagation();
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
