import useSWR from "swr"

export const useCreatePageBlock = ()=>{
  useSWR("/api/",fetch)
}

