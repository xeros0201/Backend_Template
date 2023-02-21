








export const  checkReq = async (req,res,next) =>{

    console.log(req.body)
    next()

}