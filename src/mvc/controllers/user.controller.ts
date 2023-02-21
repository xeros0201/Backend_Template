import { transStrings } from '../../constString/Register';
import { Request, Response } from 'express';
 
import { User } from '../models';
import { JwtPayload } from '../types/express';
import { IUser } from '../models/user.model';
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const UserProfile = (req: Request | any, res: Response) => {
  const user_id:JwtPayload =  req.jwtPayload
 
  
  return      res.status(200).send({
    success: true,
    user: {
      ...req.user

    },
  });
};
 
const UserUpdate = async (req: Request | any, res: Response) => {
  const user_id =   req.jwtPayload.id;
  
  const { _id,email,card_number,card_owner,bank_branch,office_branch,profile_code,role,salary,department,workday ,password,bank_name,...info }:IUser = req.body;

  const user = await User.findOneAndUpdate({ _id: user_id }, { $set: info }, { new: true });

  return res.status(200).send({
    success: true,
    message: req.t(transStrings.profileupdatedsuccessfuly),
    user: user,
  });
};
const AdminUpdate = async (req: Request | any, res: Response) => {
  const user_id =   req.jwtPayload.id;
  
  const { _id,...info }:IUser = req.body;
  
  // if (password) {
  //   const newPassword = bcrypt.hashSync(password, saltRounds);
  //   req.body.password = newPassword;
  // }
  const user = await User.findOneAndUpdate({ _id: _id }, { $set: info }, { new: true });

  return res.status(200).send({
    success: true,
    message: req.t(transStrings.profileupdatedsuccessfuly),
    user: user,
  });
};

const UserUpdatePassowrd = async (req: Request | any, res: Response) => {
  const user_id =   req.jwtPayload.id;
 
  const {   password  }:IUser = req.body;
 
  if (password) {
    const newPassword = bcrypt.hashSync(password, saltRounds);
    req.body.password = newPassword;
    const user = await User.findOneAndUpdate({ _id: user_id }, { $set: {password: newPassword} }, { new: true });
  
    return res.status(200).send({
      success: true,
      message: req.t(transStrings.profileupdatedsuccessfuly),
      user: user,
    });
  }
  return res.status(500).send({
    success: false,
    message: "Đã có lỗi xảy ra, vui lòng thử lại !",
 
  });

};
export { UserProfile, 
          UserUpdate,
          UserUpdatePassowrd,
          AdminUpdate
      
};
