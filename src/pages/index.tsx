import { Inter } from "next/font/google";
import { FormEvent } from "react";
import styles from "./index.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    console.log(Object.fromEntries(formData.entries()));
  }

  function validate(coordinatesString: string): [string, number, number] {
    const coordinates = coordinatesString
      .split(",")
      .map((v) => parseFloat(v.trim()));
    if (coordinates.length !== 2) {
      return ["Coordinates must be in the form: lat,lng", 0, 0];
    }

    const [lat, lng] = coordinates;

    console.log(coordinates);

    if (Number.isNaN(lat) || lat < -90 || lat > 90) {
      return ["Latitude must be between -90 and 90", 0, 0];
    }
    if (Number.isNaN(lng) || lng < -180 || lng > 180) {
      return ["Longitude must be between -180 and 180", 0, 0];
    }

    return ["", lat, lng];
  }

  function handleCoordinatesChanged(event: FormEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const value = input.value;
    const [error, lat, lng] = validate(value);

    input.setCustomValidity(error);
  }

  return (
    <div className={inter.className}>
      <form className={styles.locationInputForm} onSubmit={handleSubmit}>
        <label>
          Simulate Location{" "}
          <input name="simulateLocation" type="checkbox" readOnly checked />
        </label>
        <label>
          Coordinates{" "}
          <input
            name="coordinates"
            required
            defaultValue="0, 0"
            onChange={handleCoordinatesChanged}
          />
        </label>
        <label>
          Confidence Radius{" "}
          <input
            name="confidenceRadius"
            required
            type="number"
            min={0}
            step="any"
            defaultValue={0}
          />
        </label>
        <button hidden />
      </form>
    </div>
  );
}
