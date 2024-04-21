import { DataModel } from "../Model/DataModel.js";

export const DataController = async (req, res) => {
    try {
        const {firstName, lastName, eMail, dateOfBirth} = req.body;
        console.log(req.body);
        if (!firstName || !lastName || !eMail || !dateOfBirth) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        const residentialAddress = JSON.parse(req.body.residentialAddress);
        const permanentAddress = JSON.parse(req.body.permanentAddress);

        const post = await DataModel.create({
            firstName,
            lastName,
            eMail,
            dateOfBirth,
            residentialAddress,
            permanentAddress
        });
    
        res.status(200).json({
            success: true,
            message: "Data Save Succefully!",
            post
        });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ message: "An error occurred while processing the request" });
    }
}
