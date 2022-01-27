import React, { createContext,useState } from 'react'
export const DataContext = createContext()


function Context({ children }) {
    const [state, setstate] = useState([])
    const [isLoaged, setisLoaged] = useState(false)
    const [adminTrue, setadminTrue] = useState(true)
    const [contact, setcontact] = useState([])
    const [user, setuser] = useState()
    const [cartCount, setcartCount] = useState([])
       
    return (
        <DataContext.Provider value={{Users:[user,setuser],State:[state,setstate],AdminTrue:[adminTrue,setadminTrue],Cartcount:[cartCount,setcartCount],IsLoaged:[isLoaged,setisLoaged]}}>
            {children}
        </DataContext.Provider>
    )
}

export default Context
