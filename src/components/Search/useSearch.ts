import useFetch from "@/util/useFetch";
import { useState } from "react";
import { Video } from "./Search";

type useSearchProps = {
  value: string;
  type: string;
};


export default function useSearch({ value, type } : useSearchProps) {
  const [loading, setLoading ] = useState<boolean>(false)
  const { data: videos, error } = useFetch<Video[]>(
    value ? `https://fhd2973bk2.execute-api.eu-west-2.amazonaws.com/prod/videos/search?query=${value}&type=${type}` : '',
  )

  if(value && !loading && !videos) {
    setLoading(true)
  }
  if(!value && loading || videos && loading) {
    setLoading(false)
  }

  return { videos, loading, error };
};