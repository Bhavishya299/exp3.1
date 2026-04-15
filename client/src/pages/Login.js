// pages/Login.js

import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // ✅ for redirect

    const onSubmit = async(data) => {
        setLoading(true);
        try {
            const res = await API.post("/login", data);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);

            alert("Login Success");

            // ✅ Redirect to dashboard
            navigate("/dashboard");

        } catch (error) {
            alert("Login Failed");
        }
        setLoading(false);
    };

    return ( <
        Box sx = {
            {
                width: 350,
                margin: "120px auto",
                padding: 3,
                boxShadow: 3,
                borderRadius: 2,
                textAlign: "center",
            }
        } >
        <
        Typography variant = "h4"
        mb = { 2 } >
        Login <
        /Typography>

        <
        form onSubmit = { handleSubmit(onSubmit) } >
        <
        TextField fullWidth label = "Email"
        margin = "normal" {...register("email", { required: true }) }
        />

        <
        TextField fullWidth label = "Password"
        type = "password"
        margin = "normal" {...register("password", { required: true }) }
        />

        <
        Button fullWidth variant = "contained"
        type = "submit"
        sx = {
            { mt: 2 } } >
        { loading ? < CircularProgress size = { 24 }
            color = "inherit" / > : "Login" } <
        /Button> <
        /form> <
        /Box>
    );
}