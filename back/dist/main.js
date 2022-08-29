"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('This Or That')
        .setDescription('This Or That API description')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'), {
        prefix: '/uploads',
    });
    app.use(cookieParser());
    app.use(session({
        secret: app.get(config_1.ConfigService).get('SESSION_SECRET'),
        saveUninitialized: false,
        resave: false,
        cookie: { maxAge: 24 * 60 * 60 * 1000, httpOnly: true },
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(3005);
}
bootstrap();
//# sourceMappingURL=main.js.map