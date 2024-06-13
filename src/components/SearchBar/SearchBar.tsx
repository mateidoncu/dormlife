"use client";

import { useState } from "react"
import Search from "../Search/Search"

const SearchBar = () => {
    const [roomTypeFilter, setRoomTypeFilter] = useState("")
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <Search
            roomTypeFilter={roomTypeFilter}
            searchQuery={searchQuery}
            setRoomTypeFilter={setRoomTypeFilter}
            setSearchQuery={setSearchQuery}
        />
  )
}

export default SearchBar