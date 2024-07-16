import fs from "fs";

export const addRoommateQuery = async (newUser) => {
  try {
    const roommates = JSON.parse(
      fs.readFileSync("./data/roommates.json", "utf-8")
    );
    roommates.roommates.push(newUser);
    fs.writeFileSync("./data/roommates.json", JSON.stringify(roommates));
    return roommates;
  } catch (error) {
    console.log("Error code: ", error.code, "Error message: ", error.message);
  }
};

export const getRoommatesQuery = async () => {
  try {
    const roommates = JSON.parse(
      fs.readFileSync("./data/roommates.json", "utf-8")
    );
    return roommates;
  } catch (error) {
    console.log("Error code: ", error.code, "Error message: ", error.message);
  }
};