import { useState } from "react";

export function Square({value , handleClick}){
    return <button className="square" onClick={handleClick}>{value}</button>
}