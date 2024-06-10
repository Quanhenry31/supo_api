const notificationService = require("../services/notification");

class NotificationController {
  // API
  // [GET] /users
  getNotification = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await notificationService.find({
      page: page,
      pageSize,
      //   where: {id}
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  // [POST] /users
  createNotification = async (req, res) => {
    const data = await notificationService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [PUT] /users/:id
  updateNotification = async (req, res) => {
    const id = req.params.id;
    const data = await notificationService.update({
      data: {
        ...req.body,
      },
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [DELETE] /users/:id
  deleteNotification = async (req, res) => {
    const id = req.params.id;

    const data = await notificationService.delete({
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };
}

module.exports = new NotificationController();
