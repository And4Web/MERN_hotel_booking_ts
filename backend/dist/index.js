"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const error_1 = __importDefault(require("./middleware/error"));
// import all routers
const authRoutes_1 = __importDefault(require("./routers/authRoutes"));
const userRoutes_1 = __importDefault(require("./routers/userRoutes"));
const path_1 = __importDefault(require("path"));
mongoose_1.default.connect(process.env.MONGODB_LOCAL_URI).then(() => { console.log('mongodb database connected successfully >>> ', process.env.MONGODB_LOCAL_URI); }).catch(e => console.log('Error connecting to mongodb >>> ', e));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.get("/api/v1/test", async (req, res) => {
    return res.json({ message: "test route" });
});
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist")));
// routes
app.use('/api/v1/users', userRoutes_1.default);
app.use('/api/v1/auth', authRoutes_1.default);
// custom error handling middleware
app.use(error_1.default);
app.listen(7000, () => {
    console.log("Server listening at 7000.");
});
