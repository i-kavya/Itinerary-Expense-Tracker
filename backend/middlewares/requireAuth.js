// middlewares/requireAuth.js
import { clerkClient, verifyToken } from "@clerk/clerk-sdk-node";

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { sub: userId } = await verifyToken(token);
    const user = await clerkClient.users.getUser(userId);
    req.user = user;
    req.userId = userId;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token", error: err.message });
  }
};
