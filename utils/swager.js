import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from 'dotenv'
dotenv.config()

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Personal Finance API",
      version: "1.0.0",
      description: "Personal Finance Management API Documentation",
    },
    servers: [
      {
        url: process.env.NODE_ENV==="development"?  "http://localhost:3000":"https://money-manager-api-p993.onrender.com",
      },
      {
        url: "https://money-manager-api-p993.onrender.com",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
