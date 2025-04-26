export const getMassege = async(req,res) => {
    try {
        return res.status(200).json({success: true ,message: "massege found"});
        
    } catch (error) {
        return next(error)
    }


}   