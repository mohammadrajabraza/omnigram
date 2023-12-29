import { useQuery } from "@tanstack/react-query"

import { getUsers } from "@/lib/appwrite/api/users"
import { QUERY_KEYS } from "../queryKeys"

export const useGetUsers = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USERS],
        queryFn: getUsers,
    })
}
