import { findByEmail, findById, createOne } from "../service/ticket.service.js";

export const findticketById = async (req, res) => {
    const { tid } = req.params;
    try {
        const ticket = await findById(tid);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json({ message: "Ticket found", ticket });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const findticketByEmail = async (req, res) => {
    const { email } = req.user;
    try {
        const ticket = await findByEmail(email);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json({ message: "Ticket found", ticket });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
export const createOneTicket = async ( req, res) => {
    try {
        const {obj} = req.cookie.ticket;
        const ticket = await createOne(obj)
        res.status(201).json({ message: "Ticket created", ticket });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}