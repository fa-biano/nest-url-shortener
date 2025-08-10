import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context)
  }

  handleRequest<TUser = any>(err: unknown, user: TUser | null, info: unknown): TUser | null {
    const safeMessages: string[] = ['invalid signature', 'invalid token', 'jwt expired']
    if (
      err ||
      (info &&
        typeof info === 'object' &&
        'message' in info &&
        !(info instanceof UnauthorizedException))
    ) {
      const message = (info as { message?: string }).message
      if (message && message !== 'No auth token') {
        const safeMessage = safeMessages.find((m) => m === message) ?? 'Unauthorized'
        throw err instanceof Error ? err : new UnauthorizedException(safeMessage)
      }
    }
    return user || null
  }
}
