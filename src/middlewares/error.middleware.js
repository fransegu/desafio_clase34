export const errorMiddleware = (error, req, res, next) => {
    res
    .status(error.code || 500)
    .json({message : error.message, name: error.name});
};