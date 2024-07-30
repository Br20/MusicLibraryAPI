import { connect } from "mongoose";

const db_uri = process.env.DB_CONNECTION_URI;

connect(db_uri);
