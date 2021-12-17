const express = require("express");
const router = express.Router();
const ClientController = require("../controllers/clientController.js");

router.delete("/:id", ClientController.deleteClient);
router.post("/register", ClientController.addClient);
router.post("/", ClientController.getClient);
router.get("/", ClientController.getClients);

module.exports = router;
