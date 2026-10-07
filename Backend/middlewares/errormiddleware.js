export let errormidd = async (error, req, resp, next) => {
    console.error(error.message); // ✅ direct use
    resp.status(500).send({
        message: "internal error",
        error: error.message,
    })
}