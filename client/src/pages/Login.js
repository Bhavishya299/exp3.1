const onSubmit = async(data) => {
    console.log("Sending data:", data); // 👈 DEBUG

    setLoading(true);
    try {
        const res = await API.post("/login", {
            email: data.email,
            password: data.password,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);

        alert("Login Success");
        navigate("/dashboard");
    } catch (err) {
        console.log(err.response ? .data); // 👈 SEE ERROR
        alert("Login Failed");
    }
    setLoading(false);
};