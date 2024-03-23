import { useState } from "react";

const panelStyles = "bg-gray-200 text-gray-800 ";

export default function OrmCalculator() {
  let [isPulledUp, setIsPulledUp] = useState(false);

  return (
    <div className="fixed -bottom-1 w-full">
      <div>
        <button
          className={
            panelStyles +
            (isPulledUp
              ? undefined
              : "transition ease-in-out duration-300 sm:hover:-translate-y-1 ") +
            "h-10 ml-4 sm:ml-12 px-6 py-1 rounded-t-lg font-semibold flex items-start"
          }
          onClick={() => setIsPulledUp(!isPulledUp)}
        >
          ORM Calculator
        </button>
      </div>
      {isPulledUp && <Body />}
    </div>
  );
}

function Body() {
  let [weight, setWeight] = useState(0);
  let [reps, setReps] = useState(0);

  const labelStyles = "flex-grow font-semibold ";
  const inputStyles = "block mt-1 w-full font-light ";

  function getOrm() {
    if (reps > 0 && 1.0278 - 0.0278 * reps > 0) {
      return (weight / (1.0278 - 0.0278 * reps)).toFixed(2);
    } else {
      return 0;
    }
  }

  return (
    <div className={panelStyles + "px-12 pt-6 pb-12"}>
      <div className="text-right">
        <button className="w-6 h-6 text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
        </button>
      </div>
      <div className="md:px-10 lg:px-28">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-wrap sm:flex-nowrap items-end gap-10 md:gap-20 lg:gap-36 justify-between"
        >
          <label className={labelStyles}>
            Weight:
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className={inputStyles}
            />
          </label>
          <label className={labelStyles}>
            Reps:
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className={inputStyles}
            />
          </label>
          <label className={labelStyles + "flex items-end gap-5"}>
            <div>
              One Rep Max:
              <input
                type="number"
                className={inputStyles}
                value={getOrm()}
                readOnly
              />
            </div>
            <button
              className="flex-grow-0 text-gray-600 transition sm:hover:text-gray-800"
              onClick={() => {
                navigator.clipboard.writeText(getOrm());
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                />
              </svg>
            </button>
          </label>
        </form>
      </div>
    </div>
  );
}
