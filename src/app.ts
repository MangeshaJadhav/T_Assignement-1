import express, { Request, Response } from "express";
// import routes from "./Routes/routes";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./Entites/User";

//middleware
const app = express();
app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", async function (req: Request, res: Response) {
  const userRepo = AppDataSource.getRepository(User);
  //find all the records
  const allRecords = await userRepo.find(); //this will give all the records
  res.json(allRecords);

  //   return res.send("Hello World Mangesh here");
});

app.post("/userdetails", async function (req: Request, res: Response) {
  const userRepo = AppDataSource.getRepository(User);
  //find all the records
  let user: User = new User();
  user.firstName = "Mangesh";
  user.email = "mangeshjadhav@gmail.com";
  user.password = "abcd";

  const userInserted = await userRepo.save(user);
  res.json(userInserted);

  //   return res.send("Hello World Mangesh here");
});

app.post("/register", (req: Request, res: Response) => {
  console.log(req.body);
  return res.sendStatus(200);
});

//Creating a new DataSource
const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "postgres",
  entities: ["src/Entites/*{.ts,.js}"],
  synchronize: true,
  logging: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

// routes(app);

//server connection
app.listen(3000, () => {
  console.log("Server running on port http://localhost:3000");
});
