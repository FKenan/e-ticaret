"use client";
import { useState, useEffect } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  loginUser,
  selectIsAuthenticated,
  selectUserLoading,
} from "@/store/slices/userSlice";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectUserLoading);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/profile");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          my: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h3" fontWeight="bold">
          Welcome Back!
        </Typography>
        <Typography component="p" variant="h5" sx={{ mt: 1 }}>
          Please login to your account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <LockIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            color="warning"
            sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: "16px" }}
            disabled={loading}
          >
            Login
          </Button>
          <Link
            href="/register"
            underline="none"
            sx={{
              color: "black",
              mt: 2,
            }}
          >
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
