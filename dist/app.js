"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./utils/config"));
const middleware_1 = __importDefault(require("./utils/middleware"));
const logger_1 = __importDefault(require("./utils/logger"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./controllers/api"));
const app = (0, express_1.default)();
const port = 3001;
if (config_1.default.MONGODB_URI) {
    mongoose_1.default.connect(config_1.default.MONGODB_URI)
        .then(() => {
        logger_1.default.info('connected to MongoDB');
    })
        .catch((error) => {
        logger_1.default.info('error connecting to MongoDB:', error.message);
    });
}
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'build')));
app.use(express_1.default.json());
app.use('/api', api_1.default);
app.use('/*', (request, response) => {
    response.sendFile(path_1.default.join(__dirname, 'build', 'index.html'));
});
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
app.use(middleware_1.default.unknownEndpoint);
app.use(middleware_1.default.errorHandler);
