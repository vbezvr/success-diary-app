import { useState } from "react"

function useForceUpdate() {
    const [value, setValue] = useState(1);
    return () => {setValue((prevState) => prevState + 1)};
}

export {useForceUpdate}