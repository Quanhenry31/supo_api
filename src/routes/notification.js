const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/NotificationController");

router.get("/", notificationController.getNotification);
router.post("/", notificationController.createNotification);
router.put("/:id", notificationController.updateNotification);
router.delete("/:id", notificationController.deleteNotification);

module.exports = router;
