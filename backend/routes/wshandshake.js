import { Router } from "express";
import { decodeToken } from "../helpers/jwtToken.js";

const router = Router();

router.post("/", (req, res) => {
  const token = req.cookies?.authToken;
  if (!token)
    return res.status(401).json({
      message: "Hey There Your Session Has Expired Please Login Again",
    });
  const userData = decodeToken(token);
  if (!userData)
    return res.status(401).json({ message: "You are not Authorised" });
  return res.status(200).json({ status: true, token });
});

export default router;
