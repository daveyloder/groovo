import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch";

dotenv.config();

const app = express();

const baseUrl = process.env.GENIUS_BASE_URL;
