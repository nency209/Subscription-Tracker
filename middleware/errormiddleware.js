const errormiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    // error.message = err.message;
    console.error(err);
    if (err.name === "CastError") {
      const message = "Resource not found";
      error = new Error(message);
      error.statusCode = 404;
    }

    if (err.code === 11000) {
      const message = "duplicat feild value enterd";
      error = new Error(message);
      error.statusCode = 400;
    }

    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(","));
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      sucess: false,
      error: error.message || "server Eroor",
    });
  } catch {
    next(err);
  }
};

export default errormiddleware;
