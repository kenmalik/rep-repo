import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

import { ToggleButton } from "./toggle-button";

export default function Toolbar({
  onIncrementAll,
  onIncrementGroup,
  exercises,
}) {
  let [selection, setSelection] = useState("");

  function handleToggle(name) {
    if (selection !== name) {
      setSelection(name);
    } else {
      setSelection("");
    }
  }

  const isExercisesEmpty = exercises.length === 0;

  return (
    <>
      <div className="items-center gap-8 text-gray-700 sm:flex">
        <p className="mb-2 font-semibold sm:mb-0">Actions:</p>
        <ul className="m-0 flex flex-wrap gap-8 gap-y-4 p-0 font-light">
          <li>
            <ToggleButton
              disabledTitle="Add an exercise to perform actions"
              activeTitle="Increment weight for all exercises"
              isToggled={selection === "increment all"}
              onClick={(e) => {
                handleToggle("increment all");
                e.stopPropagation();
              }}
              disabled={isExercisesEmpty}
            >
              Increment All
            </ToggleButton>
          </li>
          <li>
            <ToggleButton
              disabledTitle="Add an exercise to perform actions"
              activeTitle="Increment weight by group"
              isToggled={selection === "increment group"}
              onClick={(e) => {
                handleToggle("increment group");
                e.stopPropagation();
              }}
              disabled={isExercisesEmpty}
            >
              Increment Group
            </ToggleButton>
          </li>
        </ul>
      </div>
      {selection === "increment group" && (
        <GroupSelector
          groups={[...new Set(exercises.map((exercise) => exercise.group))]}
          onIncrement={onIncrementGroup}
        />
      )}
      {selection === "increment all" && (
        <IncrementAll onIncrement={onIncrementAll} />
      )}
    </>
  );
}

function IncrementAll({ onIncrement }) {
  let [incrementAmount, setIncrementAmount] = useState(0);

  const sectionStyle = "flex items-center gap-4";
  const activeButtonStyles =
    "py-1.5 px-3 rounded-xl hover:bg-gray-200 active:bg-neutral-800 active:text-gray-100 ";
  const disabledButtonStyles = "py-1.5 px-3 rounded-xl text-gray-500";
  const buttonsDisabled = incrementAmount <= 0;

  return (
    <div className="flex flex-wrap items-center gap-12 gap-y-4 bg-gray-300 px-12 pb-6 font-semibold text-gray-700">
      <form onSubmit={(e) => e.preventDefault()}>
        <label className={sectionStyle}>
          Amount:
          <input
            name="increment-amount"
            type="number"
            min={0}
            value={incrementAmount}
            className="w-16 p-1 font-light"
            onChange={(e) => setIncrementAmount(e.target.value)}
          />
        </label>
      </form>
      <form onSubmit={(e) => e.preventDefault()}>
        <button
          title={
            buttonsDisabled
              ? "Please select amount to increment by"
              : "Increment all exercises by " + Number(incrementAmount)
          }
          className={
            buttonsDisabled ? disabledButtonStyles : activeButtonStyles
          }
          onClick={(e) => {
            onIncrement(Number(incrementAmount));
            e.stopPropagation();
          }}
        >
          Apply
        </button>
      </form>
    </div>
  );
}

function GroupSelector({ groups, onIncrement }) {
  let [incrementAmount, setIncrementAmount] = useState(0);

  const sectionStyle = "flex items-center gap-4";
  const buttonStyles = "text-sm sm:text-base py-1.5 px-3 rounded-xl ";
  const activeButtonStyles =
    buttonStyles +
    "hover:bg-gray-200 active:bg-neutral-800 active:text-gray-100 ";
  const disabledButtonStyles = buttonStyles + "text-gray-500";
  const buttonsDisabled = incrementAmount <= 0;

  return (
    <div className="flex flex-wrap items-center gap-12 gap-y-4 bg-gray-300 px-12 pb-6 font-semibold text-gray-700">
      <form onSubmit={(e) => e.preventDefault()}>
        <label className={sectionStyle}>
          Amount:
          <input
            name="increment-amount"
            type="number"
            min={0}
            value={incrementAmount}
            className="w-16 p-1 font-light"
            onChange={(e) => setIncrementAmount(e.target.value)}
          />
        </label>
      </form>
      <form onSubmit={(e) => e.preventDefault()} className={sectionStyle}>
        <h3>Select Group to Increment:</h3>
        <ul className="flex flex-wrap gap-4 gap-y-2 font-light">
          {groups.map((group) => (
            <li key={uuidv4()}>
              <button
                title={
                  buttonsDisabled
                    ? "Please select amount to increment by"
                    : 'Increment group "' +
                      group +
                      '" by ' +
                      Number(incrementAmount)
                }
                onClick={(e) => {
                  onIncrement(Number(incrementAmount), group);
                  e.stopPropagation();
                }}
                className={
                  buttonsDisabled ? disabledButtonStyles : activeButtonStyles
                }
                disabled={buttonsDisabled}
              >
                {group}
              </button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}
