import { useState } from "react";
import Modal from "./modal";
import {
  InformationCircleIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

const panelStyles = "bg-gray-200 text-gray-800 ";

export default function OrmCalculator() {
  let [isPulledUp, setIsPulledUp] = useState(false);

  return (
    <div className="fixed -bottom-1 w-full">
      <div>
        <button
          title="Open one rep max calculator"
          className={
            panelStyles +
            (isPulledUp
              ? undefined
              : "transition duration-300 ease-in-out sm:hover:-translate-y-1 ") +
            "ml-4 flex h-10 items-start rounded-t-lg px-6 py-1 font-semibold sm:ml-12"
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
  let [isInfoOpen, setIsInfoOpen] = useState(false);

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
    <>
      {isInfoOpen && (
        <Modal onExit={() => setIsInfoOpen(false)}>
          <h2 className="mb-2 font-bold">One Rep Max Calculator</h2>
          <p className="mb-2">
            This one rep max (ORM) calculator estimates the maximum weight you
            can successfully lift once given a weight and rep count. It uses the
            following formula (created by Matt Brzycki):
          </p>
          <p>
            <em>ORM</em> = <em>Weight</em> &divide; (1.0278 - 0.0278 &times;{" "}
            <em>Reps</em>)
          </p>
        </Modal>
      )}
      <div className={panelStyles + "px-12 pb-12 pt-6"}>
        <div className="text-right">
          <IconButton id="info-button" onClick={() => setIsInfoOpen(true)}>
            <InformationCircleIcon />
          </IconButton>
        </div>
        <div className="md:px-10 lg:px-28">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-wrap items-end justify-between gap-10 sm:flex-nowrap md:gap-20 lg:gap-36"
          >
            <label className={labelStyles}>
              Weight:
              <input
                name="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className={inputStyles}
              />
            </label>
            <label className={labelStyles}>
              Reps:
              <input
                name="repetitions"
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className={inputStyles}
              />
            </label>
            <label className={labelStyles + "flex items-end gap-5"}>
              <div className="flex-grow">
                One Rep Max:
                <input
                  name="one-rep-max"
                  type="number"
                  className={inputStyles}
                  value={getOrm()}
                  readOnly
                />
              </div>
              <IconButton
                id="copy-button"
                onClick={() => {
                  navigator.clipboard.writeText(getOrm());
                  alert("One rep max copied to clipboard!");
                }}
              >
                <DocumentDuplicateIcon />
              </IconButton>
            </label>
          </form>
        </div>
      </div>
    </>
  );
}

function IconButton({ children, onClick }) {
  return (
    <button
      className="h-6 w-6 text-gray-600 sm:hover:text-gray-950"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
