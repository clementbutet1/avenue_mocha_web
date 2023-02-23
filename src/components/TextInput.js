import React from "react";


const TextInput = (props) => {
    return (
        <input type={props.type} placeholder={props.placeHolder}
            value={props.value}
            onChange={(e) => [props.setError(false), props.setValue(e.target.value)]}
            minLength={5}
            maxLength={100}
            className={(props.error === true) ? "flex px-3 py-2 md:px-4 md:py-3 border-2 border-red-500  dark:text-black dark:bg-white rounded-lg font-medium placeholder:font-normal" :
                "flex px-3 py-2 md:px-4 md:py-3 border-2 border-black dark:bg-white  dark:border-slate-400 dark:text-black rounded-lg font-medium placeholder:font-normal"} />
    );
};

export default TextInput;
