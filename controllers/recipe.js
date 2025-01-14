const recipeModel = require("../models/recipe");

const { Validator } = require("node-input-validator");

const recipeController = {
  _getAllRecipe: async (req, res) => {
    try {
      const request = await recipeModel.getAllRecipe();

      res.status(200).json({
        status: true,
        message: "Get data success",
        data: request,
      });
    } catch (error) {
      res.status(502).json({
        status: false,
        message: "Something wrong in our server",
        data: [],
      });
    }
  },
  _getDetailRecipe: async (req, res) => {
    try {
      const { id } = req.params;
      const request = await recipeModel.getDetailRecipe(id);

      res.status(200).json({
        status: true,
        message: "Get data success",
        data: request,
      });
    } catch (error) {
      res.status(502).json({
        status: false,
        message: "Something wrong in our server",
        data: [],
      });
    }
  },
  _getNewRecipe: async (req, res) => {
    try {
      const request = await recipeModel.getNewRecipe();

      res.status(200).json({
        status: true,
        message: "Get data success",
        data: request,
      });
    } catch (error) {
      res.status(502).json({
        status: false,
        message: "Something wrong in our server",
        data: [],
      });
    }
  },
  _getLatestRecipe: async (req, res) => {
    try {
      const request = await recipeModel.getLatestRecipe();

      res.status(200).json({
        status: true,
        message: "Get data success",
        data: request,
      });
    } catch (error) {
      res.status(502).json({
        status: false,
        message: "Something wrong in our server",
        data: [],
      });
    }
  },
  _inputValidaion: async (req, res, next) => {
    const schema = new Validator(req.body, {
      title: "required|minLength:5|maxLength:100",
      ingridients: "required|minLength:10",
      image: "required|url",
      video_url: "required|url",
    });

    schema.check().then((matched) => {
      if (!matched) {
        res.status(422).send({
          status: false,
          message: schema.errors,
          data: null,
        });
      } else {
        next();
      }
    });
  },
  _addRecipe: async (req, res) => {
    try {
      const { title, ingridients, image, video_url } = req.body;

      const request = await recipeModel.addRecipe({
        title,
        ingridients,
        image,
        video_url,
      });

      if (request.length > 0) {
        res.status(201).json({
          status: true,
          message: "Insert Data Success",
        });

        return;
      }
    } catch (error) {
      res.status(502).json({
        status: false,
        message: "Something Wrong on our server",
        data: [],
      });
    }
  },
};

module.exports = recipeController;
