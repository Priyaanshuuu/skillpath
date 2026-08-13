import { Action, State } from "./types"

export const initialState: State = {
    status: "idle",
    courses: [],
    country: null,
    error: null,
}

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "FETCH_START":
            return {
                ...state,
                status: "loading",
                error: null,
            }

        case "COURSES_SUCCESS":
            return {
                ...state,
                status: "success",
                courses: action.payload,
                error: null,
            }

        case "COUNTRY_SUCCESS":
            return {
                ...state,
                country: action.payload,
            }

        case "FETCH_ERROR":
            return {
                ...state,
                status: "error",
                error: action.payload,
            }

        default:
            return state
    }
}