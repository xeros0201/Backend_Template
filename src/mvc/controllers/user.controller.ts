import { transStrings } from '../../constString/Register';
import { Request, Response } from 'express';
import { getIDfromToken } from '../../helpers/getIDfromToken';
 
import { User } from '../models';
import { JwtPayload } from '../types/express';
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const UserProfile = (req: Request | any, res: Response) => {
  const user_id:JwtPayload =  req.jwtPayload
 
  console.log('user_id', user_id);
  return User.findById(user_id.id, function (err, user) {
    if (err) throw err;

    if (!user) {
      res.status(403).json({
        success: false,
        message: "Người dùng không tồn tại !!",
      });
    } else if (user) {

      const {password,...main_user } = user._doc
      res.status(200).send({
        success: true,
        user: {
          ...main_user

        },
      });
    }
  });
};
const UserAvatar = async (req: Request | any, res: Response) => {
  try {

      const  {id }:JwtPayload =   req.jwtPayload 
      console.log(req.file)
      console.log({id})
      await User.findOneAndUpdate({_id:id},{
        $set:{
          avatar: `${process.env.DOMAIN}/static/${req.file.filename}`
        }
      })
      return res.status(200).json({success:true,message:"Lưu avatar thành công !!"})
  } catch (error) {
      return res.status(500).json(error)
  }
};
const UserUpdate = async (req: Request | any, res: Response) => {
  const user_id = getIDfromToken(req);
  console.log('user_id', user_id);
  const { email, password, name } = req.body;
  if (email) delete req.body.email;
  if (name) req.body.name = name;
  if (password) {
    const newPassword = bcrypt.hashSync(password, saltRounds);
    req.body.password = newPassword;
  }
  const user = await User.findOneAndUpdate({ _id: user_id }, { $set: req.body }, { new: true });

  return res.status(200).send({
    success: true,
    message: req.t(transStrings.profileupdatedsuccessfuly),
    user: user,
  });
};
export { UserProfile, 
          UserUpdate,
          UserAvatar
};
