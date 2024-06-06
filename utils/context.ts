import { Dispatch, SetStateAction, createContext } from "react"

type UserState = {user: TUser | null, setUser: Dispatch<SetStateAction<TUser | null>>}
export const userContext = createContext<UserState | null>(null)

