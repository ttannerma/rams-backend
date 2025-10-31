import express from 'express';
import cors from 'cors';
import factoryRoutes from './routes/factories/factoryRoutes.js';
import personnelRoutes from './routes/personnel/personnelRoutes.js';
import reservationRoutes from "./routes/reservations/reservationRoutes.js";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/factories", factoryRoutes);
app.use("/personnel", personnelRoutes);
app.use("/reservations", reservationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

