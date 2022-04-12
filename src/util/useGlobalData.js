import { createContext, useContext } from 'react'

const GlobalContext = createContext(undefined)

const GlobalDataConfig = GlobalContext.Provider

const   useGlobalData = () => {
    const data = useContext(GlobalContext)
    return data
}

export { GlobalDataConfig }

export default useGlobalData
