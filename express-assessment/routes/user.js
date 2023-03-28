import express from "express";
import prisma from "../db/index.js";

const router = express.Router();

// Create the routes here

router.get("/", async (request, response) => {
  try {
    const activeUsers = await prisma.user.findMany({
      where: {
        isActive: true,
      },
    });

    if (activeUsers) {
      console.log(activeUsers)
      console.log(activeUsers.length)
      response.status(200).json({
        success: true,
        users: activeUsers,
        //   users: activeUsers.length
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Cannot get users",
      });
    }
  } catch (e) {
    console.log(e);
    response.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.post("/", async (request, response) => {
  try {
    const createdUser = await prisma.user.create({
      data: {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        isAdmin: request.body.isAdmin !== "" ? request.body.isAdmin :  false,
        isActive: request.body.isActive !== "" ? request.body.isActive : true,
      },
    });

    if (createdUser) {
      response.status(201).json({
        success: true,
        createdUser,
      });
    } else {
      response.status(400).json({
        success: false,
        message: "User unable to be created",
      });
    }
  } catch (e) {
    console.log(e);
    response.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.put("/:id", async (request, response) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(request.params.id),
      },
      data: {
        firstName: request.body.firstName,
        // lastName: request.body.lastName,
      },
    });

    if (updatedUser) {
      response.status(200).json({
        success: true,
        // updatedUser,
      });
    } else {
      response.status(400).json({
        success: false,
        message: "User unable to be updated",
      });
    }
  } catch (e) {
    console.log(e);
    response.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: parseInt(request.params.id),
      },
    });

    if (deletedUser) {
      response.status(200).json({
        success: true,
        // deletedUser,
      });
    } else {
      response.status(400).json({
        success: false,
        message: "User deleted",
      });
    }
  } catch (e) {
    console.log(e);
    response.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.get("/admins", async (request, response) => {
  try {
    const allAdmin = await prisma.user.findMany({
      where: {
        isAdmin: true,
      },
    });

    if (allAdmin) {
      response.status(200).json({
        success: true,
        users: allAdmin,
      });
    } else {
      response.status(404).json({
        success: false,
        message: "Not found",
      });
    }
  } catch (e) {
    console.log(e);
    response.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
});
export default router;