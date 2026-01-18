import { describe, it, expect, vi, beforeEach } from 'vitest';
import { withAuth } from '@/lib/auth-middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/lib/auth';

// Mock the auth module
vi.mock('@/lib/auth', () => ({
    auth: {
        api: {
            getSession: vi.fn(),
        },
    },
}));

describe('withAuth Middleware', () => {
    let req: Partial<NextApiRequest>;
    let res: Partial<NextApiResponse>;
    let jsonMock: any;
    let statusMock: any;

    beforeEach(() => {
        jsonMock = vi.fn();
        statusMock = vi.fn().mockReturnValue({ json: jsonMock });
        req = { headers: {} };
        res = {
            status: statusMock,
        } as any;
        vi.clearAllMocks();
    });

    it('should return 401 if no session exists', async () => {
        (auth.api.getSession as any).mockResolvedValue(null);

        const handler = vi.fn();
        const protectedHandler = withAuth(handler);

        await protectedHandler(req as NextApiRequest, res as NextApiResponse);

        expect(statusMock).toHaveBeenCalledWith(401);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Unauthorized' });
        expect(handler).not.toHaveBeenCalled();
    });

    it('should return 403 if user role does not match required role', async () => {
        (auth.api.getSession as any).mockResolvedValue({
            user: { role: 'USER' },
        });

        const handler = vi.fn();
        const protectedHandler = withAuth(handler, 'ADMIN');

        await protectedHandler(req as NextApiRequest, res as NextApiResponse);

        expect(statusMock).toHaveBeenCalledWith(403);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Forbidden: Insufficient permissions' });
        expect(handler).not.toHaveBeenCalled();
    });

    it('should call handler if user is authorized', async () => {
        const session = { user: { role: 'ADMIN' } };
        (auth.api.getSession as any).mockResolvedValue(session);

        const handler = vi.fn();
        const protectedHandler = withAuth(handler, 'ADMIN');

        await protectedHandler(req as NextApiRequest, res as NextApiResponse);

        expect(handler).toHaveBeenCalledWith(req, res, session);
        expect(statusMock).not.toHaveBeenCalled();
    });
});
