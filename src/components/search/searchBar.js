"use client";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { fetchSearchResults } from "../../store/slices/searchSlice";
import {
  TextField,
  IconButton,
  InputAdornment,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { results, loading } = useSelector((state) => state.search);
  const searchContainerRef = useRef(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim().length >= 3) {
        dispatch(fetchSearchResults(query));
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleResultClick = () => {
    setQuery("");
    setShowResults(false);
  };

  return (
    <Box sx={{ position: "relative" }} ref={searchContainerRef}>
      <TextField
        id="search-bar"
        label="Search"
        variant="outlined"
        size="small"
        placeholder="Search..."
        aria-label="Search products"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onFocus={() => {
          if (query.trim().length >= 3 && results.length > 0) {
            setShowResults(true);
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="search">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          width: {
            xs: 180,
            sm: 240,
            md: 300,
          },
        }}
      />
      {showResults && (
        <Paper
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1,
            mt: 1,
          }}
        >
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <CircularProgress />
            </Box>
          )}
          {!loading && results.length > 0 && (
            <List role="listbox" aria-label="Search results" component="ul">
              {results.map((product, index) => (
                <li key={product.id} role="option" aria-selected="false">
                  <ListItemButton
                    component={Link}
                    href={`/products/${product.id}`}
                    onClick={handleResultClick}
                    aria-posinset={index + 1}
                    aria-setsize={results.length}
                  >
                    <ListItemText primary={product.name} />
                  </ListItemButton>
                </li>
              ))}
            </List>
          )}
          {!loading && results.length === 0 && query.trim() && (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <ListItemText primary='No products found.' />
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar;
