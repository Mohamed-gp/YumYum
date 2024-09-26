import { Response, NextFunction } from "express";

import { authRequest } from "../interfaces/authInterface";

const demoAdmin = (req: authRequest, res: Response, next: NextFunction) => {
  if (req.user.id == "66f5f2511fdf318c3e114be4") {
    return res.status(403).json({
      message:
        "Demo Admin cannot perform this action is read-only in some actions",
      data: null,
    });
  }
  next();
};

export default demoAdmin;
