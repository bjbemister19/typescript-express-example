import {
  type Request,
  type Response,
  type NextFunction,
  type RequestHandler,
} from 'express'

/**
 * Wraps an async route handler so that rejected promises are forwarded to
 * Express's error-handling middleware via next(err).
 *
 * Note: Express 5 handles async errors natively, so this wrapper is not
 * strictly required when running Express 5. It is included here to
 * demonstrate the pattern, which is essential knowledge if you ever work
 * with an Express 4 codebase.
 */
export const asyncHandler = (
  fn: (req: Request, res: Response) => Promise<void>,
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res).catch(next)
  }
}
