import Specialty from "../models/schemas/specialty.model";
import ResponseError from "../classes/response-error.class";

const getSpecialty = async (req, res) => {
    const specialties = await Specialty.find({}).populate("doctors").lean();

    const cleanedSpecialties = specialties.map(specialty => {
        if (!specialty.doctors) return specialty;

        return {
            ...specialty,
            doctors: specialty.doctors.map(doc => {
                const { password, email, last_login, createdAt, updatedAt, ...cleanedDoc } = doc;
                return cleanedDoc;
            })
        };
    });

    res.status(200).json({
        success: true,
        type: "success",
        message: "Specialties fetched successfully",
        data: cleanedSpecialties,
    });
};

export { getSpecialty };