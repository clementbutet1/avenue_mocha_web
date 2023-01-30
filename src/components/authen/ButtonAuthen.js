import React from "react";


const ButtonAuthen = (props) => {
    return (
        <button onClick={() => props.functredi()} className="flex dark:text-white dark:border-slate-400 items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black hover:bg-wviolet">{props.title}</button>
    );
};

export default ButtonAuthen;
