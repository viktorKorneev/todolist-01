import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button.tsx";

type Props = {
    onCreateItem: (title: string) => void,
}

export const CreateItemForm = ({onCreateItem}: Props) => {
// const inputRef = useRef<HTMLInputElement>(null); ❗-- useRef() -- ❗
    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const createItemHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (taskTitle !== "") {
            onCreateItem(trimmedTitle)
            setTaskTitle("")
        } else {
            setError("Title is required")
        }
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            createItemHandler()
        }
    }

    return (
        <div>
            <input className={error ? "error" : ""}
                   value={taskTitle}
                   onChange={changeItemTitleHandler}
                   onKeyDown={createItemOnEnterHandler}/>
            <Button title={"+"} onClick={createItemHandler}/>
            {error && <div className={"error-message"}>{error}</div>}

            {/*/!*<input ref={inputRef}/>*!/---------------------*/}
            {/*/!*<Button title={"+"} onClick={() => {*!/      --*/}
            {/*/!*    if (inputRef.current) {*!/               --*/}
            {/*/!*        createTask(inputRef.current.value)*!/-------❗ useRef()*/}
            {/*/!*        inputRef.current.value = ""*!/   ------*/}
            {/*/!*    }*!/                                   ----*/}
            {/*/!*}}/>*!/----------------------------------------*/}

        </div>
    )
}

