import path from "path";
import { addRoommateQuery, getRoommatesQuery } from "../models/userQueries.js";
import { recalcularMontoGastos } from "../models/gastosQueries.js";  
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';  
const __dirname = path.resolve();
const apiUrl = "https://randomuser.me/api/";

export const home = (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
}

export const addRoommate = async (req, res) => {
    try {
        const response = await axios.get(apiUrl);
        const randomUser = response.data.results[0];
        const id = uuidv4().slice(0, 8);
        const newUser = {
          id,
          nombre: `${randomUser.name.first} ${randomUser.name.last}`,
          email: randomUser.email,
          debe: 0,
          recibe: 0,
        };


        const results = await addRoommateQuery(newUser);
        recalcularMontoGastos();
        res.status(201).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getRoommates = async (req, res) => {
    try {
        const results = await getRoommatesQuery();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}