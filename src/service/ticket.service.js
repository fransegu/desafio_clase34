import { ticketManager } from "../DAL/daos/MongoDB/ticketManagerDB.js";

export const findById = (id) => {
    const ticket = ticketManager.findById(id);
    return ticket;
};

export const findByEmail = (id) => {
    const ticket = ticketManager.findByEmail(id);
    return ticket;
};

export const createOneT = (obj) => {
    const createdTicket = ticketManager.createOne(obj);
    return createdTicket;
};