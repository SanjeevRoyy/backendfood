import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectToMongoDb from "./db.js";
import menuRouter from "./src/Routers/menu.js";
import userRouter from "./src/Routers/user.js";
import tableRouter from "./src/Routers/table.js";
import orderRouter from "./src/Routers/order.js";

const app = express();
app.use(express.json());
app.use(cors());

// // or, to allow only specific origins
// const allowedOrigins = ['http://localhost:3000'];
// app.use(cors({
//   origin: function(origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Origin not allowed by CORS'));
//     }
//   }
// }));

dotenv.config();
const port = process.env.PORT;

app.use("/user", userRouter);
app.use("/menu", menuRouter);
app.use("/table", tableRouter);
app.use("/order", orderRouter);

//pagination route
//app.get('/pagination', menu.js.paginationProducts)

app.use(express.static("./public"));

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});

connectToMongoDb();
