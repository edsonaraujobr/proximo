import express from "express";
import cors from "cors";
import administratorRoutes from "./routes/administrators.js";
import clerkRoutes from "./routes/clerks.js";
import studentRoutes from "./routes/students.js";
import servicesRoutes from "./routes/services.js";
import servicesOrders from "./routes/orders.js";


const app = express();

app.use(express.json());

app.use(cors());

app.use("/", administratorRoutes);
app.use("/", clerkRoutes);
app.use("/", studentRoutes);
app.use("/", servicesRoutes);
app.use("/", servicesOrders);
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
