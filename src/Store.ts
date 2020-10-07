import { Dispatch, useCallback } from "react";
import { assert } from "./assert";
import * as ReactRedux from "react-redux";
import { GameParams } from "./Form";
import * as M from "./Matrix";
import produce from "immer";

type State = Game | null;
type Game = {
  params: GameParams;
  player: Cell;
  gameOver: boolean;
  board: M.Matrix<Node>;
};

type Cell = "X" | "O";
type Node = { value: Cell; isWin: boolean };

type Action =
  | {
      type: "move";
      pos: M.Pos;
    }
  | { type: "restart" }
  | { type: "reset" }
  | { type: "config"; params: GameParams };

const initState = (params: GameParams): Game => ({
  params,
  player: "X",
  gameOver: false,
  board: [],
});

export const appReducer = (st: State | undefined, action: Action): State => {
  // Handle the default redux init call
  if (st === undefined) {
    return null;
  }
  if (st == null) {
    assert(
      action.type === "config",
      "when Game state is not initialized only `config` action is accepted"
    );
    return initState(action.params);
  }
  assert(
    action.type !== "config",
    "when Game state is initialized `config` action is not accepted"
  );

  switch (action.type) {
    case "move":
      if (st.gameOver) {
        return st;
      }
      return produce(st, (draft) => moveReducer(draft, action.pos));
    case "restart":
      return initState(st.params);
    case "reset":
      return null;
  }
};

const moveReducer = (st: Game, newCellPos: M.Pos) => {
  const winingDiagonals = M.collectInDiagonalsWhile(newCellPos, (pos) => {
    const cell = M.lookUp(st.board, pos);
    if (cell?.value === st.player) {
      return cell;
    }
    return undefined;
  }).filter((group) => group.length >= st.params.strike - 1);
  const isWin = winingDiagonals.length > 0;
  if (isWin) {
    winingDiagonals.forEach((group) =>
      group.forEach((cell) => {
        cell.isWin = true;
      })
    );

    st.gameOver = true;
  }
  M.set(st.board, newCellPos, { value: st.player, isWin });
  st.player = st.player === "O" ? "X" : "O";
};

export const useDispatch: () => Dispatch<Action> = ReactRedux.useDispatch;

export function useGameSelector<Res>(
  selector: (state: Game) => Res,
  equalityFn?: (left: Res, right: Res) => boolean
): Res {
  const selector_ = useCallback(
    (state: State) => {
      assert(
        state != null,
        "useGameSelector must be used when game state is initialized"
      );

      return selector(state);
    },
    [selector]
  );
  return ReactRedux.useSelector(selector_, equalityFn);
}
