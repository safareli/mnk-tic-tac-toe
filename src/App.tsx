import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Board } from "./Board";

import { Form, GameParams } from "./Form";
import { useDispatch } from "./Store";

export function App() {
  const dispatch = useDispatch();
  const isGameReady = useSelector((x) => x != null);
  const onSubmit = useCallback(
    (params: GameParams) => {
      dispatch({ type: "config", params });
    },
    [dispatch]
  );
  return (
    <div>{isGameReady ? <Board /> : <Form onSubmit={onSubmit}></Form>}</div>
  );
}
