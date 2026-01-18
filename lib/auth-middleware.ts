import { auth } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

type Role = "ADMIN" | "USER";

export function withAuth(
    handler: (req: NextApiRequest, res: NextApiResponse, session: any) => Promise<void> | void,
    requiredRole?: Role
) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const session = await auth.api.getSession({
            headers: req.headers as unknown as HeadersInit,
        });

        if (!session) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Role check
        // Note: session.user.role comes from database via Better Auth additionalFields or schema
        const userRole = (session.user as any).role;

        if (requiredRole && userRole !== requiredRole) {
            return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
        }

        return handler(req, res, session);
    };
}
