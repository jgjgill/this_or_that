import { PrismaService } from 'src/prisma.service';
export declare class GoogleOauthService {
    private prisma;
    constructor(prisma: PrismaService);
    validate({ email, name }: {
        email: any;
        name: any;
    }): Promise<import(".prisma/client").User>;
    findUser(userId: number): Promise<import(".prisma/client").User>;
}
