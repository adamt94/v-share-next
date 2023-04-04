import { InputBase } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export type SearchFormProps = {
  onSubmit: (value: string) => void;
};

export default function SearchForm({ onSubmit }: SearchFormProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center gap-4">
      <div className="surface-1 on-surface-text flex items-center gap-2 p-1 px-3 w-4/6">
        <SearchIcon />

        <InputBase
          placeholder="Search or paste a youtube link..."
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          fullWidth
          className="on-primary-container-text"
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    </form>
  );
}
