const express = require("express");
const BadgeServices = require("../services/badges");
const join = require("@hapi/joi");

const {
  badgeIdSchema,
  createBadgeSchema,
  updateBadgeSchema
} = require("../utils/schemas/badges");

const validationHandler = require("../utils/middleware/validationHandler");
const cacheResponse = require("../utils/cacheResponse");
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS
} = require("../utils/time");

function badgeApi(app) {
  const router = express.Router();
  app.use("/api/badges", router);

  const badgeService = new BadgeServices();

  router.get("/", async function(req, res, next) {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
    const { tags } = req.query;
    try {
      const badges = await badgeService.getBadge({ tags });
      res.status(200).json({
        data: badges,
        massage: "Badges listed"
      });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    "/:badgeId",
    validationHandler(join.object({ bageId: badgeIdSchema }), "params"),
    async function(req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { badgeId } = req.params;
      try {
        const badge = await badgeService.getBadge({ badgeId });
        res.status(200).json({
          data: badge,
          massage: "Badge retrieved"
        });
      } catch (err) {
        next(err);
      }
    }
  );

  // Create
  router.post(
    "/",
    validationHandler(join.object(createBadgeSchema)),
    async function(req, res, next) {
      const { body: badge } = req;
      try {
        const createBadgeId = await badgeService.createBadge({ badge });
        res.status(201).json({
          data: createBadgeId,
          message: "Movie created"
        });
      } catch (err) {
        next(err);
      }
    }
  );

  // PUT - Upadeted
  router.put(
    "/badgeId",
    validationHandler(join.object({ badgeId: badgeIdSchema })),
    validationHandler(join.object(updateBadgeSchema)),
    async function(req, res, next) {
      const { badgeId } = req.params;
      const { body: badge } = req;
      try {
        const updatedBadgeId = await badgeService.updateBadge({
          badgeId,
          badge
        });
        res.status(200).json({
          data: updatedBadgeId,
          message: "Badge updated"
        });
      } catch (err) {
        next(err);
      }
    }
  );

  // delete
  router.delete(
    "/deleteId",
    validationHandler(join.object({ badgeId: badgeIdSchema })),
    async function(req, res, next) {
      const { badgeId } = req.params;
      try {
        const deleteBadgeId = await badgeService.deletedBadge({ badgeId });
        res.status(200).json({
          data: deleteBadgeId,
          message: "Badge deleted"
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

// Aquí solo lo estamos definiendo pero aún no lo usamos en nuestra app
// de express, para ello debemos exportarla

module.exports = badgeApi;
