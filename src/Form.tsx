import React from "react";
import * as F from "formik";
import * as Yup from "yup";
import "./Form.css";
const initialValue = { columns: 10, rows: 10, strike: 4 };
export type GameParams = Yup.InferType<typeof schema>;

export function Form({ onSubmit }: { onSubmit: (params: GameParams) => void }) {
  return (
    <F.Formik
      initialValues={initialValue}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      <F.Form className="Form">
        <label className="Form-input">
          Columns:
          <br />
          <F.Field
            id="columns"
            name="columns"
            placeholder="Columns"
            type="number"
            step="1"
            min="3"
          />
          <F.ErrorMessage
            component="div"
            className="Form-inputError"
            name="columns"
          />
        </label>

        <label className="Form-input">
          Rows:
          <br />
          <F.Field
            id="rows"
            name="rows"
            placeholder="Rows"
            type="number"
            step="1"
            min="3"
          />
          <F.ErrorMessage
            component="div"
            className="Form-inputError"
            name="rows"
          />
        </label>

        <label className="Form-input">
          Strike:
          <br />
          <F.Field
            id="strike"
            name="strike"
            placeholder="Strike"
            type="number"
            step="1"
            min="3"
          />
          <F.ErrorMessage
            component="div"
            className="Form-inputError"
            name="strike"
          />
        </label>

        <button type="submit">Start game</button>
      </F.Form>
    </F.Formik>
  );
}

const integer = Yup.number().positive().integer().required("Required");
const range = (min: number, max: number, schema: Yup.NumberSchema<number>) =>
  schema
    .min(min, `Shouldn't be less then${min}`)
    .max(max, `Shouldn't be more then${max}`);

const schema = Yup.object({
  columns: range(3, 100, integer),
  rows: range(3, 100, integer),
  strike: range(3, 100, integer),
}).defined();
