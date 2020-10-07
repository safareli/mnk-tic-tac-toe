import { range } from "lodash";
import React, { memo, useCallback } from "react";
import * as M from "./Matrix";
import { useDispatch, useGameSelector } from "./Store";
import "./Board.css";
import { IconO, IconX } from "./Icons";
import { shallowEqual } from "react-redux";

export function Board() {
  const { gameOver, player, rows, columns } = useGameSelector((g) => ({
    gameOver: g.gameOver,
    player: g.player,
    rows: g.params.rows,
    columns: g.params.columns,
  }));
  const dispatch = useDispatch();

  const restart = useCallback(() => {
    dispatch({ type: "restart" });
  }, [dispatch]);

  const reset = useCallback(() => {
    dispatch({ type: "reset" });
  }, [dispatch]);
  return (
    <div className={`Board ${gameOver ? "Board--gameOver" : ""}`}>
      <div className="Board-header">
        <button onClick={restart}> Restart the game</button>
        <div>{gameOver ? `${player} has won` : `${player}'s turn.`}</div>
        <button onClick={reset}> Reset the game</button>
      </div>
      <Grid {...{ rows, columns }} />
    </div>
  );
}

const Grid = memo(({ rows, columns }: { rows: number; columns: number }) => {
  return (
    <div className="Board-grid">
      {range(0, rows).map((y) => (
        <div className="Board-row" key={y}>
          {range(0, columns).map((x) => (
            <Cell x={x} y={y} key={x} />
          ))}
        </div>
      ))}
    </div>
  );
});

const Cell = memo((pos: M.Pos) => {
  const cell = useGameSelector((g) => M.lookUp(g.board, pos), shallowEqual);
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch({ type: "move", pos });
  }, [dispatch, pos]);
  return (
    <div
      className={`Board-cell ${cell?.isWin ? "Board-cell--win" : ""}`}
      onClick={onClick}
    >
      {cell?.value === "X" ? IconX : cell?.value === "O" ? IconO : null}
    </div>
  );
});
